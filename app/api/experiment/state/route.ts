import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";

// GET /api/experiment/state
// Returns the calling participant's full document from `users` (minus password_hash).
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const user = await db.collection("users").findOne(
    { email: session.user.email },
    { projection: { _id: 0, password_hash: 0 } }
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PATCH /api/experiment/state
// Updates mutable progress fields only. Researcher-assigned fields are not writable here.
//
// Writable fields:
//   current_round       number
//   status              "active" | "completed" | "withdrawn"
//   consent_given       boolean
//   started_at          ISO string (set once on first begin)
//   completed_at        ISO string
//   steps_done.pre                boolean
//   steps_done.gty_intro          boolean
//   steps_done.s2_efficacy        boolean
//   steps_done.s3_debrief         boolean
//   steps_done.s4_efficacy        boolean
//   steps_done.final              boolean  (combined S5+S6 survey, before assessment)
//   steps_done.round1_complete      boolean
//   steps_done.debrief_complete     boolean
//   steps_done.reflection_complete  boolean
//   steps_done.round2_complete      boolean
//   steps_done.assessment_complete  boolean
//
// Pass only the fields you want to change. Dot-notation keys for steps_done are
// expanded server-side — send { steps_done: { pre: true } } not the dot path.
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const $set: Record<string, unknown> = {};

  // Scalar fields
  const SCALAR_FIELDS = ["current_round", "status", "consent_given", "started_at", "completed_at"] as const;
  for (const key of SCALAR_FIELDS) {
    if (key in body) $set[key] = body[key];
  }

  // steps_done — accept as a nested object, expand to dot-notation for MongoDB
  if (body.steps_done && typeof body.steps_done === "object") {
    const STEP_KEYS = [
      "pre", "gty_intro", "s2_efficacy", "s3_debrief", "s4_efficacy", "final",
      "round1_complete", "debrief_complete", "reflection_complete", "round2_complete", "assessment_complete",
    ] as const;
    for (const key of STEP_KEYS) {
      if (key in body.steps_done) {
        $set[`steps_done.${key}`] = body.steps_done[key];
      }
    }
  }

  if (Object.keys($set).length === 0) {
    return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
  }

  const db = await getDb();
  await db.collection("users").updateOne(
    { email: session.user.email },
    { $set }
  );

  return NextResponse.json({ success: true });
}
