const MIN_USER_TURNS = 3;

interface Props {
  onStartNew: () => void;
  onExport: () => void;
  onDebrief?: () => void;
  userTurns?: number;
  // In experiment mode, debrief is required — hide "Start New" and make Debrief the primary action.
  debriefRequired?: boolean;
}

export default function EndStatePrompt({ onStartNew, onExport, onDebrief, userTurns = 0, debriefRequired = false }: Props) {
  const canDebrief = userTurns >= MIN_USER_TURNS;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
      <p className="text-sm font-medium text-gray-600">Negotiation ended.</p>
      <div className="flex gap-3">
        <button
          onClick={onExport}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Export Transcript
        </button>
        {onDebrief && (
          <div className="relative group">
            <button
              onClick={canDebrief ? onDebrief : undefined}
              disabled={!canDebrief}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400 ${
                debriefRequired
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300"
                  : "border border-indigo-300 text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              Debrief
            </button>
            {!canDebrief && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 rounded-md bg-gray-800 px-3 py-2 text-center text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                The conversation is too short to debrief
              </div>
            )}
          </div>
        )}
        {!debriefRequired && (
          <button
            onClick={onStartNew}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Start New
          </button>
        )}
      </div>
    </div>
  );
}
