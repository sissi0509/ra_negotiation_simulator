"use client";

import { useEffect } from "react";
import { isExperiment } from "@/lib/appMode";
import { COMPLETE_PAGE } from "@/experiment/content/uiStrings";

export default function CompletePage() {
  // Mark participant as completed and guard against arriving here too early.
  useEffect(() => {
    if (!isExperiment) return;
    fetch("/api/experiment/state")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        if (!data.steps_done?.final) { window.location.replace("/"); return; }
        if (data.status !== "completed") {
          fetch("/api/experiment/state", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "completed", completed_at: new Date().toISOString() }),
          }).catch(() => {});
        }
        // Clear all experiment-related localStorage keys.
        [
          "negotiation_session_id",
          "debrief_pending",
          "debrief_state",
          "experiment_debrief_id",
          "experiment_last_run_id",
          "experiment_round1_run_id",
          "intro_seen",
        ].forEach((k) => localStorage.removeItem(k));
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        {/* Checkmark icon */}
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-xl font-semibold text-gray-900">{COMPLETE_PAGE.heading}</h1>
          <p className="text-justify text-sm leading-relaxed text-gray-500">
            {COMPLETE_PAGE.thank_you}
          </p>
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50 px-5 py-4">
          <p className="text-sm font-medium text-gray-700">{COMPLETE_PAGE.next_heading}</p>
          <p className="mt-1 text-justify text-sm leading-relaxed text-gray-500">
            {COMPLETE_PAGE.next_body}
          </p>
        </div>

        <p className="text-center text-xs text-gray-400">
          {COMPLETE_PAGE.contact}
        </p>
      </div>
    </div>
  );
}
