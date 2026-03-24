import { NextRequest, NextResponse } from "next/server";
import { buildDebriefSystemPrompt, DebriefPlan } from "@/lib/debriefPrompt";
import {
  getDebriefSession,
  saveDebriefSession,
  DebriefStoredMessage,
} from "@/lib/debriefSessionStore";
import { Transcript } from "@/lib/transcript";
import { callClaude } from "@/lib/callClaude";
import { getDb } from "@/lib/mongodb";

const SESSION_COMPLETE_MARKER = "--- Session Complete ---";

/**
 * Split text into sentence-level chunks separated by [BREAK].
 * Each sentence becomes its own bubble in the UI.
 * Uses lookbehind on sentence-ending punctuation followed by whitespace.
 */
function splitSentences(text: string): string {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return sentences.length > 1 ? sentences.join("\n[BREAK]\n") : text;
}

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
      max_tokens: 300,
      system: systemPrompt,
      messages: apiMessages,
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Build the updated messages list (user messages sent + Sage's reply).
    // The bootstrap "(Begin the debrief…)" message is excluded — it's not in `messages`.
    // Store the raw reply (no [BREAK]) so the model never sees formatting artifacts.
    const updatedMessages: DebriefStoredMessage[] = [
      ...messages,
      { role: "assistant", content: reply },
    ];

    // Persist to in-memory session store (page-refresh recovery)
    if (debrief_id && session) {
      saveDebriefSession(debrief_id, { ...session, messages: updatedMessages });
    }

    // Per-turn DB persistence — fire and forget, never block the response
    if (debrief_id) {
      getDb()
        .then((db) =>
          db.collection("debriefs").updateOne(
            { debrief_id },
            { $set: { messages: updatedMessages } }
          )
        )
        .catch((err) => console.error("Per-turn DB save failed:", err));
    }

    // Detect session-complete marker and extract summary.
    const markerMatch = reply.match(/---\s*Session\s+Complete\s*---/i);
    if (markerMatch?.index !== undefined) {
      const chatPart = reply.slice(0, markerMatch.index).trim();
      const sessionSummary = reply
        .slice(markerMatch.index + markerMatch[0].length)
        .trim();
      const splitReply = splitSentences(chatPart) + "\n" + markerMatch[0] + "\n" + sessionSummary;

      // Persist the session summary so it appears in History
      if (debrief_id) {
        getDb()
          .then((db) =>
            db.collection("debriefs").updateOne(
              { debrief_id },
              { $set: { debrief_summary: sessionSummary } }
            )
          )
          .catch((err) => console.error("Failed to save debrief summary:", err));
      }

      return NextResponse.json({ reply: splitReply, sessionSummary });
    }

    return NextResponse.json({ reply: splitSentences(reply) });
  } catch (err) {
    console.error("Debrief chat API error:", err);
    return NextResponse.json(
      { error: "Failed to get Sage's response. Please try again." },
      { status: 500 }
    );
  }
}
