import { NextRequest, NextResponse } from "next/server";
import { buildPlanPrompt, DebriefPlan } from "@/lib/debriefPrompt";
import { saveDebriefSession } from "@/lib/debriefSessionStore";
import { Transcript } from "@/lib/transcript";
import { callClaude, FALLBACK_MODEL } from "@/lib/callClaude";
import { getDb } from "@/lib/mongodb";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const body = await req.json();
  const user_id = session?.user?.email ?? body.user_id ?? null;

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

  try {
    const prompt = buildPlanPrompt(transcript);
    const response = await callClaude(
      { max_tokens: 4096, messages: [{ role: "user", content: prompt }] },
      FALLBACK_MODEL
    );

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

    // Validate new plan schema
    if (
      !Array.isArray(plan.key_moments) ||
      typeof plan.initial_assessment_summary !== "string" ||
      !Array.isArray(plan.additional_observations)
    ) {
      return NextResponse.json(
        { error: "AI returned plan with unexpected schema." },
        { status: 500 }
      );
    }

    // Create the initial debrief document in MongoDB — all metadata set here
    // so per-turn message appends have a complete record to update.
    const db = await getDb();
    await db.collection("debriefs").updateOne(
      { debrief_id },
      {
        $set: {
          debrief_id,
          run_id,
          plan,
          messages: [],
          started_at: transcript.started_at,
          plan_generated_at: new Date(),
          ...(user_id ? { user_id } : {}),
        },
      },
      { upsert: true }
    );

    // Save server-side session so Stage 2 can look up the transcript
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
