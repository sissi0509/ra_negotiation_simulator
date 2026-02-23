import { Transcript } from "@/lib/transcript";

// ── Type definitions ─────────────────────────────────────────────────────────

export interface KeyMoment {
  quote: string;
  context: string;
  why_it_matters: string;
}

export interface QuestionPlanItem {
  moment_index: number;
  question: string;
  question_type: "reasoning" | "priority" | "assumption" | "emotion";
}

export interface DebriefPlan {
  short_summary: string;
  key_moments: KeyMoment[];
  patterns: string[];
  hypotheses: string[];
  question_plan: QuestionPlanItem[];
}

export interface TranscriptMeta {
  scenario_name: string;
  personality_name: string;
  started_at: string;
}

// ── Formatters ───────────────────────────────────────────────────────────────

export function formatTranscript(transcript: Transcript): string {
  const header = [
    `Scenario: ${transcript.scenario_name}`,
    `Personality: ${transcript.personality_name}`,
    `Date: ${transcript.started_at.split("T")[0]}`,
    "",
  ].join("\n");

  const body = transcript.messages
    .map((m) => {
      const speaker = m.role === "user" ? "User" : "AI Counterpart";
      return `[${speaker}]: ${m.text}`;
    })
    .join("\n\n");

  return header + "\n" + body;
}

// ── Stage 1: Planning prompt ─────────────────────────────────────────────────

export function buildPlanPrompt(transcript: Transcript): string {
  const formatted = formatTranscript(transcript);

  return `You are an expert negotiation analyst. Read the following negotiation transcript and produce a structured debrief plan in JSON.

The plan will be used by a Socratic reflection coach (not by the user). Be analytical, not judgmental.

Output exactly this JSON structure:
{
  "short_summary": "5-7 sentence narrative of how the negotiation went",
  "key_moments": [
    {
      "quote": "exact words the user said",
      "context": "1-line description of when/why this matters",
      "why_it_matters": "what assumption, priority, or emotion this might reveal"
    }
  ],
  "patterns": ["2-4 behavioural patterns you observed across multiple turns"],
  "hypotheses": ["2-3 tentative hypotheses about the user's goals or mental frame — stated as possibilities, not conclusions"],
  "question_plan": [
    {
      "moment_index": 0,
      "question": "the Socratic question to ask about this moment",
      "question_type": "reasoning | priority | assumption | emotion"
    }
  ]
}

Rules:
- key_moments: choose 3–6 moments. Prioritise: (1) first response to the opening offer, (2) first concession under pressure, (3) use or non-use of evidence/leverage, (4) the final exchange.
- patterns: look across all user turns, not just individual moments.
- hypotheses: tentative only — "It seems as though…", "The user may have been…"
- question_plan: map one question to each key moment. Questions must be open-ended. Never answer your own question.
- Output ONLY the JSON object — no markdown fences, no preamble, no explanation.

[TRANSCRIPT]
${formatted}`;
}

// ── Stage 2: Debrief coaching system prompt ──────────────────────────────────

