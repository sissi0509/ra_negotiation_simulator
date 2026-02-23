import { NextRequest, NextResponse } from "next/server";
import { getDebriefSession, deleteDebriefSession } from "@/lib/debriefSessionStore";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter." }, { status: 400 });
  }

  const session = getDebriefSession(id);
  if (!session) {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }

  return NextResponse.json({
    transcript: session.transcript,
    plan: session.plan,
    messages: session.messages,
  });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter." }, { status: 400 });
  }

  // Idempotent — deleting a non-existent session is not an error
  deleteDebriefSession(id);
  return NextResponse.json({ ok: true });
}
