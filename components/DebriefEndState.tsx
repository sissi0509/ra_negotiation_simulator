"use client";

interface Props {
  summary?: string | null;
  assessment?: string | null;
  isAssessmentLoading?: boolean;
  onGetAssessment: () => void;
  onDownload: () => void;
  onBack: () => void;
}

export default function DebriefEndState({
  summary = null,
  assessment = null,
  isAssessmentLoading = false,
  onGetAssessment,
  onDownload,
  onBack,
}: Props) {
  const cleanSummary = summary
    ? summary.replace(/^---\s*Reflection Summary\s*---\s*/i, "").trim()
    : null;

  return (
    <div className="flex flex-col gap-6 px-8 py-8">
      {/* Reflection Summary Card — only shown when available */}
      {cleanSummary && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-6 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-indigo-400">
            Reflection Summary
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            {cleanSummary}
          </p>
        </div>
      )}

      {/* Assessment: button prompt → loading → result */}
      {assessment ? (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-6 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-500">
            AI Perspective
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            {assessment}
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-5">
          <p className="mb-1 text-sm font-semibold text-gray-800">
            Want an objective assessment?
          </p>
          <p className="mb-4 text-xs text-gray-500">
            Get an AI-powered evaluation of your strategy, strengths, and areas
            for improvement based on the full negotiation.
          </p>
          <button
            onClick={onGetAssessment}
            disabled={isAssessmentLoading}
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            {isAssessmentLoading ? "Generating…" : "Get AI Perspective"}
          </button>
        </div>
      )}

      {/* Action row */}
      <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
        <button
          onClick={onDownload}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Download Report
        </button>
        <button
          onClick={onBack}
          className="rounded-md border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
        >
          Back to Simulator
        </button>
      </div>
    </div>
  );
}
