import { NextRequest, NextResponse } from "next/server";
import scenarios from "@/data/scenarios.json";
import personalities from "@/data/personalities.json";
import { saveSession, StoredMessage } from "@/lib/sessionStore";
import { callClaude } from "@/lib/callClaude";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const { scenario_id, personality_id, messages, session_id } = await req.json();

  const scenario = scenarios.find((s) => s.id === scenario_id);
  const personality = personalities.find((p) => p.id === personality_id);

  if (!scenario || !personality) {
    return NextResponse.json(
      { error: "Unknown scenario_id or personality_id." },
      { status: 400 }
    );
  }

  const systemPrompt = `${scenario.system_prompt}\n\n${personality.prompt_modifier}`;

  // Claude requires at least one message. When messages is empty the app is
  // asking for the AI's opening line, so we inject a silent bootstrap prompt.
  const apiMessages: Message[] =
    messages.length === 0
      ? [{ role: "user", content: "(Begin the negotiation as instructed.)" }]
      : (messages as Message[]);

  try {
    const response = await callClaude({
      max_tokens: 512,
      system: systemPrompt,
      messages: apiMessages,
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Persist session so the conversation survives a page refresh.
    // The bootstrap synthetic user message is NOT stored — only real turns.
    if (session_id) {
      const savedMessages: StoredMessage[] = [
        ...(messages as StoredMessage[]),
        { role: "assistant", content: reply },
      ];
      saveSession(session_id, { scenario_id, personality_id, messages: savedMessages });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Claude API error:", err);
    return NextResponse.json(
      { error: "Failed to get AI response. Please try again." },
      { status: 500 }
    );
  }
}
