import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";

// POST /api/reflection
// Body: { run_id: string, round: number, responses: Record<string, string> }
// Saves Group B written reflection responses to the `reflections` collection.
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { run_id, round, responses } = await req.json();

  if (!run_id || !responses || typeof responses !== "object") {
    return NextResponse.json({ error: "Missing run_id or responses." }, { status: 400 });
  }

  const db = await getDb();
  await db.collection("reflections").insertOne({
    user_id: session.user.email,
    run_id,
    round: round ?? 1,
    responses,
    submitted_at: new Date(),
  });

  return NextResponse.json({ success: true });
}
