"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { surveyS1, surveyS2, surveyS3, surveyS4, surveyS5, surveyS6 } from "@/experiment/content/surveyData";

type SurveyType = "pre" | "s2_efficacy" | "s3_debrief" | "s4_efficacy" | "final";
type ExperimentCondition = "ai_debrief" | "static_reflection" | "control";

interface Question { id: string; text: string; type?: "likert" | "text"; optional?: boolean; }

const SURVEYS: Record<SurveyType, { title: string; subtitle: string; questions: Question[] }> = {
  pre:         { title: surveyS1.title, subtitle: surveyS1.subtitle, questions: surveyS1.questions },
  s2_efficacy: { title: surveyS2.title, subtitle: surveyS2.subtitle, questions: surveyS2.questions },
  s3_debrief:  { title: surveyS3.title, subtitle: surveyS3.subtitle, questions: surveyS3.questions_all_groups },
  // Combined post-round-2 survey: S4 efficacy/insight first, then S5 transfer items
  s4_efficacy: { title: surveyS4.title, subtitle: surveyS4.subtitle, questions: [...surveyS4.questions, ...surveyS4.questions_transfer] as Question[] },
  // Final experience survey (S6 only — shown after the AI assessment)
  final:       { title: surveyS6.title, subtitle: surveyS6.subtitle, questions: surveyS6.questions_all_groups as Question[] },
};

// Condition-specific tail questions appended to the S6 final survey only.
const EXTRA_QUESTIONS: Record<ExperimentCondition, Question[]> = {
  ai_debrief:       surveyS6.questions_by_condition.ai_debrief as Question[],
  static_reflection: surveyS6.questions_by_condition.static_reflection as Question[],
  control:          surveyS6.questions_by_condition.control as Question[],
};

// Split index for the combined s4_efficacy survey: S4 questions come first, S5 transfer questions after.
const S4_QUESTION_COUNT = surveyS4.questions.length; // 5 efficacy/insight items before the transfer section

const S3_SUBTITLES: Record<ExperimentCondition, string> = {
  ai_debrief:       surveyS3.groups.ai_debrief.subtitle_override,
  static_reflection: surveyS3.groups.static_reflection.subtitle_override,
  control:          surveyS3.subtitle,
};

const SCALE = [1, 2, 3, 4, 5, 6, 7];

// Step progress for each survey type within each condition's numbered step list.
// Numbers correspond to the step positions in experiment_intro.json steps_by_condition.
// Step numbers match experiment_intro.json steps_by_condition lists.
// s4_efficacy = combined S4+S5 survey; final = S6, shown after the AI assessment.
const STEP_PROGRESS: Record<
  ExperimentCondition,
  Partial<Record<SurveyType, { step: number; total: number }>>
