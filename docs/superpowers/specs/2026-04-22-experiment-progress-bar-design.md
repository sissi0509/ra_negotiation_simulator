# Experiment Progress Bar — Design Spec

**Date:** 2026-04-22
**Status:** Approved

---

## Problem

The experiment has 6–8 steps depending on group. Currently a small progress indicator only appears on a few pages (surveys, gty-intro, reflection). Participants have no persistent sense of where they are in the study, and navigating back via the browser is possible in some flows.

---

## Goal

A persistent, read-only progress bar fixed to the top of every page for experiment participants. Shows all steps for the participant's group, colored by completion state. Always visible, never interactive — participants cannot click steps to navigate.

---

## Requirements

- Visible on every page (simulator, debrief, surveys, gty-intro, reflection)
- Only renders for logged-in experiment participants (users with a `condition` field)
- Shows the correct step list for the participant's group (A: 8 steps, B: 8 steps, C: 6 steps)
- Correctly highlights the current step based on current URL
- Marks completed steps as done (all steps before current)
- Shows a "Step X of Y" counter on the right side
- Shows a tooltip with step detail text on hover
- Horizontally scrollable on small screens
- Color scheme matches existing indigo palette

---

## Architecture

### New component: `components/ExperimentTopBar.tsx`

Client component. Responsibilities:
- Fetch `/api/experiment/state` on mount and on every pathname change to get `condition` + `surveys_done`
- Determine current step label from current URL (see mapping below)
- Look up step list for the user's condition from `experimentIntro.steps_by_condition[condition]`
- Find current step index via `steps.findIndex(s => s.label === currentLabel)`
- Render the fixed top bar

Uses `usePathname()` + `useSearchParams()` — must be wrapped in `<Suspense>` internally.

### Updated: `app/layout.tsx`

In experiment mode (`isExperiment === true`):
- Render `<ExperimentTopBar />` above `{children}`
- Wrap `{children}` in `<div className="pt-10">` to offset the fixed bar (40px height)

`isExperiment` is a build-time constant from `lib/appMode.ts`, safe to use in a server component.

### Removed from individual pages

`ExperimentProgressBar` component removed from:
- `app/survey/page.tsx`
- `app/gty-intro/page.tsx`
- `app/reflection/page.tsx`

`ExperimentProgressBar` component file can be deleted.

---

## URL → Current Step Label Mapping

| URL | Current Step Label |
|-----|-------------------|
| `/survey?type=pre` | `"Pre-study survey"` |
| `/gty-intro` | `"Read a short negotiation guide"` |
| `/survey?type=s2_efficacy` | `"Quick check-in survey"` |
| `/debrief` | `"AI debrief with Sage"` |
| `/reflection` | `"Written reflection"` |
| `/survey?type=s3_debrief` | `"Reflection survey"` |
| `/survey?type=s4_efficacy` | `"Closing surveys"` |
| `/survey?type=s5_improvement` | `"Closing surveys"` |
| `/survey?type=final` | `"Closing surveys"` |
| `/` + `s2_efficacy` done + `s4_efficacy` not done | `"Negotiate (Round 2)"` |
| `/` + otherwise | `"Negotiate (Round 1)"` |

If `findIndex` returns -1 (label not in this group's step list, or unrecognized URL), the bar renders nothing for that page.

---

## Group Tracking

Step lists come from `experiment_intro.json` → `steps_by_condition`:

- **`ai_debrief` (Group A):** 8 steps — includes "AI debrief with Sage" + "Reflection survey"
- **`static_reflection` (Group B):** 8 steps — includes "Written reflection" + "Reflection survey"
- **`control` (Group C):** 6 steps — no debrief or reflection steps

The condition is fetched from `/api/experiment/state` on mount. Non-participants (no `condition` field) cause the component to return `null`.

---

## Visual Design

**Bar:** Fixed, `top-0`, full width, 40px tall (`h-10`), white background, bottom border, `z-50` shadow.

**Layout (single row):**
```
[✓] Pre-study survey ── [✓] Read guide ── [●] Negotiate (R1) ── [○] Quick check-in    Step 3 of 8
```

**Each step:**
- Small circle (20×20px) with number or checkmark
- Label text inline, `text-xs`
- Thin connector line between steps
- Hover → tooltip showing `detail` text from JSON

**Color states (indigo palette):**

| State | Circle | Label | Connector after |
|-------|--------|-------|-----------------|
| Done | `bg-indigo-600`, white checkmark | `text-indigo-500` | `bg-indigo-300` |
| Current | white + `border-2 border-indigo-600`, indigo number | `text-indigo-700 font-semibold` | `bg-gray-200` |
| Upcoming | `bg-gray-200`, gray number | `text-gray-400` | `bg-gray-200` |

**Step counter:** Right-aligned `text-xs text-gray-400`: `"Step {currentIndex + 1} of {steps.length}"`. Hidden if `currentIndex === -1`.

**Overflow:** `overflow-x-auto` on the steps container, counter stays pinned to the right.

---

## Data Flow

```
URL change
  → usePathname / useSearchParams fire
  → fetch /api/experiment/state
  → get condition + surveys_done
  → look up steps_by_condition[condition]
  → getCurrentStepLabel(pathname, surveyType, surveys_done)
  → findIndex in steps array
  → render bar with i < idx = done, i === idx = current, i > idx = upcoming
```

---

## Out of Scope

- Clicking a step to navigate (read-only)
- Collapsible / hideable bar
- Mobile-specific layout (overflow-x-auto handles it)
- Study complete / final state styling (not yet implemented)
