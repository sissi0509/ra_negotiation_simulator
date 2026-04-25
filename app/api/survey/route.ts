import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";

// Valid survey type values and their matching steps_done flag path.
const SURVEY_FLAG: Record<string, string> = {
  pre: "steps_done.pre",
  gty_intro: "steps_done.gty_intro",
  s2_efficacy: "steps_done.s2_efficacy",
  s3_debrief: "steps_done.s3_debrief",
  s4_efficacy: "steps_done.s4_efficacy",
  s5_improvement: "steps_done.s5_improvement",
  final: "steps_done.final",
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
