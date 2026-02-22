import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/sessionStore";

// GET /api/session?id=<session_id>  → returns the stored session or 404
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const session = getSession(id);
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(session);
}

// DELETE /api/session?id=<session_id>  → removes the session from the store
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  deleteSession(id);
  return NextResponse.json({ ok: true });
}
