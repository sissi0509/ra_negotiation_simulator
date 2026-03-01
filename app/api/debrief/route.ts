import { NextRequest, NextResponse } from "next/server";
import { buildDebriefSystemPrompt, DebriefPlan } from "@/lib/debriefPrompt";
import {
  getDebriefSession,
  saveDebriefSession,
  DebriefStoredMessage,
} from "@/lib/debriefSessionStore";
import { Transcript } from "@/lib/transcript";
import { callClaude } from "@/lib/callClaude";

const SESSION_COMPLETE_MARKER = "--- Session Complete ---";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const plan: DebriefPlan = body.plan;
  const messages: DebriefStoredMessage[] = body.messages ?? [];
  const debrief_id: string | undefined = body.debrief_id;
  const transcript: Transcript | undefined = body.transcript;

  if (!plan?.key_moments || !Array.isArray(plan.key_moments)) {
    return NextResponse.json(
      { error: "Missing or invalid plan." },
      { status: 400 }
    );
  }

  // Use provided transcript or fall back to session store
  const session = debrief_id ? getDebriefSession(debrief_id) : undefined;
  const activeTranscript: Transcript | undefined =
    transcript ?? session?.transcript;

  if (!activeTranscript) {
    return NextResponse.json(
      { error: "Missing transcript. Re-send with transcript in body." },
      { status: 400 }
    );
  }

  const systemPrompt = buildDebriefSystemPrompt(plan, activeTranscript);

  // Bootstrap the opening turn — Claude requires at least one message
  const apiMessages: DebriefStoredMessage[] =
    messages.length === 0
      ? [{ role: "user", content: "(Begin the debrief. This is your opening message as Sage.)" }]
      : messages;

  try {
    const response = await callClaude({
      max_tokens: 512,
      system: systemPrompt,
      messages: apiMessages,
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Persist updated session so page-refresh can restore conversation
    if (debrief_id && session) {
      const updatedMessages: DebriefStoredMessage[] = [
        ...messages,
        { role: "assistant", content: reply },
      ];
      saveDebriefSession(debrief_id, { ...session, messages: updatedMessages });
    }

    // Detect session-complete marker and extract summary
    const markerIdx = reply.indexOf(SESSION_COMPLETE_MARKER);
    if (markerIdx !== -1) {
      const sessionSummary = reply
        .slice(markerIdx + SESSION_COMPLETE_MARKER.length)
        .trim();
      return NextResponse.json({ reply, sessionSummary });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Debrief chat API error:", err);
    return NextResponse.json(
      { error: "Failed to get Sage's response. Please try again." },
      { status: 500 }
    );
  }
}
