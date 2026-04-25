export type AppMode = "product" | "experiment";

// Set NEXT_PUBLIC_APP_MODE=experiment in .env.local to enable experiment mode.
export const APP_MODE: AppMode =
  (process.env.NEXT_PUBLIC_APP_MODE as AppMode) === "experiment"
    ? "experiment"
    : "product";

export const isExperiment = APP_MODE === "experiment";

// ── Experiment participant schema ─────────────────────────────────────────────
// Stored in the MongoDB `users` collection alongside regular users.
// Researcher creates these documents before the study starts.

export type ExperimentGroup = "A" | "B" | "C";

// Human-readable alias for the group letter. Use this in code logic, not the letter.
// A → AI debrief (full app)
// B → Static reflection (transcript + written response, no AI coach)
// C → Control (negotiate only, no debrief)
export type ExperimentCondition = "ai_debrief" | "static_reflection" | "control";

export const CONDITION_BY_GROUP: Record<ExperimentGroup, ExperimentCondition> = {
  A: "ai_debrief",
  B: "static_reflection",
  C: "control",
};

// One entry per round. Researcher pre-assigns scenario and personality for each round.
export interface ExperimentRound {
  round: number;                 // 1-indexed
  scenario: string;              // scenario id, e.g. "salary_negotiation"
  personality: string;           // personality id, e.g. "aggressive"
}

// All step checkpoints across the experiment — surveys and activity steps.
export interface ExperimentStepsFlags {
  // Surveys
  pre: boolean;              // S1 — baseline, before round 1
  gty_intro: boolean;        // Getting to Yes intro seen, after S1
  s2_efficacy: boolean;      // S2 — self-efficacy, after round 1, before debrief
  s3_debrief: boolean;       // S3 — post-debrief/reflection survey, Groups A/B only
  s4_efficacy: boolean;      // S4 — self-efficacy, after round 2
  s5_improvement: boolean;   // S5 — learning transfer, Groups A/B only
  final: boolean;            // S6 — final experience survey
  // Activity steps
  round1_complete: boolean;       // Round 1 negotiation ended
  debrief_complete: boolean;      // Sage debrief session ended (Group A)
  reflection_complete: boolean;   // Written reflection submitted (Group B)
  round2_complete: boolean;       // Round 2 negotiation ended
}

export type ExperimentStatus = "active" | "completed" | "withdrawn";

export interface ExperimentUser {
  // Auth fields (shared with regular users)
  email: string;
  name?: string;
  type: "participant";           // discriminator — regular users have type: "user"

  // Researcher-assigned fields (set before the study, not writable by the app)
  participant_id: string;        // anonymous ID for analysis, e.g. "P01"
  group: ExperimentGroup;
  condition: ExperimentCondition;
  rounds: ExperimentRound[];     // one entry per round (typically 2)

  // Progress (updated by the app as the participant moves through the study)
  current_round: number;         // which round they are currently on (starts at 1)
  status: ExperimentStatus;
  consent_given: boolean;
  steps_done: ExperimentStepsFlags;

  // Timestamps (ISO strings)
  enrolled_at: string;           // set by researcher when account is created
  started_at?: string;           // first time participant clicks "I understand — let's begin"
  completed_at?: string;         // when status flips to "completed"
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// Returns the scenario/personality for the participant's current round.
export function currentRoundAssignment(user: ExperimentUser): ExperimentRound | null {
  return user.rounds?.find((r) => r.round === user.current_round) ?? null;
}

// Which survey type is due next for this participant?
export function nextSurveyDue(user: ExperimentUser): keyof ExperimentStepsFlags | null {
  if (!user.steps_done?.pre) return "pre";
  if (!user.steps_done?.gty_intro) return "gty_intro";
  if (!user.steps_done?.s2_efficacy) return "s2_efficacy";
  if (user.condition !== "control" && !user.steps_done?.s3_debrief) return "s3_debrief";
  if (!user.steps_done?.s4_efficacy) return "s4_efficacy";
  if (user.condition !== "control" && !user.steps_done?.s5_improvement) return "s5_improvement";
  if (!user.steps_done?.final) return "final";
  return null;
}
