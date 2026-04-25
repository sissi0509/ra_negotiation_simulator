"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { experimentIntro } from "@/experiment/content/surveyData";

type Condition = "ai_debrief" | "static_reflection" | "control";

interface StepsDone {
  pre?: boolean;
  gty_intro?: boolean;
  s2_efficacy?: boolean;
  s3_debrief?: boolean;
  s4_efficacy?: boolean;
  s5_improvement?: boolean;
  final?: boolean;
  round1_complete?: boolean;
  debrief_complete?: boolean;
  reflection_complete?: boolean;
  round2_complete?: boolean;
}

function getCurrentStepLabel(
  pathname: string,
  surveyType: string | null,
  done: StepsDone
): string {
  if (pathname === "/gty-intro") return "Read a short negotiation guide";
  if (pathname === "/debrief") return "AI debrief with Sage";
  if (pathname === "/reflection") return "Written reflection";
  if (pathname === "/transition") return "Your AI assessment";
  if (pathname === "/assessment") return "Your AI assessment";
  if (pathname === "/survey") {
    if (surveyType === "pre") return "Pre-study survey";
    if (surveyType === "s2_efficacy") return "Quick check-in survey";
    if (surveyType === "s3_debrief") return "Reflection survey";
    if (surveyType === "s4_efficacy") return "Self-efficacy check";
    if (surveyType === "s5_improvement") return "Learning reflection";
    if (surveyType === "final") return "Final experience survey";
  }
  if (pathname === "/") {
    if (!done.pre) return "Pre-study survey";
    if (!done.gty_intro) return "Read a short negotiation guide";
    if (done.s2_efficacy && !done.s4_efficacy) return "Negotiate (Round 2)";
    return "Negotiate (Round 1)";
  }
  return "";
}

function TopBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const surveyType = searchParams.get("type");

  const [condition, setCondition] = useState<Condition | null>(null);
  const [done, setDone] = useState<StepsDone>({});

  // Block the browser back button for experiment participants.
  // Capture the URL at setup time — don't pushState on mount (that adds extra history entries
  // which survive window.location.replace() and let the back button sneak through).
  useEffect(() => {
    const currentUrl = window.location.href;
    const block = () => history.pushState(null, "", currentUrl);
    window.addEventListener("popstate", block);
    return () => window.removeEventListener("popstate", block);
  }, [pathname]);

  useEffect(() => {
    fetch("/api/experiment/state")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.condition) {
          setCondition(data.condition as Condition);
          setDone(data.steps_done ?? {});
        } else {
          setCondition(null);
        }
      })
      .catch(() => {});
  }, [pathname]);

  if (!condition) return null;

  const stepsByCondition = experimentIntro.steps_by_condition as Record<
    string,
    { label: string; detail: string }[]
  >;
  const steps = stepsByCondition[condition] ?? [];
  const currentLabel = getCurrentStepLabel(pathname, surveyType, done);
  const currentIndex = steps.findIndex((s) => s.label === currentLabel);

  if (currentIndex === -1) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-10 items-center border-b border-gray-100 bg-white shadow-sm px-4">
      {/* Steps — centered */}
      <div className="flex flex-1 items-center justify-center overflow-x-auto gap-0 min-w-0">
        {steps.map((step, i) => {
          const state =
            i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
          const isLast = i === steps.length - 1;

          return (
            <div key={step.label} className="flex items-center shrink-0">
              {/* Circle */}
              <div className="flex items-center justify-center px-1">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                    state === "done"
                      ? "bg-indigo-600 text-white"
                      : state === "current"
                      ? "border-2 border-indigo-600 bg-white text-indigo-600"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {state === "done" ? "✓" : i + 1}
                </div>
              </div>
              {/* Connector */}
              {!isLast && (
                <div
                  className={`h-px w-8 shrink-0 ${
                    i < currentIndex ? "bg-indigo-300" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Step counter + current step name */}
      <div className="ml-4 shrink-0 text-[11px] text-gray-500">
        <span className="text-gray-400">Step {currentIndex + 1} of {steps.length}</span>
        <span className="mx-1.5 text-gray-300">·</span>
        <span className="font-medium text-gray-600">{currentLabel}</span>
      </div>
    </div>
  );
}

export default function ExperimentTopBar() {
  return (
    <Suspense fallback={null}>
      <TopBarInner />
    </Suspense>
  );
}
