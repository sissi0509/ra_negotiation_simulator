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

// Four survey checkpoints across the experiment.
export interface ExperimentSurveyFlags {
  pre: boolean;      // before round 1 negotiation
  post_r1: boolean;  // after round 1 intervention (debrief / reflection / nothing)
  post_r2: boolean;  // after round 2 negotiation
  final: boolean;    // exit experience survey at the very end
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
  surveys_done: ExperimentSurveyFlags;

  // Timestamps (ISO strings)
  enrolled_at: string;           // set by researcher when account is created
  started_at?: string;           // first time participant clicks "I understand — let's begin"
  completed_at?: string;         // when status flips to "completed"
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// Returns the scenario/personality for the participant's current round.
export function currentRoundAssignment(user: ExperimentUser): ExperimentRound | null {
  return user.rounds.find((r) => r.round === user.current_round) ?? null;
}

// Which survey type is due next for this participant?
export function nextSurveyDue(user: ExperimentUser): keyof ExperimentSurveyFlags | null {
  if (!user.surveys_done.pre) return "pre";
  if (!user.surveys_done.post_r1) return "post_r1";
  if (!user.surveys_done.post_r2) return "post_r2";
  if (!user.surveys_done.final) return "final";
  return null;
}
