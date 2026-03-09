import fs from "fs";
import path from "path";
import { Transcript } from "@/lib/transcript";

// ── Type definitions ─────────────────────────────────────────────────────────

export interface ImprovedMove {
  principle: string;
  alternative_response: string;
}

export interface KeyMomentPacket {
  title: string;
  transcript_evidence: string[];
  what_happened: string;
  diagnostic_insight: string;
  why_it_mattered: string;
  improved_move: ImprovedMove;
}

export interface DebriefPlan {
  key_moments: KeyMomentPacket[];
  initial_assessment_summary: string;
  additional_observations: string[];
}

export interface TranscriptMeta {
  scenario_name: string;
  personality_name: string;
  started_at: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadPromptFile(filename: string): string {
  const filePath = path.join(process.cwd(), "ai_prompts", filename);
  return fs.readFileSync(filePath, "utf-8");
}

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
  const matrix = loadPromptFile("negotiation_diagnostic_matrix.md");
  const protocol = loadPromptFile("pre_assessment_protocol.md");
  const formatted = formatTranscript(transcript);

  return `[NEGOTIATION DIAGNOSTIC MATRIX]
${matrix}

[PRE-ASSESSMENT INSTRUCTION PROTOCOL]
${protocol}

[TRANSCRIPT]
${formatted}

Output ONLY a valid JSON object matching this schema — no markdown fences, no preamble:
{
  "key_moments": [ { "title", "transcript_evidence", "what_happened", "diagnostic_insight", "why_it_mattered", "improved_move": { "principle", "alternative_response" } } ],
  "initial_assessment_summary": "...",
  "additional_observations": ["..."]
}`;
}

// ── Stage 2: Debrief coaching system prompt ──────────────────────────────────

export function buildDebriefSystemPrompt(
  plan: DebriefPlan,
  transcript: Transcript
): string {
  const framework = loadPromptFile("debrief_framework.md");

  const dateFormatted = new Date(transcript.started_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const keyMomentsFormatted = plan.key_moments
    .map(
      (m, i) =>
        `Moment ${i + 1} — ${m.title}\n  Evidence: ${m.transcript_evidence.join(" / ")}\n  What happened: ${m.what_happened}\n  Diagnostic insight: ${m.diagnostic_insight}\n  Why it mattered: ${m.why_it_mattered}`
    )
    .join("\n\n");

  const additionalObs =
    plan.additional_observations.length > 0
      ? plan.additional_observations.map((o) => `• ${o}`).join("\n")
      : "None.";

  const formattedTranscript = formatTranscript(transcript);

  return `[DEBRIEF FRAMEWORK]
${framework}

---

NEGOTIATION CONTEXT:
Scenario: ${transcript.scenario_name}  ·  Personality: ${transcript.personality_name}
Date: ${dateFormatted}

INITIAL ASSESSMENT SUMMARY:
${plan.initial_assessment_summary}

KEY MOMENTS TO EXPLORE:
${keyMomentsFormatted}

ADDITIONAL OBSERVATIONS (for your awareness — do not surface in debrief, only in session close):
${additionalObs}

NEGOTIATION TRANSCRIPT (full context):
${formattedTranscript}`;
}

// ── Stage 2b: Partial summary (manual end) ───────────────────────────────────

export function buildPartialSummaryPrompt(
  messages: Array<{ role: string; content: string }>
): { system: string; userMessage: string } {
  const conversationText = messages
    .map((m) => {
      const speaker = m.role === "user" ? "User" : "Sage";
      return `[${speaker}]: ${m.content}`;
    })
    .join("\n\n");

  const system = "You are summarizing a partially completed debrief conversation.";

  const userMessage = `[DEBRIEF CONVERSATION]
${conversationText}

Write a 2–3 sentence summary (plain prose, no headers or bullets) of what was
actually discussed in this conversation. Address the user directly ("you").
Focus only on what came up — do not mention what was not covered or planned.
End with one short sentence noting the session was not completed.`;

  return { system, userMessage };
}

// ── Stage 3: Assessment prompt ───────────────────────────────────────────────

export function buildAssessmentPrompt(
  transcript: Transcript,
  plan: DebriefPlan,
  messages: Array<{ role: string; content: string }>,
  sessionSummary: string
): string {
  const protocol = loadPromptFile("final_assessment_protocol.md");
  const formattedTranscript = formatTranscript(transcript);

  const keyMomentsSummary = plan.key_moments
    .map((m) => `- ${m.title}: ${m.diagnostic_insight}`)
    .join("\n");

  const additionalObs =
    plan.additional_observations.length > 0
      ? plan.additional_observations.map((o) => `• ${o}`).join("\n")
      : "None.";

  const formattedDebrief = messages
    .map((m) => {
      const speaker = m.role === "user" ? "User" : "Sage";
      return `[${speaker}]: ${m.content}`;
    })
    .join("\n\n");

  return `[FINAL ASSESSMENT PROTOCOL]
${protocol}

---

[NEGOTIATION TRANSCRIPT]
${formattedTranscript}

[PRE-ASSESSMENT PLAN]
Key moments:
${keyMomentsSummary}

Additional observations:
${additionalObs}

[DEBRIEF CONVERSATION]
${formattedDebrief}

[SESSION THEMES SUMMARY — from debrief]
${sessionSummary}`;
}
