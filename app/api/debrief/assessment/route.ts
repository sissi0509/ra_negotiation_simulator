import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { buildAssessmentPrompt } from "@/lib/debriefPrompt";
import { Transcript } from "@/lib/transcript";
import { DebriefStoredMessage } from "@/lib/debriefSessionStore";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    run_id,
    debrief_id,
    transcript,
    messages,
    summary,
  }: {
    run_id: string;
    debrief_id: string;
    transcript: Transcript;
    messages: DebriefStoredMessage[];
    summary: string;
  } = body;

  if (!run_id || !debrief_id || !transcript || !messages || !summary) {
    return NextResponse.json(
      { error: "Missing required fields: run_id, debrief_id, transcript, messages, summary." },
      { status: 400 }
    );
  }

  const prompt = buildAssessmentPrompt(transcript, messages, summary);

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
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
