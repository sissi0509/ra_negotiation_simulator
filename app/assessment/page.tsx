"use client";

import { useState, useEffect, useRef } from "react";
import { isExperiment } from "@/lib/appMode";
import type { ExperimentCondition } from "@/lib/appMode";
import { ASSESSMENT_PAGE } from "@/experiment/content/uiStrings";

export default function AssessmentPage() {
  const [condition, setCondition] = useState<ExperimentCondition | null>(null);
  const [assessment, setAssessment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notReady, setNotReady] = useState(false);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Back-button guard + fetch condition so we know which path to take.
  useEffect(() => {
    if (!isExperiment) return;
    fetch("/api/experiment/state")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        const prerequisite =
          data.condition === "control"
            ? data.steps_done?.s4_efficacy
            : data.steps_done?.s5_improvement;
        if (!prerequisite) { window.location.replace("/"); return; }
        if (data.steps_done?.final) { window.location.replace("/"); return; }
        setCondition(data.condition as ExperimentCondition);
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Once we know the condition, fetch or generate the assessment.
  useEffect(() => {
    if (!condition) return;
    let cancelled = false;

    async function load() {
      try {
        let assessmentText: string | null = null;

        if (condition === "ai_debrief") {
          const debriefId = localStorage.getItem("experiment_debrief_id");
          const url = debriefId
            ? `/api/debrief/latest?id=${encodeURIComponent(debriefId)}`
            : "/api/debrief/latest";
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            assessmentText = data?.assessment ?? null;
          }
        } else {
          const runId = localStorage.getItem("experiment_round1_run_id");
          if (!runId) { if (!cancelled) setNotReady(true); return; }
          const res = await fetch("/api/assessment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ run_id: runId }),
          });
          if (res.ok) {
            const data = await res.json();
            assessmentText = data?.assessment ?? null;
          }
        }

        if (!cancelled) {
          if (assessmentText) {
            setAssessment(assessmentText);
            setLoading(false);
          } else {
            setNotReady(true);
            setLoading(false);
            pollRef.current = setTimeout(load, 8000);
          }
        }
      } catch {
        if (!cancelled) { setNotReady(true); setLoading(false); }
      }
    }

    load();
    return () => {
      cancelled = true;
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [condition]);

  const isDebrief = condition === "ai_debrief";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        <div className="mb-6 flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {ASSESSMENT_PAGE.eyebrow}
          </p>
          <h1 className="text-xl font-semibold text-gray-900">{ASSESSMENT_PAGE.heading}</h1>
          <p className="text-sm text-gray-500">
            {isDebrief ? ASSESSMENT_PAGE.subtitle_ai_debrief : ASSESSMENT_PAGE.subtitle_other}
          </p>
        </div>

        {loading ? (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-400">Loading your assessment…</p>
          </div>
        ) : notReady && !assessment ? (
          <div className="rounded-lg border border-amber-100 bg-amber-50 px-5 py-4">
            <p className="text-sm font-medium text-amber-800">{ASSESSMENT_PAGE.not_ready_heading}</p>
            <p className="mt-1 text-justify text-sm leading-relaxed text-amber-700">
              {ASSESSMENT_PAGE.not_ready_body}
            </p>
          </div>
        ) : assessment ? (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-6 py-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-600">
              {isDebrief ? ASSESSMENT_PAGE.assessment_label_ai_debrief : ASSESSMENT_PAGE.assessment_label_other}
            </p>
            <p className="whitespace-pre-wrap text-justify text-sm leading-relaxed text-gray-800">
              {assessment}
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-red-100 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-700">{ASSESSMENT_PAGE.error_heading}</p>
            <p className="mt-1 text-justify text-sm leading-relaxed text-red-600">
              {ASSESSMENT_PAGE.error_body}
            </p>
          </div>
        )}

        {!loading && (
          <div className="mt-8">
            <button
              onClick={() => window.location.replace("/survey?type=final")}
              className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              {ASSESSMENT_PAGE.cta}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
