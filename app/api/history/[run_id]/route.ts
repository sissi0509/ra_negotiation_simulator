import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";

// GET /api/history/[run_id] — transcript + most recent debrief for that session
export async function GET(_req: NextRequest, { params }: { params: Promise<{ run_id: string }> }) {
  const session = await auth();
  const user_id = session?.user?.email;
  if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { run_id } = await params;
  const db = await getDb();

  const transcript = await db
    .collection("transcripts")
    .findOne({ run_id, user_id }, { projection: { _id: 0 } });

  if (!transcript) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const debrief = await db
    .collection("debriefs")
    .findOne(
      { run_id, user_id },
      { projection: { _id: 0, plan: 0, transcript: 0 }, sort: { saved_at: -1 } }
    );

  return NextResponse.json({ transcript, debrief: debrief ?? null });
}

// DELETE /api/history/[run_id] — remove transcript + all linked debriefs
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ run_id: string }> }) {
  const session = await auth();
  const user_id = session?.user?.email;
  if (!user_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { run_id } = await params;
  const db = await getDb();

  await Promise.all([
    db.collection("transcripts").deleteOne({ run_id, user_id }),
    db.collection("debriefs").deleteMany({ run_id, user_id }),
  ]);

  return NextResponse.json({ ok: true });
}
