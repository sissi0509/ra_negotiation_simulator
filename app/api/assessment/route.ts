import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/dbCollections";
import { getTranscriptByRunId } from "@/lib/transcriptStore";
import { buildTranscriptOnlyAssessmentPrompt } from "@/lib/debriefPrompt";
import { callClaude } from "@/lib/callClaude";

// GET /api/assessment?run_id=<id>
// Returns the saved transcript-only assessment for this run, if it exists.
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const runId = req.nextUrl.searchParams.get("run_id");
  if (!runId) {
    return NextResponse.json({ error: "run_id required" }, { status: 400 });
  }

  const db = await getDb();
  const doc = await db.collection(COLLECTIONS.assessments).findOne({ run_id: runId });
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...safe } = doc as Record<string, unknown> & { _id: unknown };
  return NextResponse.json(safe);
}

// POST /api/assessment
// Generates an assessment from the transcript (no debrief required).
// Idempotent — returns the cached result if already generated.
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { run_id }: { run_id: string } = await req.json();
  if (!run_id) {
    return NextResponse.json({ error: "run_id required" }, { status: 400 });
  }

  const db = await getDb();

  // Return cached result if already generated
  const existing = await db.collection(COLLECTIONS.assessments).findOne({ run_id });
  if (existing?.assessment) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...safe } = existing as Record<string, unknown> & { _id: unknown };
    return NextResponse.json(safe);
  }

  // Fetch transcript from DB
  const transcript = await getTranscriptByRunId(run_id);
  if (!transcript) {
    return NextResponse.json({ error: "Transcript not found for run_id." }, { status: 404 });
  }

  // Generate assessment
  const prompt = buildTranscriptOnlyAssessmentPrompt(transcript);
  let assessment: string;
  try {
    const response = await callClaude({
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });
    assessment =
      response.content[0].type === "text" ? response.content[0].text : "";
  } catch (err) {
    console.error("Transcript assessment generation error:", err);
    return NextResponse.json({ error: "Failed to generate assessment." }, { status: 500 });
  }

  // Save to assessments collection
  const doc = {
    run_id,
    user_id: session.user.email,
    assessment,
    source: "transcript" as const,
    generated_at: new Date(),
  };
  try {
    await db.collection(COLLECTIONS.assessments).updateOne(
      { run_id },
      { $set: doc },
      { upsert: true }
    );
  } catch (dbErr) {
    console.error("Failed to save assessment:", dbErr);
    // Don't block — return the result even if the save fails
  }

  return NextResponse.json(doc);
}
