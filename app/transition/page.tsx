"use client";

import { TRANSITION_PAGE } from "@/experiment/content/uiStrings";

export default function TransitionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        {/* Checkmark-style icon */}
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
            <svg
              className="h-7 w-7 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {TRANSITION_PAGE.eyebrow}
          </p>
          <h1 className="text-xl font-semibold text-gray-900">{TRANSITION_PAGE.heading}</h1>
          <p className="text-justify text-sm leading-relaxed text-gray-500">
            {TRANSITION_PAGE.body}
          </p>
        </div>

        <button
          onClick={() => window.location.replace("/assessment")}
          className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          {TRANSITION_PAGE.cta}
        </button>
      </div>
    </div>
  );
}
