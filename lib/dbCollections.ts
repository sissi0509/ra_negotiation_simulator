// Single source of truth for MongoDB collection names.
// In experiment mode, writes go to isolated experiment_* collections so
// real participant data is never mixed with product / developer sessions.

const isExperimentMode = process.env.NEXT_PUBLIC_APP_MODE === "experiment";

export const COLLECTIONS = {
  transcripts: isExperimentMode ? "experiment_transcripts" : "transcripts",
  debriefs:    isExperimentMode ? "experiment_debriefs"    : "debriefs",
  assessments: isExperimentMode ? "experiment_assessments" : "assessments",
} as const;
