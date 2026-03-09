import { NextRequest, NextResponse } from "next/server";
import { getSession, saveSession, deleteSession } from "@/lib/sessionStore";
import { getDb } from "@/lib/mongodb";

// GET /api/session?id=<session_id>  → returns the stored session or 404
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  // Try in-memory first (fast), then fall back to MongoDB (survives server restart).
  const inMemory = getSession(id);
  if (inMemory) return NextResponse.json(inMemory);

  try {
    const db = await getDb();
    // Sessions are stored in transcripts collection keyed by run_id = session_id.
    const doc = await db.collection("transcripts").findOne({ run_id: id });
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const session = {
      scenario_id: doc.scenario_id as string,
      personality_id: doc.personality_id as string,
      // Per-turn messages are stored as {role, text} — map to {role, content} for the chat API.
      messages: (doc.messages as { role: "user" | "assistant"; text: string }[]).map((m) => ({
        role: m.role,
        content: m.text,
      })),
    };
    // Warm the in-memory cache so subsequent requests are fast.
    saveSession(id, session);
    return NextResponse.json(session);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

// DELETE /api/session?id=<session_id>  → clears in-memory cache only.
// Transcript data in MongoDB is kept for research — abandoned sessions are still useful.
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  deleteSession(id);
  return NextResponse.json({ ok: true });
}
