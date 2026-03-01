import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { buildAssessmentPrompt, DebriefPlan } from "@/lib/debriefPrompt";
import { Transcript } from "@/lib/transcript";
import { DebriefStoredMessage } from "@/lib/debriefSessionStore";
import { callClaude } from "@/lib/callClaude";

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

  if (!run_id || !debrief_id || !transcript || !plan || !messages || !sessionSummary) {
    return NextResponse.json(
      { error: "Missing required fields: run_id, debrief_id, transcript, plan, messages, sessionSummary." },
      { status: 400 }
    );
  }

  const prompt = buildAssessmentPrompt(transcript, plan, messages, sessionSummary);

  try {
    const response = await callClaude({
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const assessment =
      response.content[0].type === "text" ? response.content[0].text : "";

    const assessmentDir = path.join(process.cwd(), "db", "debriefs", "assessments");
    await fs.mkdir(assessmentDir, { recursive: true });
    await fs.writeFile(
      path.join(assessmentDir, `assessment_${run_id}.json`),
      JSON.stringify(
        {
          run_id,
          debrief_id,
          generated_at: new Date().toISOString(),
          assessment,
        },
        null,
        2
      )
    );

    return NextResponse.json({ assessment });
  } catch (err) {
    console.error("Assessment API error:", err);
    return NextResponse.json(
      { error: "Failed to generate assessment." },
      { status: 500 }
    );
  }
}
