import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/dbCollections";

// GET /api/debrief/latest?id=<debrief_id>
//
// Returns the debrief document for the given debrief_id.
// Used by the /assessment page to display the AI assessment after Round 2 surveys.
//
// The debrief_id is stamped to localStorage ("experiment_debrief_id") when the
// participant clicks "Continue to next step" at the end of the Round 1 debrief.
// Fetching by this specific ID avoids returning the wrong report if a participant
// has multiple debrief sessions (e.g. from re-testing).
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const debriefId = req.nextUrl.searchParams.get("id");

  const db = await getDb();

  let debrief;
  if (debriefId) {
    // Exact lookup — most reliable path
    debrief = await db.collection(COLLECTIONS.debriefs).findOne({ debrief_id: debriefId });
  } else {
    // Fallback: latest by this user (less reliable if multiple sessions exist)
    debrief = await db
      .collection("debriefs")
      .find({ user_id: session.user.email })
      .sort({ saved_at: -1 })
      .limit(1)
      .next();
  }

  if (!debrief) {
    return NextResponse.json({ error: "No debrief found." }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...safe } = debrief as Record<string, unknown> & { _id: unknown };
  return NextResponse.json(safe);
}
