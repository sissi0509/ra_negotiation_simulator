import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";

// GET /api/history — current user's transcripts, sorted newest first
export async function GET() {
  const session = await auth();
  const user_id = session?.user?.email;
  if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();

  const transcripts = await db
    .collection("transcripts")
    .find({ user_id }, { projection: { _id: 0, messages: 0 } })
    .sort({ started_at: -1 })
    .toArray();

  // For each transcript, check if a debrief exists
  const run_ids = transcripts.map((t) => t.run_id);
  const debriefs = await db
    .collection("debriefs")
    .find({ run_id: { $in: run_ids } }, { projection: { run_id: 1 } })
    .toArray();
  const debriefedSet = new Set(debriefs.map((d) => d.run_id));

  const result = transcripts.map((t) => ({
    ...t,
    has_debrief: debriefedSet.has(t.run_id),
  }));

  return NextResponse.json(result);
}
