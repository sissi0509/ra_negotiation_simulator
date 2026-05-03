import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import scenarios from "@/content/scenarios.json";
import personalities from "@/content/personalities.json";
import { saveSession, StoredMessage } from "@/lib/sessionStore";
import OpenAI from "openai";
import { getDb } from "@/lib/mongodb";
import { auth } from "@/auth";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function loadPrompt(filename: string): string {
  return fs.readFileSync(path.join(process.cwd(), "ai_prompts", filename), "utf-8").trim();
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const { scenario_id, personality_id, messages, session_id, user_id: body_user_id } = await req.json();
  const user_id = session?.user?.email ?? body_user_id ?? null;

  const scenario = scenarios.find((s) => s.id === scenario_id);
  const personality = personalities.find((p) => p.id === personality_id);

  if (!scenario || !personality) {
    return NextResponse.json(
      { error: "Unknown scenario_id or personality_id." },
      { status: 400 }
    );
  }

  const scenarioPrompt = loadPrompt(`scenario_${scenario_id}.md`);
  const personalityPrompt = loadPrompt(`personality_${personality_id}.md`);
  const simulatorRules = loadPrompt("simulator_rules.md");

  const systemPrompt = `${personalityPrompt}\n\n${scenarioPrompt}\n\n${simulatorRules}`;

  // Claude requires at least one message. When messages is empty the app is
  // asking for the AI's opening line, so we inject a silent bootstrap prompt.
  const apiMessages: Message[] =
    messages.length === 0
      ? [{ role: "user", content: "(Begin the negotiation as instructed.)" }]
      : (messages as Message[]);

  try {
    const openai = new OpenAI();
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 200,
      messages: [
        { role: "system", content: systemPrompt },
        ...apiMessages,
      ],
    });
    const reply = response.choices[0].message.content ?? "";

    // Persist session so the conversation survives a page refresh.
    // The bootstrap synthetic user message is NOT stored — only real turns.
    if (session_id) {
      const savedMessages: StoredMessage[] = [
        ...(messages as StoredMessage[]),
        { role: "assistant", content: reply },
      ];
      saveSession(session_id, { scenario_id, personality_id, messages: savedMessages });

      // Fire-and-forget: persist to MongoDB so session survives a server restart.
      // Stored under run_id = session_id so the final transcript replaceOne merges cleanly.
      const now = new Date().toISOString();
      const transcriptMessages = savedMessages.map((m) => ({
        role: m.role,
        text: m.content,
        timestamp: now,
      }));
      getDb()
        .then((db) =>
          db.collection("transcripts").updateOne(
            { run_id: session_id },
            { $set: { run_id: session_id, scenario_id, personality_id, messages: transcriptMessages, updated_at: new Date(), ...(user_id ? { user_id } : {}) } },
            { upsert: true }
          )
        )
        .catch((err) => console.error("Per-turn transcript DB save failed:", err));
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
