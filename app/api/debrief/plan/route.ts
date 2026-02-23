import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { buildPlanPrompt, DebriefPlan } from "@/lib/debriefPrompt";
import { saveDebriefSession } from "@/lib/debriefSessionStore";
import { Transcript } from "@/lib/transcript";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Accept the transcript either flat (top-level fields) or wrapped in { transcript }
  const transcript: Transcript = body.messages ? body : body.transcript;

  if (
    !transcript?.messages ||
    !transcript?.scenario_name ||
    !transcript?.personality_name ||
    !transcript?.started_at
  ) {
    return NextResponse.json(
      { error: "Missing required transcript fields: messages, scenario_name, personality_name, started_at." },
      { status: 400 }
    );
  }

  const run_id = transcript.run_id ?? crypto.randomUUID();
  const debrief_id: string = body.debrief_id ?? crypto.randomUUID();

  const prompt = buildPlanPrompt(transcript);

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Extract JSON — strip any markdown fences Claude might add
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse plan from AI response." },
        { status: 500 }
      );
    }
    let plan: DebriefPlan;
    try {
      plan = JSON.parse(jsonMatch[0]);
    } catch {
      return NextResponse.json(
        { error: "AI returned malformed JSON plan." },
        { status: 500 }
      );
    }

    // Save plan_<run_id>.json to db/debriefs/plans/
    const debriefDir = path.join(process.cwd(), "db", "debriefs", "plans");
    await fs.mkdir(debriefDir, { recursive: true });
    await fs.writeFile(
      path.join(debriefDir, `plan_${run_id}.json`),
      JSON.stringify(
        {
          run_id,
          debrief_id,
          generated_at: new Date().toISOString(),
          scenario_name: transcript.scenario_name,
          personality_name: transcript.personality_name,
          plan,
        },
        null,
        2
      )
    );

    // Save server-side session so Stage 2 can look up transcript metadata
    saveDebriefSession(debrief_id, {
      transcript: { ...transcript, run_id },
      plan,
      messages: [],
    });

    return NextResponse.json({ plan });
  } catch (err) {
    console.error("Debrief plan API error:", err);
    return NextResponse.json(
      { error: "Failed to generate debrief plan." },
      { status: 500 }
    );
  }
}
