"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { gtyIntro } from "@/experiment/content/surveyData";

const SECONDS_PER_SLIDE = 15;

export default function GtyIntroPage() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_SLIDE);
  const [continuing, setContinuing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const principles = gtyIntro.principles;
  const isLast = slide === principles.length - 1;
  const canAdvance = secondsLeft === 0;

  // Redirect if already completed
  useEffect(() => {
    fetch("/api/experiment/state")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data?.steps_done?.gty_intro) router.replace("/"); })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset and start timer whenever slide changes
  useEffect(() => {
    setSecondsLeft(SECONDS_PER_SLIDE);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slide]);

  function handleNext() {
    if (!canAdvance) return;
    setSlide((s) => s + 1);
  }

  async function handleFinish() {
    if (!canAdvance) return;
    setContinuing(true);
    await fetch("/api/experiment/state", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ steps_done: { gty_intro: true } }),
    }).catch(() => {});
    router.replace("/");
  }

  const principle = principles[slide];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {gtyIntro.title}
          </p>
          <p className="mt-1 text-sm text-gray-500">{gtyIntro.subtitle}</p>
        </div>

        {/* Progress dots */}
        <div className="mb-6 flex justify-center gap-2">
          {principles.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i < slide
                  ? "w-4 bg-gray-900"
                  : i === slide
                  ? "w-6 bg-gray-900"
                  : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Principle card */}
        <div className="rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">

          {/* Slide counter */}
          <p className="mb-5 text-xs font-medium uppercase tracking-wide text-gray-400">
            Principle {principle.number} of {principles.length}
          </p>

          {/* Number badge + title */}
          <div className="mb-5 flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-base font-bold text-white">
              {principle.number}
            </span>
            <h2 className="text-lg font-semibold text-gray-900">
              {principle.title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-gray-600">
            {principle.description}
          </p>

          {/* Timer + button */}
          <div className="mt-8 flex flex-col items-center gap-3">
            {!canAdvance ? (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 bg-gray-50">
                <span className="text-lg font-semibold text-gray-400 tabular-nums">
                  {secondsLeft}
                </span>
              </div>
            ) : (
              <button
                onClick={isLast ? handleFinish : handleNext}
                disabled={continuing}
                className="w-full rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
              >
                {continuing
                  ? "Starting…"
                  : isLast
                  ? "I understand — let's begin"
                  : "Next →"}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
