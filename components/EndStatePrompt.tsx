interface Props {
  onStartNew: () => void;
  onExport: () => void;
  onDebrief?: () => void;
}

export default function EndStatePrompt({ onStartNew, onExport, onDebrief }: Props) {
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
          <button
            onClick={onDebrief}
            className="rounded-md border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Debrief
          </button>
        )}
        <button
          onClick={onStartNew}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Start New
        </button>
      </div>
    </div>
  );
}
