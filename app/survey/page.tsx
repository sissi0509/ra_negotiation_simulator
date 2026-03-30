"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Likert scale options shared by all questions.
const SCALE = [
  { value: 1, label: "1\nStrongly\nDisagree" },
  { value: 2, label: "2" },
  { value: 3, label: "3\nNeutral" },
  { value: 4, label: "4" },
  { value: 5, label: "5\nStrongly\nAgree" },
];

const PRE_QUESTIONS = [
  { id: "q1", text: "I feel confident in my ability to negotiate effectively." },
  { id: "q2", text: "I know how to set a clear goal before entering a negotiation." },
  { id: "q3", text: "I am comfortable making the first offer in a negotiation." },
  { id: "q4", text: "I can adapt my approach when a negotiation is not going well." },
  { id: "q5", text: "I understand how to use alternatives and outside options in a negotiation." },
];

const POST_QUESTIONS = [
  { id: "q1", text: "I feel more confident in my negotiation ability after this session." },
  { id: "q2", text: "The debrief helped me understand what I did well and what I could improve." },
  { id: "q3", text: "I identified at least one concrete thing I would do differently next time." },
  { id: "q4", text: "The AI coach's feedback was relevant and easy to understand." },
  { id: "q5", text: "I would find this tool useful for practicing real-world negotiations." },
];

interface LikertRowProps {
  question: string;
  value: number | null;
  onChange: (v: number) => void;
}

function LikertRow({ question, value, onChange }: LikertRowProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-800">{question}</p>
      <div className="flex gap-2">
        {SCALE.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-md border px-2 py-2 text-xs transition-colors ${
              value === opt.value
                ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="text-sm font-medium">{opt.value}</span>
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

function SurveyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") ?? "pre") as "pre" | "post";
  const runId = searchParams.get("run_id") ?? undefined;

  const questions = type === "pre" ? PRE_QUESTIONS : POST_QUESTIONS;
  const title = type === "pre" ? "Pre-Study Survey" : "Post-Session Survey";
  const subtitle =
    type === "pre"
      ? "Before you start, please answer a few questions about your negotiation experience."
      : "Thank you for completing the session. Please answer a few questions about your experience.";

  const [responses, setResponses] = useState<Record<string, number | null>>(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  );
  const [openText, setOpenText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allAnswered = questions.every((q) => responses[q.id] !== null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          run_id: runId,
          responses: { ...responses, open_text: openText },
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      // After pre-survey: go to simulator. After post-survey: go to home.
      router.push(type === "pre" ? "/" : "/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        <div className="mb-8 flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{title}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {questions.map((q) => (
            <LikertRow
              key={q.id}
              question={q.text}
              value={responses[q.id]}
              onChange={(v) => setResponses((prev) => ({ ...prev, [q.id]: v }))}
            />
          ))}

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">
              {type === "pre"
                ? "Is there anything else about your negotiation background you'd like to share? (optional)"
                : "Any other thoughts about this session? (optional)"}
            </label>
            <textarea
              value={openText}
              onChange={(e) => setOpenText(e.target.value)}
              rows={3}
              placeholder="Your response (optional)"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>

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
