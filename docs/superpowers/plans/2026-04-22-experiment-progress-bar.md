# Experiment Progress Bar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent fixed top bar showing all experiment steps, colored by completion state, visible on every page for experiment participants only.

**Architecture:** A single `ExperimentTopBar` client component is mounted once in `app/layout.tsx`. It fetches `/api/experiment/state` on every pathname change to get the user's condition and surveys_done, then derives the current step from the URL, and renders all steps from the matching `steps_by_condition` list. The old per-page `ExperimentProgressBar` is removed.

**Tech Stack:** Next.js 15 App Router, React, Tailwind CSS, `usePathname`/`useSearchParams` (next/navigation)

---

### Task 1: Create `ExperimentTopBar` component

**Files:**
- Create: `components/ExperimentTopBar.tsx`

- [ ] **Step 1: Create the component file**

```tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { experimentIntro } from "@/experiment/content/surveyData";

type Condition = "ai_debrief" | "static_reflection" | "control";

interface SurveysDone {
  pre?: boolean;
  gty_intro?: boolean;
  s2_efficacy?: boolean;
  s3_debrief?: boolean;
  s4_efficacy?: boolean;
  s5_improvement?: boolean;
  final?: boolean;
}

function getCurrentStepLabel(
  pathname: string,
  surveyType: string | null,
  done: SurveysDone
): string {
  if (pathname === "/gty-intro") return "Read a short negotiation guide";
  if (pathname === "/debrief") return "AI debrief with Sage";
  if (pathname === "/reflection") return "Written reflection";
  if (pathname === "/survey") {
    if (surveyType === "pre") return "Pre-study survey";
    if (surveyType === "s2_efficacy") return "Quick check-in survey";
    if (surveyType === "s3_debrief") return "Reflection survey";
    if (["s4_efficacy", "s5_improvement", "final"].includes(surveyType ?? ""))
      return "Closing surveys";
  }
  if (pathname === "/") {
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
  const [done, setDone] = useState<SurveysDone>({});

  useEffect(() => {
    fetch("/api/experiment/state")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.condition) {
          setCondition(data.condition as Condition);
          setDone(data.surveys_done ?? {});
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
      {/* Steps — scrollable */}
      <div className="flex flex-1 items-center overflow-x-auto gap-0 min-w-0">
        {steps.map((step, i) => {
          const state =
            i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
          const isLast = i === steps.length - 1;

          return (
            <div key={step.label} className="flex items-center shrink-0">
              {/* Step pill */}
              <div
                className="group relative flex items-center gap-1.5 px-1"
                title={step.detail}
              >
                {/* Circle */}
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                    state === "done"
                      ? "bg-indigo-600 text-white"
                      : state === "current"
                      ? "border-2 border-indigo-600 bg-white text-indigo-600"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {state === "done" ? "✓" : i + 1}
                </div>
                {/* Label */}
                <span
                  className={`text-[11px] whitespace-nowrap transition-colors ${
                    state === "done"
                      ? "text-indigo-400"
                      : state === "current"
                      ? "font-semibold text-indigo-700"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
                {/* Tooltip */}
                <div className="pointer-events-none absolute left-0 top-full mt-2 z-10 hidden w-52 rounded-md border border-gray-100 bg-white px-3 py-2 text-[11px] leading-snug text-gray-600 shadow-md group-hover:block">
                  {step.detail}
                </div>
              </div>
              {/* Connector */}
              {!isLast && (
                <div
                  className={`h-px w-4 shrink-0 ${
                    i < currentIndex ? "bg-indigo-300" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Step counter */}
      <div className="ml-4 shrink-0 text-[11px] text-gray-400">
        Step {currentIndex + 1} of {steps.length}
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
```

- [ ] **Step 2: Verify the file saved correctly**

```bash
head -5 negotiation_training_system/components/ExperimentTopBar.tsx
```
Expected: `"use client";`

---

### Task 2: Wire into `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update `app/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { isExperiment } from "@/lib/appMode";
import ExperimentTopBar from "@/components/ExperimentTopBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Negotiation Simulator",
  description: "Practice negotiation against an AI counterpart in realistic scenarios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          {isExperiment && <ExperimentTopBar />}
          <div className={isExperiment ? "pt-10" : ""}>
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit task 1 + 2**

```bash
cd negotiation_training_system
git add components/ExperimentTopBar.tsx app/layout.tsx
git commit -m "feat: add persistent experiment progress top bar"
```

---

### Task 3: Remove old `ExperimentProgressBar` from individual pages

**Files:**
- Modify: `app/survey/page.tsx`
- Modify: `app/gty-intro/page.tsx`
- Modify: `app/reflection/page.tsx`
- Delete: `components/ExperimentProgressBar.tsx`

- [ ] **Step 1: Remove from `app/survey/page.tsx`**

Remove this import line:
```tsx
import ExperimentProgressBar from "@/components/ExperimentProgressBar";
```

Remove this JSX (appears above the card `<div>`):
```tsx
<ExperimentProgressBar currentLabel={STEP_LABEL[type]} />
```

- [ ] **Step 2: Remove from `app/gty-intro/page.tsx`**

Remove this import line:
```tsx
import ExperimentProgressBar from "@/components/ExperimentProgressBar";
```

Remove this JSX (appears inside the page content):
```tsx
<ExperimentProgressBar currentLabel="Read a short negotiation guide" />
```

- [ ] **Step 3: Remove from `app/reflection/page.tsx`**

Remove this import line:
```tsx
import ExperimentProgressBar from "@/components/ExperimentProgressBar";
```

Remove this JSX (appears inside the header):
```tsx
<div className="mb-2">
  <ExperimentProgressBar currentLabel="Written reflection" />
</div>
```

- [ ] **Step 4: Delete the old component**

```bash
rm negotiation_training_system/components/ExperimentProgressBar.tsx
```

- [ ] **Step 5: Commit**

```bash
cd negotiation_training_system
git add -A
git commit -m "chore: remove per-page ExperimentProgressBar (replaced by top bar)"
```

---

### Task 4: Smoke test

- [ ] **Step 1: Start dev server and log in as Group A participant**

```bash
cd negotiation_training_system && npm run dev
```

Log in as `participant_a@study.local` (Group A / ai_debrief).

- [ ] **Step 2: Verify bar appears on each page**

Walk through the flow and confirm:
- `/` (intro screen) → bar shows, "Negotiate (Round 1)" highlighted (step 3)
- `/survey?type=pre` → "Pre-study survey" highlighted (step 1)
- `/gty-intro` → "Read a short negotiation guide" highlighted (step 2)
- `/debrief` → "AI debrief with Sage" highlighted (step 5)
- Step counter reads "Step X of 8" correctly at each page

- [ ] **Step 3: Verify bar hidden for non-participant**

Log out, log in as a regular (non-experiment) user. Bar should not appear.

- [ ] **Step 4: Verify tooltip**

Hover over any step label. Detail text should appear in a small popover.
