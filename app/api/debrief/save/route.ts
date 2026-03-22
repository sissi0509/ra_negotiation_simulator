import { NextRequest, NextResponse } from "next/server";
import { Transcript } from "@/lib/transcript";
import { DebriefPlan } from "@/lib/debriefPrompt";
import { DebriefStoredMessage } from "@/lib/debriefSessionStore";
import { getDb } from "@/lib/mongodb";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    run_id,
    debrief_id,
    transcript,
    plan,
    messages,
    debrief_summary,
    started_at,
    ended_by,
  }: {
    run_id: string;
    debrief_id: string;
    transcript: Transcript;
    plan: DebriefPlan;
    messages: DebriefStoredMessage[];
    debrief_summary: string;
    started_at: string;
    ended_by: "user" | "natural";
  } = body;

  if (!run_id || !debrief_id || !transcript || !plan || !messages) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const session = await auth();
  const user_id = session?.user?.email ?? null;

  try {
    const db = await getDb();
    await db.collection("debriefs").updateOne(
      { debrief_id },
      {
        $set: {
          debrief_id,
          run_id,
          plan,
          messages,
          debrief_summary: debrief_summary ?? "",
          started_at,
          ended_by: ended_by ?? "natural",
          saved_at: new Date(),
          ...(user_id ? { user_id } : {}),
        },
      },
      { upsert: true }
    );
  } catch (dbErr) {
    console.error("Failed to save debrief to DB:", dbErr);
    return NextResponse.json({ error: "Failed to save debrief." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
