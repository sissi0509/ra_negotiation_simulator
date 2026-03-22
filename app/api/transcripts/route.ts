import { NextRequest, NextResponse } from "next/server";
import { saveTranscript, getAllTranscripts } from "@/lib/transcriptStore";
import type { Transcript } from "@/lib/transcript";
import { auth } from "@/auth";

// POST /api/transcripts  — called automatically when a conversation ends
export async function POST(req: NextRequest) {
  const transcript: Transcript = await req.json();

  if (!transcript.run_id || !transcript.scenario_id || !Array.isArray(transcript.messages)) {
    return NextResponse.json({ error: "Invalid transcript payload" }, { status: 400 });
  }

  const session = await auth();
  await saveTranscript(transcript, session?.user?.email);
  return NextResponse.json({ ok: true });
}

// GET /api/transcripts  — returns all completed transcripts
export async function GET() {
  return NextResponse.json(await getAllTranscripts());
}
