"use client";

import { useState, useEffect, useRef } from "react";
import { DEBRIEF_INTRO } from "@/content/debriefIntro";
import { isExperiment } from "@/lib/appMode";

const READ_SECONDS = 15;

interface Props {
  scenarioName: string;
  personalityName: string;
  userTurnCount: number;
  isLoading?: boolean;
  isPrepared?: boolean;
  error?: string | null;
  onPrepare: () => void;
  onBegin: () => void;
}

export default function DebriefLoadingScreen({
  scenarioName,
  personalityName,
  userTurnCount,
  isLoading = false,
  isPrepared = false,
  error = null,
  onPrepare,
  onBegin,
}: Props) {
  const [secondsLeft, setSecondsLeft] = useState(isExperiment ? READ_SECONDS : 0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prepareCalledRef = useRef(false);
  const turnLabel = userTurnCount === 1 ? "1 turn" : `${userTurnCount} turns`;

  // Kick off API preparation immediately on mount — runs in parallel with the countdown.
  // Guard ref prevents React Strict Mode's double-invoke from creating two DB documents.
  useEffect(() => {
    if (prepareCalledRef.current) return;
    prepareCalledRef.current = true;
    onPrepare();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Read-timer countdown (experiment mode only).
  useEffect(() => {
    if (!isExperiment || secondsLeft === 0) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { clearInterval(timerRef.current!); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

        <p className="text-justify text-sm leading-relaxed text-gray-500">
          {DEBRIEF_INTRO}
        </p>

        {/* Bottom action area — three states */}
        {secondsLeft > 0 ? (
          // Still in the read-timer window: show countdown circle.
          // A subtle note lets the user know preparation is already running.
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-200 bg-indigo-50">
              <span className="text-sm font-semibold text-indigo-400 tabular-nums">
                {secondsLeft}
              </span>
            </div>
            <p className="text-xs text-gray-400">Please read before continuing</p>
            {isLoading && (
              <p className="text-xs text-indigo-400">Preparing your debrief…</p>
            )}
          </div>
        ) : isPrepared ? (
          // Ready — both countdown done and API preparation complete.
          <button
            onClick={onBegin}
            className="rounded-md bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
          >
            Start Debrief
          </button>
        ) : isLoading ? (
          // Countdown finished but API still working.
          <div className="flex flex-col items-center gap-2">
            <button
              disabled
              className="w-full rounded-md bg-indigo-300 px-5 py-2.5 text-sm font-medium text-white cursor-not-allowed"
            >
              Preparing your debrief…
            </button>
            <p className="text-center text-xs text-gray-400">
              This may take up to 1–2 minutes. Please stay on this page.
            </p>
          </div>
        ) : (
          // Error state — let the user retry preparation.
          <button
            onClick={onPrepare}
            className="rounded-md bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
          >
            Try Again
          </button>
        )}

        {error && (
          <p className="text-center text-xs text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}
