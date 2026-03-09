import { NextRequest, NextResponse } from "next/server";
import { buildAssessmentPrompt, DebriefPlan } from "@/lib/debriefPrompt";
import { Transcript } from "@/lib/transcript";
import { DebriefStoredMessage } from "@/lib/debriefSessionStore";
import { callClaude } from "@/lib/callClaude";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    run_id,
    debrief_id,
    transcript,
    plan,
    messages,
    sessionSummary,
  }: {
    run_id: string;
    debrief_id: string;
    transcript: Transcript;
    plan: DebriefPlan;
    messages: DebriefStoredMessage[];
    sessionSummary: string;
  } = body;

  if (!run_id || !debrief_id || !transcript || !plan || !messages || sessionSummary === undefined) {
    return NextResponse.json(
      { error: "Missing required fields: run_id, debrief_id, transcript, plan, messages, sessionSummary." },
      { status: 400 }
    );
  }

  const prompt = buildAssessmentPrompt(transcript, plan, messages, sessionSummary);

  let assessment: string;
  try {
    const response = await callClaude({
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });
    assessment =
      response.content[0].type === "text" ? response.content[0].text : "";
  } catch (err) {
    console.error("Assessment generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate assessment." },
      { status: 500 }
    );
  }

  // Save to DB best-effort — do not let a DB failure block the response.
  try {
    const db = await getDb();
    await db.collection("debriefs").updateOne(
      { debrief_id },
      { $set: { assessment, assessment_generated_at: new Date() } },
      { upsert: true }
    );
  } catch (dbErr) {
    console.error("Failed to save assessment to DB:", dbErr);
  }

  return NextResponse.json({ assessment });
}
