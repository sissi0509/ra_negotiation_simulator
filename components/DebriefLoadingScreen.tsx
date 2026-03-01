interface Props {
  scenarioName: string;
  personalityName: string;
  userTurnCount: number;
  isLoading?: boolean;
  error?: string | null;
  onStart: () => void;
}

export default function DebriefLoadingScreen({
  scenarioName,
  personalityName,
  userTurnCount,
  isLoading = false,
  error = null,
  onStart,
}: Props) {
  const turnLabel = userTurnCount === 1 ? "1 turn" : `${userTurnCount} turns`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-xl border border-indigo-100 bg-white px-8 py-10 shadow-sm">
        <div className="flex flex-col gap-1 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-indigo-400">
            Negotiation Debrief
          </p>
          <h1 className="text-xl font-semibold text-gray-900">
            Ready to reflect?
          </h1>
        </div>

        <div className="rounded-lg border border-indigo-50 bg-indigo-50 px-4 py-3 text-center">
          <p className="text-sm font-medium text-indigo-900">{scenarioName}</p>
          <p className="text-xs text-indigo-500">
            {personalityName} · {turnLabel}
          </p>
        </div>

        <p className="text-center text-sm text-gray-500">
          {isLoading
            ? "Analyzing your negotiation…"
            : "Sage will guide you through a structured reflection of your negotiation."}
        </p>

        {error && (
          <p className="text-center text-xs text-red-500">{error}</p>
        )}

        <button
          onClick={onStart}
          disabled={isLoading}
          className="rounded-md bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {isLoading ? "Starting…" : "Start Debrief"}
        </button>
      </div>
    </div>
  );
}
