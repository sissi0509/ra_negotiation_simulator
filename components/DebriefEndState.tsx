"use client";

interface Props {
  sessionSummary?: string | null;
  assessment?: string | null;
  assessmentReady?: boolean;
  assessmentVisible?: boolean;
  assessmentFailed?: boolean;
  assessmentRetryUsed?: boolean;
  endedByUser?: boolean;
  summaryRegenerating?: boolean;
  onRevealAssessment: () => void;
  onRetryAssessment?: () => void;
  onRegenerateSummary?: () => void;
  onDownload: () => void;
  onBack: () => void;
}

export default function DebriefEndState({
  sessionSummary = null,
  assessment = null,
  assessmentReady = false,
  assessmentVisible = false,
  assessmentFailed = false,
  assessmentRetryUsed = false,
  endedByUser = false,
  summaryRegenerating = false,
  onRevealAssessment,
  onRetryAssessment,
  onRegenerateSummary,
  onDownload,
  onBack,
}: Props) {
  return (
    <div className="flex flex-col gap-6 px-8 py-8">
      {/* Session Themes Summary Card — shown immediately when available */}
      {(sessionSummary || summaryRegenerating) && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-6 py-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">
              {endedByUser ? "Partial Debrief Summary" : "Debrief Summary"}
            </p>
            {onRegenerateSummary && (
              <button
                onClick={onRegenerateSummary}
                disabled={summaryRegenerating}
                className="text-xs text-indigo-400 transition-colors hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {summaryRegenerating ? "Regenerating…" : "Regenerate"}
              </button>
            )}
          </div>
          {endedByUser && (
            <p className="mb-3 text-xs text-amber-600 font-medium">
              You ended this session early — the following reflects what was covered before it was complete.
            </p>
          )}
          {summaryRegenerating ? (
            <p className="text-sm text-indigo-300">Generating new summary…</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {sessionSummary!.split("\n").filter((l) => l.trim()).map((line, i) => (
                <li key={i} className="text-sm leading-relaxed text-gray-800">{line}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Assessment: loading → button → revealed (or failed → retry) */}
      {assessmentVisible && assessment ? (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-6 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-500">
            AI Assessment
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            {assessment}
          </p>
        </div>
      ) : assessmentFailed && !assessmentRetryUsed ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-5">
          <p className="mb-1 text-sm font-semibold text-red-700">
            Assessment unavailable
          </p>
          <p className="mb-1 text-xs text-red-500">
            We tried a few times but could not reach the AI. You can try once more — your session is already saved and nothing is lost.
          </p>
          <p className="mb-4 text-xs text-gray-400">
            You may also close this page and come back later.
          </p>
          <button
            onClick={onRetryAssessment}
            className="rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
          >
            Try Again
          </button>
        </div>
      ) : assessmentFailed && assessmentRetryUsed ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-5">
          <p className="mb-1 text-sm font-semibold text-gray-700">
            Assessment unavailable
          </p>
          <p className="text-xs text-gray-500">
            The AI could not be reached after multiple attempts. Your session is fully saved — only the assessment is missing. You can close this page safely.
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
            onClick={onRevealAssessment}
            disabled={!assessmentReady}
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            {assessmentReady ? "Get AI Assessment" : "Assessment Loading…"}
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
