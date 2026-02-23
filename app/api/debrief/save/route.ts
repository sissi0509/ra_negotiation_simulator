import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Transcript } from "@/lib/transcript";
import { DebriefPlan } from "@/lib/debriefPrompt";
import { DebriefStoredMessage } from "@/lib/debriefSessionStore";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    run_id,
    debrief_id,
    transcript,
    plan,
    messages,
    reflection_summary,
    started_at,
  }: {
    run_id: string;
    debrief_id: string;
    transcript: Transcript;
    plan: DebriefPlan;
    messages: DebriefStoredMessage[];
    reflection_summary: string;
    started_at: string;
  } = body;

  if (!run_id || !debrief_id || !transcript || !plan || !messages) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const debriefDir = path.join(process.cwd(), "db", "debriefs", "sessions");
  await fs.mkdir(debriefDir, { recursive: true });
  await fs.writeFile(
    path.join(debriefDir, `debrief_${run_id}.json`),
    JSON.stringify(
      {
        run_id,
        debrief_id,
        saved_at: new Date().toISOString(),
        started_at,
        scenario_name: transcript.scenario_name,
        personality_name: transcript.personality_name,
        transcript,
        plan,
        messages,
        reflection_summary,
      },
      null,
      2
    )
  );

  return NextResponse.json({ ok: true });
}
