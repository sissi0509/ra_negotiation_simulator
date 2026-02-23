import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buildDebriefSystemPrompt, DebriefPlan } from "@/lib/debriefPrompt";
import {
  getDebriefSession,
  saveDebriefSession,
  DebriefStoredMessage,
} from "@/lib/debriefSessionStore";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const plan: DebriefPlan = body.plan;
  const messages: DebriefStoredMessage[] = body.messages ?? [];
  const debrief_id: string | undefined = body.debrief_id;

  if (!plan?.short_summary || !Array.isArray(plan.key_moments)) {
    return NextResponse.json(
      { error: "Missing or invalid plan." },
      { status: 400 }
    );
  }

  // Look up session for transcript metadata (scenario name, date, etc.)
  // The full transcript is NOT re-sent here — only the plan is used.
  const session = debrief_id ? getDebriefSession(debrief_id) : undefined;
  const meta = session?.transcript
    ? {
        scenario_name: session.transcript.scenario_name,
        personality_name: session.transcript.personality_name,
        started_at: session.transcript.started_at,
      }
    : undefined;

  const systemPrompt = buildDebriefSystemPrompt(plan, meta);

  // Bootstrap the opening turn — Claude requires at least one message
  const apiMessages: DebriefStoredMessage[] =
    messages.length === 0
      ? [{ role: "user", content: "(Begin the debrief. This is your opening message as Alex.)" }]
      : messages;

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
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

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Debrief chat API error:", err);
    return NextResponse.json(
      { error: "Failed to get Alex's response. Please try again." },
      { status: 500 }
    );
  }
}
