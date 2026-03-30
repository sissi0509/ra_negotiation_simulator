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
//   surveys_done.pre    boolean
//   surveys_done.post_r1  boolean
//   surveys_done.post_r2  boolean
//   surveys_done.final  boolean
//
// Pass only the fields you want to change. Dot-notation keys for surveys_done are
// expanded server-side — send { surveys_done: { pre: true } } not the dot path.
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

  // surveys_done — accept as a nested object, expand to dot-notation for MongoDB
  if (body.surveys_done && typeof body.surveys_done === "object") {
    const SURVEY_KEYS = ["pre", "post_r1", "post_r2", "final"] as const;
    for (const key of SURVEY_KEYS) {
      if (key in body.surveys_done) {
        $set[`surveys_done.${key}`] = body.surveys_done[key];
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
