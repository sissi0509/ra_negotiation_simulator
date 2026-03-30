import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";

// Valid survey type values and their matching surveys_done flag path.
const SURVEY_FLAG: Record<string, string> = {
  pre: "surveys_done.pre",
  post_r1: "surveys_done.post_r1",
  post_r2: "surveys_done.post_r2",
  final: "surveys_done.final",
};

// POST /api/survey
// Body: { type: "pre" | "post_r1" | "post_r2" | "final", run_id?: string, responses: Record<string, unknown> }
// Saves to `surveys` collection and marks the matching flag on the user doc.
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, run_id, responses } = await req.json();

  if (!type || !(type in SURVEY_FLAG)) {
    return NextResponse.json(
      { error: `Invalid survey type. Must be one of: ${Object.keys(SURVEY_FLAG).join(", ")}.` },
      { status: 400 }
    );
  }
  if (!responses || typeof responses !== "object") {
    return NextResponse.json({ error: "Missing responses." }, { status: 400 });
  }

  const db = await getDb();

  // Save survey response.
  await db.collection("surveys").insertOne({
    user_id: session.user.email,
    type,
    run_id: run_id ?? null,
    responses,
    submitted_at: new Date(),
  });

  // Mark the flag on the user document using dot-notation.
  await db.collection("users").updateOne(
    { email: session.user.email },
    { $set: { [SURVEY_FLAG[type]]: true } }
  );

  return NextResponse.json({ success: true });
}