export function buildDebriefSystemPrompt(
  plan: DebriefPlan,
  meta?: TranscriptMeta
): string {
  const scenario = meta?.scenario_name ?? "the negotiation";
  const personality = meta?.personality_name ?? "the counterpart";
  const startedAt = meta?.started_at ?? new Date().toISOString();
  const dateFormatted = new Date(startedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const keyMomentsFormatted = plan.key_moments
    .map(
      (m, i) =>
        `${i + 1}. Quote: "${m.quote}"\n   Context: ${m.context}\n   Why it matters: ${m.why_it_matters}`
    )
    .join("\n\n");

  const questionPlanFormatted = plan.question_plan
    .map(
      (q) =>
        `Moment ${q.moment_index + 1}: "${q.question}" (${q.question_type})`
    )
    .join("\n");

  const patternsFormatted = plan.patterns.map((p) => `• ${p}`).join("\n");

  return `You are Alex, a structured reflection coach. You are helping someone debrief a negotiation they just completed.

Your role is Socratic — you guide the user to surface their own reasoning. You ask questions. You do not advise or evaluate unless directly asked.

PHILOSOPHY:
- Assume the user acted with good intention at every step.
- Focus on mental models, assumptions, and priorities — not outcomes or tactics.
- Quote the user's exact words (from the key moments below) before asking about them.
- If the user gives a shallow answer, ask one follow-up. If they're still thin, accept and move on.
- If the user redirects to a different moment, follow them — their curiosity matters more than the preset order.
- If the user asks you a direct question (e.g. "what do you think?"), give a brief, grounded observation, then return to the reflective arc.

NEGOTIATION SUMMARY:
${plan.short_summary}

KEY MOMENTS TO EXPLORE:
${keyMomentsFormatted}

QUESTION PLAN:
${questionPlanFormatted}

OBSERVED PATTERNS (use only in Phase 3 synthesis, not Phase 2):
${patternsFormatted}

CONVERSATION STRUCTURE:
PHASE 1 (first message only): Briefly summarise what you read using the short_summary. Set tone. Ask your first question from the question_plan (moment 0), quoting the user's exact words.

PHASE 2 (next 2–3 turns): Work through the remaining key moments one at a time. Quote exact words, ask one question. Adapt if the user redirects.

PHASE 3 (1–2 turns): Ask "What do you think worked well for you?" then "What's one thing you'd try differently?" Reference the patterns only if relevant to synthesise what emerged.

PHASE 4 (final message): Produce the reflection summary using ONLY what the user said during this debrief. Start with: --- Reflection Summary ---

SUMMARY FORMAT:
--- Reflection Summary ---
Scenario: ${scenario} · ${personality}
Date: ${dateFormatted}

Key moments you reflected on:
• [moment 1 context — 1 line]
• [moment 2 context — 1 line]
• [moment 3 context if applicable]

In your own words:
• What felt strong: [paraphrase of user's stated strength]
• What you'd reconsider: [paraphrase of user's growth area]
• One thing to try next time: [user's concrete adjustment, near-verbatim]

---
This summary reflects your own thinking — not a score or evaluation.
Debrief completed: [current UTC ISO timestamp]`;
}

// ── Stage 3: Assessment prompt ───────────────────────────────────────────────

export function buildAssessmentPrompt(
  transcript: Transcript,
  messages: Array<{ role: string; content: string }>,
  summary: string
): string {
  const formattedTranscript = formatTranscript(transcript);

  const formattedDebrief = messages
    .map((m) => {
      const speaker = m.role === "user" ? "User" : "Alex";
      return `[${speaker}]: ${m.content}`;
    })
    .join("\n\n");

  return `You are an expert negotiation coach reviewing a practice session.

You have three inputs:
1. The original negotiation transcript
2. The reflection conversation (what the user said they were thinking)
3. The reflection summary (the user's own conclusions)

Produce a structured AI assessment with four clearly labelled sections. Be specific — quote moments from the transcript as evidence. You may use negotiation theory (anchoring, BATNA awareness, concession patterns, framing) but avoid unexplained jargon; explain concepts briefly if you use them.

Tone: direct, respectful, evidence-based. Not a grade. Not a lecture.

OUTPUT FORMAT:
--- AI Perspective ---

**Strengths**
[2–3 specific things the user did well, with quoted evidence from the transcript]

**Missed Opportunities**
[2–3 moments where a different approach might have shifted the dynamic — framed as observations, not criticism]

**Patterns**
[1–3 behavioural patterns observed across the conversation — especially relevant if they connect to what the user said in the debrief]

**One Suggestion**
[A single, concrete, actionable thing to try in the next negotiation. Specific enough to actually use.]

[NEGOTIATION TRANSCRIPT]
${formattedTranscript}

[DEBRIEF CONVERSATION]
${formattedDebrief}

[REFLECTION SUMMARY]
${summary}`;
}
