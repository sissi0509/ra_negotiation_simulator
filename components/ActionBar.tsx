interface Props {
  onExport: () => void;
  onEnd: () => void;
  onReset: () => void;
  canExport: boolean;
  conversationEnded: boolean;
}

export default function ActionBar({
  onExport,
  onEnd,
  onReset,
  canExport,
  conversationEnded,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onExport}
        disabled={!canExport}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Export
      </button>
      <button
        onClick={onEnd}
        disabled={conversationEnded}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        End Conversation
      </button>
      <button
        onClick={onReset}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
      >
        Reset
      </button>
    </div>
  );
}
