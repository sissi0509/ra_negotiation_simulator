import { NextRequest, NextResponse } from "next/server";
import { buildPartialSummaryPrompt } from "@/lib/debriefPrompt";
import { callClaude } from "@/lib/callClaude";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: Array<{ role: "user" | "assistant"; content: string }> =
    body.messages ?? [];

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Missing messages." }, { status: 400 });
  }

  const { system, userMessage } = buildPartialSummaryPrompt(messages);

  try {
    const response = await callClaude({
      max_tokens: 256,
      system,
      messages: [{ role: "user", content: userMessage }],
    });

    const summary =
      response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Partial summary API error:", err);
    return NextResponse.json(
      { error: "Failed to generate summary." },
      { status: 500 }
    );
  }
}
