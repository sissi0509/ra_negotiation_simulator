import { NextRequest, NextResponse } from "next/server";
import { saveTranscript, getAllTranscripts } from "@/lib/transcriptStore";
import type { Transcript } from "@/lib/transcript";

// POST /api/transcripts  — called automatically when a conversation ends
export async function POST(req: NextRequest) {
  const transcript: Transcript = await req.json();

  if (!transcript.run_id || !transcript.scenario_id || !Array.isArray(transcript.messages)) {
    return NextResponse.json({ error: "Invalid transcript payload" }, { status: 400 });
  }

  saveTranscript(transcript);
  return NextResponse.json({ ok: true });
}

// GET /api/transcripts  — returns all completed transcripts (future: filter, paginate, move to DB)
export async function GET() {
  return NextResponse.json(getAllTranscripts());
}
