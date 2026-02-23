"use client";

import { useRef, useState } from "react";
import { Transcript } from "@/lib/transcript";

interface Props {
  onLoad: (transcript: Transcript) => void;
}

export default function DebriefUpload({ onLoad }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFile(file: File) {
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (
          !Array.isArray(json.messages) ||
          !json.scenario_name ||
          !json.personality_name ||
          !json.started_at
        ) {
          setError(
            "This doesn't look like a valid transcript. Please export one from the simulator."
          );
          setFileName(null);
          return;
        }
        onLoad(json as Transcript);
      } catch {
        setError(
          "This doesn't look like a valid transcript. Please export one from the simulator."
        );
        setFileName(null);
      }
    };
    reader.readAsText(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-xl border border-indigo-100 bg-white px-8 py-10 shadow-sm">
        <div className="flex flex-col gap-1 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-indigo-400">
            Negotiation Debrief
          </p>
          <h1 className="text-xl font-semibold text-gray-900">
            Load a transcript
          </h1>
          <p className="text-sm text-gray-500">
            Upload a saved transcript JSON to begin your debrief.
          </p>
        </div>

        <div
          className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-indigo-200 px-4 py-8 transition-colors hover:border-indigo-400 hover:bg-indigo-50"
          onClick={() => inputRef.current?.click()}
        >
          <svg
            className="h-8 w-8 text-indigo-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-sm text-gray-500">
            {fileName ? (
              <span className="font-medium text-indigo-600">{fileName}</span>
            ) : (
              "Click to choose a transcript JSON file"
            )}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {error && (
          <p className="text-center text-xs text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}