> = {
  ai_debrief: {
    pre:         { step: 1,  total: 10 },
    s2_efficacy: { step: 4,  total: 10 },
    s3_debrief:  { step: 6,  total: 10 },
    s4_efficacy: { step: 8,  total: 10 },
    final:       { step: 10, total: 10 },
  },
  static_reflection: {
    pre:         { step: 1,  total: 10 },
    s2_efficacy: { step: 4,  total: 10 },
    s3_debrief:  { step: 6,  total: 10 },
    s4_efficacy: { step: 8,  total: 10 },
    final:       { step: 10, total: 10 },
  },
  control: {
    pre:         { step: 1,  total: 8 },
    s2_efficacy: { step: 4,  total: 8 },
    s4_efficacy: { step: 6,  total: 8 },
    final:       { step: 8,  total: 8 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────

interface LikertRowProps {
  question: string;
  value: number | null;
  onChange: (v: number) => void;
}

function LikertRow({ question, value, onChange }: LikertRowProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-800">{question}</p>
      <div className="flex gap-1.5">
        {SCALE.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex flex-1 flex-col items-center rounded-md border py-2 text-sm font-medium transition-colors ${
              value === n
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 px-1">
        <span>Strongly disagree</span>
        <span>Strongly agree</span>
      </div>
    </div>
  );
}

interface TextRowProps {
  question: string;
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
}

function TextRow({ question, value, onChange, optional }: TextRowProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-800">
        {question}
        {optional && <span className="ml-1.5 text-xs text-gray-400">(optional)</span>}
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="Type your response here…"
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none"
      />
    </div>
  );
}

function getNextRoute(type: SurveyType, condition: ExperimentCondition | null, runId?: string): string {
  if (type === "pre") return "/gty-intro";
  if (type === "s2_efficacy") {
    if (condition === "ai_debrief") return "/debrief";
    if (condition === "static_reflection") return `/reflection?run_id=${runId ?? ""}&round=1`;
    return "/"; // control: go start round 2
  }
  if (type === "s4_efficacy") {
    // Combined S4+S5 survey done — next is the AI assessment (via transition page)
    return "/transition";
  }
  if (type === "final") {
    // S6 final experience survey done — study complete
    return "/complete";
  }
  return "/";
}

function SurveyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") ?? "pre") as SurveyType;
  const runId = searchParams.get("run_id") ?? undefined;

  const [condition, setCondition] = useState<ExperimentCondition | null>(null);
  const [responses, setResponses] = useState<Record<string, number | string | null>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function renderQuestion(q: Question) {
    return q.type === "text" ? (
      <TextRow
        key={q.id}
        question={q.text}
        value={(responses[q.id] as string) ?? ""}
        onChange={(v) => setResponses((prev) => ({ ...prev, [q.id]: v }))}
        optional={q.optional}
      />
    ) : (
      <LikertRow
        key={q.id}
        question={q.text}
        value={responses[q.id] as number | null}
        onChange={(v) => setResponses((prev) => ({ ...prev, [q.id]: v }))}
      />
    );
  }

  useEffect(() => {
    fetch("/api/experiment/state")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const cond: ExperimentCondition = data?.condition ?? "control";
        setCondition(cond);
        // If this survey is already completed, redirect forward immediately.
        if (data?.steps_done?.[type]) {
          router.replace(getNextRoute(type, cond, runId));
        }
      })
      .catch(() => setCondition("control"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const survey = SURVEYS[type];
  // For the S6 final survey, append condition-specific experience questions.
  // The s4_efficacy combined survey already has all its questions baked in via SURVEYS.
  const questions: Question[] =
    type === "final" && condition
      ? [...survey.questions, ...EXTRA_QUESTIONS[condition]]
      : survey.questions;
  const subtitle =
    type === "s3_debrief" && condition ? S3_SUBTITLES[condition] : survey.subtitle;

  useEffect(() => {
    setResponses(Object.fromEntries(questions.map((q) => [q.id, q.type === "text" ? "" : null])));
  }, [questions.length]);

  // Optional text questions are excluded from the "all answered" check.
  const allAnswered = questions.every((q) => q.optional || responses[q.id] != null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allAnswered) { setError("Please answer all questions before submitting."); return; }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, run_id: runId, responses }),
      });
      if (!res.ok) throw new Error();

      router.replace(getNextRoute(type, condition, runId));
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (condition === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-400">Loading…</p>
      </div>
    );
  }

  const progress = condition ? STEP_PROGRESS[condition]?.[type] : undefined;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        <div className="mb-8 flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {progress ? `Step ${progress.step} of ${progress.total} · ` : ""}{survey.title}
          </p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {type === "s4_efficacy" ? (
            <>
              {/* Section 1 — S4: efficacy + insight right after Round 2 */}
              <div className="flex flex-col gap-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 border-b border-gray-100 pb-2">
                  About this negotiation
                </p>
                {questions.slice(0, S4_QUESTION_COUNT).map(renderQuestion)}
              </div>
              {/* Section 2 — S5: perceived transfer across rounds */}
              <div className="flex flex-col gap-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 border-b border-gray-100 pb-2">
                  Comparing the two rounds
                </p>
                {questions.slice(S4_QUESTION_COUNT).map(renderQuestion)}
              </div>
            </>
          ) : (
            questions.map(renderQuestion)
          )}

          {error && (
            <p className="rounded-md bg-red-50 px-4 py-3 text-center text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || !allAnswered}
            className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit and continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function SurveyPage() {
  return (
    <Suspense>
      <SurveyForm />
    </Suspense>
  );
}
