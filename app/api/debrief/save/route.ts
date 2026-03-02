import { NextRequest, NextResponse } from "next/server";
import { Transcript } from "@/lib/transcript";
import { DebriefPlan } from "@/lib/debriefPrompt";
import { DebriefStoredMessage } from "@/lib/debriefSessionStore";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    run_id,
    debrief_id,
    transcript,
    plan,
    messages,
    session_summary,
    started_at,
  }: {
    run_id: string;
    debrief_id: string;
    transcript: Transcript;
    plan: DebriefPlan;
    messages: DebriefStoredMessage[];
    session_summary: string;
    started_at: string;
  } = body;

  if (!run_id || !debrief_id || !transcript || !plan || !messages) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const db = await getDb();
  await db.collection("debriefs").updateOne(
    { debrief_id },
    {
      $set: {
        debrief_id,
        run_id,
        scenario_name: transcript.scenario_name,
        personality_name: transcript.personality_name,
        transcript,
        plan,
        messages,
        session_summary: session_summary ?? "",
        started_at,
        saved_at: new Date(),
      },
    },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}
