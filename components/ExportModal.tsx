"use client";

import { Transcript, downloadJSON, downloadPlainText } from "@/lib/transcript";

interface Props {
  transcript: Transcript;
  counterpartRole: string;
  onClose: () => void;
}

export default function ExportModal({
  transcript,
  counterpartRole,
  onClose,
}: Props) {
  function handleJSON() {
    downloadJSON(transcript);
    onClose();
  }

  function handlePlainText() {
    downloadPlainText(transcript, counterpartRole);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-lg">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Export Transcript
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose a format to download your conversation.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleJSON}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Download JSON
          </button>
          <button
            onClick={handlePlainText}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Download Plain Text
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-center text-xs text-gray-400 transition-colors hover:text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
