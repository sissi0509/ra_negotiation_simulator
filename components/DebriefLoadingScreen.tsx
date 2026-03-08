import { useState, useEffect } from "react";

const LOADING_MESSAGES = [
  "Analyzing your negotiation…",
  "Still working…",
  "Hang tight…",
  "Almost ready…",
];

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
  const [msgIndex, setMsgIndex] = useState(0);
  const turnLabel = userTurnCount === 1 ? "1 turn" : `${userTurnCount} turns`;

  useEffect(() => {
    if (!isLoading) {
      setMsgIndex(0);
      return;
    }
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 10000);
    return () => clearInterval(id);
  }, [isLoading]);

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

        {isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-gray-400">This may take 1–2 minutes.</p>
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <p className="text-sm text-gray-500">
                {LOADING_MESSAGES[msgIndex]}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500">
            Sage will guide you through a structured reflection of your negotiation.
          </p>
        )}

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
