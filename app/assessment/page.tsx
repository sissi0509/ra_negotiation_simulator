"use client";

import { useState, useEffect, useRef } from "react";
import { isExperiment } from "@/lib/appMode";
import type { ExperimentCondition } from "@/lib/appMode";
import { ASSESSMENT_PAGE } from "@/experiment/content/uiStrings";

const SECTION_HEADERS = new Set(["Context", "Strengths", "Areas for Improvement", "Next Steps"]);

const SECTION_META: Record<string, { icon: string; accent: string; label: string }> = {
  "Context": { icon: "🗂", accent: "border-blue-400 bg-blue-50", label: "text-blue-700" },
  "Strengths": { icon: "✦", accent: "border-emerald-400 bg-emerald-50", label: "text-emerald-700" },
  "Areas for Improvement": { icon: "◈", accent: "border-amber-400 bg-amber-50", label: "text-amber-700" },
  "Next Steps": { icon: "→", accent: "border-indigo-400 bg-indigo-50", label: "text-indigo-700" },
};

function AssessmentBody({ text }: { text: string }) {
  type Section = { heading: string; lines: string[] };
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const raw of text.split("\n")) {
    const line = raw.trimEnd();
    if (SECTION_HEADERS.has(line.trim())) {
      if (current) sections.push(current);
      current = { heading: line.trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);

  if (sections.length === 0) {
    return (
      <p className="whitespace-pre-wrap text-justify text-sm leading-relaxed text-gray-800">
        {text}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map(({ heading, lines }) => {
        const meta = SECTION_META[heading] ?? { icon: "•", accent: "border-gray-300 bg-gray-50", label: "text-gray-700" };
        const body = lines.join("\n").trim();
        return (
          <div key={heading} className={`rounded-lg border-l-4 px-5 py-4 ${meta.accent}`}>
            <p className={`mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${meta.label}`}>
              <span>{meta.icon}</span>
              {heading}
            </p>
            <p className="whitespace-pre-wrap text-justify text-sm leading-relaxed text-gray-800">
              {body}
            </p>
          </div>
        );
      })}
    </div>
  );
}

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
        // Combined S4+S5 survey must be completed before the assessment is shown.
        if (!data.steps_done?.s4_efficacy) { window.location.replace("/"); return; }
        // If the final experience survey is already done the study is complete.
        if (data.steps_done?.final) { window.location.replace("/complete"); return; }
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
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              {isDebrief ? ASSESSMENT_PAGE.assessment_label_ai_debrief : ASSESSMENT_PAGE.assessment_label_other}
            </p>
            <AssessmentBody text={assessment} />
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
              onClick={async () => {
                await fetch("/api/experiment/state", {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ steps_done: { assessment_complete: true } }),
                }).catch(() => {});
                window.location.replace("/survey?type=final");
              }}
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
