# Experiment Setup — What's Built vs. What's Missing

**Last updated:** 2026-04-18
**Reference:** `experiment/experiment_design.md`

This document maps every step of the experiment flow against the current system state. Use it as the implementation checklist before running the study.

---

## What's Already Working

| Component | Where |
|---|---|
| `isExperiment` / `APP_MODE` flag | `lib/appMode.ts` |
| `ExperimentUser` type (group, condition, rounds, surveys_done, etc.) | `lib/appMode.ts` |
| Experiment intro screen (consent checkbox + condition-specific step list) | `app/page.tsx` |
| `GET /api/experiment/state` — fetch participant state | `app/api/experiment/state/route.ts` |
| `PATCH /api/experiment/state` — update progress fields | `app/api/experiment/state/route.ts` |
| Auto-assign scenario + personality from `rounds` array | `app/page.tsx` |
| Block negotiation start if pre-survey not done | `app/page.tsx` |
| Pre-survey page + API (`/survey?type=pre`) | `app/survey/page.tsx`, `app/api/survey/route.ts` |
| Survey API supports `pre`, `post_r1`, `post_r2`, `final` types | `app/api/survey/route.ts` |
| Group A: Sage debrief (full pipeline — Stage 1/2/3) | `app/debrief/page.tsx`, `app/api/debrief/*` |
| Login / auth | `app/login`, `auth.ts` |
| Transcript saving to MongoDB | `app/api/transcripts/route.ts` |

---

## What's Missing — By Experiment Step

---

### Step 3 — Getting to Yes Introduction ⚠️ NOT BUILT

**What it is:** A reading screen shown to all groups after the pre-survey, before Round 1. Presents the 5 Getting to Yes principles. Participant must click "I've read this — continue" to proceed.

**What's missing:**
- No page exists for this
- No trigger in the experiment flow
- No flag to track whether it's been seen

**Implementation notes:**
- New page: `app/gty-intro/page.tsx` — static content, single "Continue" button
- Add a `gty_intro_seen: boolean` flag to `ExperimentUser` (or reuse a progress marker)
- Trigger: after pre-survey submission, redirect to `/gty-intro` instead of `/`
- After "Continue": redirect to `/` (negotiation setup)
- Must be shown only once (not before Round 2)

---

### Step 4 — Standardized Scenario Context ⚠️ NOT BUILT

**What it is:** Before Round 1 (and Round 2) starts, the participant reads a standardized backstory that gives them their role and starting position (e.g., "Your current salary is $72k. You have a competing offer at $88k."). This ensures all participants start from the same position.

**What's missing:**
- Currently the SceneModal just shows the scenario name and personality — no standardized participant context
- Scenario-specific context strings not defined in the system
- ZOPA range (used by AI counterpart) not yet wired into the scenario prompt for experiment mode

**Implementation notes:**
- Add `experiment_context` field to each scenario in `content/scenarios.json` (or a separate experiment config file)
- Show context in the SceneModal (or a new pre-negotiation briefing screen) before the "Begin" button
- The AI counterpart's system prompt needs to include the hidden ZOPA range — this may require an experiment-specific prompt override in `app/api/chat/route.ts`

---

### Step 5 — Post-Round-1 Self-Efficacy Survey (S2) ⚠️ NOT BUILT

**What it is:** 3-question survey firing immediately after Round 1 ends, before ANY debrief activity. Captures raw perceived confidence/performance before reflection can inflate it.

**What's missing:**
- No trigger exists between negotiation end and debrief redirect
- Currently `surveys_done.post_r1` fires after the debrief (wrong timing)
- S2 questions not in `app/survey/page.tsx`

**Questions (1–7 Likert):**
1. How confident do you feel in your ability to negotiate effectively?
2. How well do you think you performed in this negotiation?
3. How prepared did you feel going into this negotiation?

**Implementation notes:**
- New survey type: `s2_efficacy` (or rename `post_r1` to `s2_efficacy` — needs schema update)
- Trigger: in `app/page.tsx`, when `conversationEnded === true` AND `current_round === 1`, instead of showing the debrief button directly, redirect to `/survey?type=s2_efficacy`
- After survey submission: redirect to debrief (Group A), reflection (Group B), or Round 2 setup (Group C)
- Add `s2_efficacy: boolean` to `surveys_done` flags in `ExperimentUser` and `PATCH` handler

---

### Step 6 — Group B Static Reflection ⚠️ NOT BUILT

**What it is:** Group B participants receive their transcript and complete 5 written prompts. No AI feedback. Replaces the Sage debrief for Group B.

**What's missing:**
- No page exists for Group B reflection
- No routing to send Group B participants here after Round 1

**5 reflection prompts:**
1. Identify one moment where your response could have been better
2. What did you do in that moment?
3. Why do you think it did not go well?
4. What would you do differently next time?
5. What is one takeaway for future negotiations?

**Implementation notes:**
- New page: `app/reflection/page.tsx`
  - Left panel: transcript display (same as Sage debrief transcript panel)
  - Right panel: 5 text area prompts, one per question
  - "Submit reflection" button — saves responses and redirects to S3 survey
- New API route: `POST /api/reflection` — saves responses to MongoDB `reflections` collection with `{ user_id, run_id, round, responses, submitted_at }`
- Routing: in `app/page.tsx`, after Round 1 ends and S2 survey is done:
  - Group A → `/debrief`
  - Group B → `/reflection`
  - Group C → skip to Round 2 setup

---

### Step 7 — Post-Debrief Survey (S3) ⚠️ NOT BUILT

**What it is:** 5-question survey firing after the debrief intervention. Group A sees it after Sage; Group B sees it after written reflection; Group C skips entirely.

**What's missing:**
- No trigger after debrief/reflection completion
- S3 questions not in survey page
- Condition-specific questions not supported

**Questions (1–7 Likert, all groups):**
1. I understand my negotiation performance more clearly now
2. I understand what I should improve next time
3. I can identify key moments that affected the negotiation
4. I feel more prepared for a similar negotiation
5. The reflection activity helped me think deeply about my performance

**Implementation notes:**
- New survey type: `s3_debrief`
- Trigger for Group A: at end of Sage debrief session, redirect to `/survey?type=s3_debrief` instead of returning to home
- Trigger for Group B: after reflection submission, redirect to `/survey?type=s3_debrief`
- Group C: no trigger — skip directly to Round 2
- After S3 submission: advance `current_round` to 2, redirect to `/` for Round 2 negotiation
- Add `s3_debrief: boolean` to `surveys_done`

---

### Step 8 — Round 2 Negotiation ⚠️ PARTIALLY BUILT

**What's working:** `current_round` field exists; `currentRoundAssignment()` reads the correct scenario for the current round.

**What's missing:**
- No automatic `current_round` advancement (currently must be done manually in DB)
- Should advance from 1 → 2 automatically after S3 (or after Step 6 for Group C)
- Round 2 also needs the standardized scenario context (same issue as Step 4)

**Implementation notes:**
- Advance `current_round` via `PATCH /api/experiment/state` when redirecting to Round 2
- The same scenario context and ZOPA wiring from Step 4 applies here

---

### Step 9 — Post-Round-2 Self-Efficacy Survey (S4) ⚠️ NOT BUILT

**What it is:** Same 3 questions as S2, capturing perceived confidence after Round 2, before any further reflection. The S2 → S4 delta is the self-efficacy improvement measure.

**What's missing:** Same as S2 — no trigger, no question set, no flag.

**Questions:** Identical to S2 (3 items).

**Implementation notes:**
- New survey type: `s4_efficacy`
- Trigger: in `app/page.tsx`, when `conversationEnded === true` AND `current_round === 2`, redirect to `/survey?type=s4_efficacy`
- After S4 submission:
  - Groups A and B → `/survey?type=s5_improvement`
  - Group C → `/survey?type=s5_improvement` (confirm with professor if Group C gets S5)
- Add `s4_efficacy: boolean` to `surveys_done`

---

### Step 10 — Post-Round-2 Survey (S5) ⚠️ NOT BUILT

**What it is:** 4-question survey about perceived learning transfer from Round 1 to Round 2. Groups A and B only (Group C may skip — confirm with professor).

**What's missing:** No trigger, no questions, no flag.

**Questions (1–7 Likert):**
1. I felt more confident in the second negotiation than the first
2. I applied what I learned from the first round
3. I had a clearer strategy in the second negotiation
4. I handled the second negotiation more effectively

**Implementation notes:**
- New survey type: `s5_improvement`
- After S5 submission: redirect to Step 11 (assessment release page)
- Add `s5_improvement: boolean` to `surveys_done`

---

### Step 11 — AI Assessment Release ⚠️ NOT BUILT (as a separate step)

**What it is:** After all behavioral measurements are complete, all participants see their AI assessment report for both rounds. Currently the assessment is auto-generated at the end of each Sage session but shown immediately — it must be withheld until this step in experiment mode.

**What's missing:**
- In experiment mode, the assessment must NOT be shown at the end of the debrief
- A new "Assessment Release" page is needed that shows both Round 1 and Round 2 assessments together
- The stored assessment needs to be retrievable per round

**Implementation notes:**
- In `app/debrief/page.tsx`: detect `isExperiment` — if true, suppress the assessment display at the end of Sage; just show "Your session is complete. Continue to the next step."
- New page: `app/assessment/page.tsx` — fetches both Round 1 and Round 2 assessments from MongoDB and displays them
- After viewing: redirect to S6 (final experience survey)

---

### Step 12 — Final Experience Survey (S6) ⚠️ PARTIALLY BUILT

**What's working:** `final` survey type exists in the API.

**What's missing:**
- Current `POST_QUESTIONS` in `survey/page.tsx` are generic product-mode questions — not the S6 items from the experiment design
- Condition-specific questions not supported (Group A gets 3 extra items, Group B gets 2 extra, Group C gets core only)
- No routing to this survey after the assessment release page

**Questions — shared core (all groups, 1–7 Likert):**
1. I found the negotiation practice useful
2. I would use this system again
3. I found the experience engaging
4. I trust the feedback provided by the system

**Group A only (items 5–7):**
5. The AI-guided debrief helped me understand my performance
6. The debrief conversation felt natural
7. I felt comfortable sharing my reasoning during the debrief

**Group B only (items 5–6):**
5. The written reflection prompts helped me think about my performance
6. The transcript was useful for reflection

**Implementation notes:**
- Survey page needs to fetch participant condition and render additional questions accordingly
- After S6 submission: show a "Study complete" screen; mark `status: "completed"` and `completed_at` via PATCH

---

### DB Routing — experiment_transcripts / experiment_debriefs ⚠️ NOT WIRED

**What's agreed but not done:**
- In experiment mode, transcripts should save to `experiment_transcripts` collection
- Debriefs should save to `experiment_debriefs` collection
- This keeps study data cleanly separated from product-mode data

**What needs changing:**
- `app/api/transcripts/route.ts` — check `isExperiment`, write to `experiment_transcripts` instead
- `app/api/debrief/save/route.ts` — check `isExperiment`, write to `experiment_debriefs` instead

---

### surveys_done Schema — NEEDS EXPANSION

**Current flags:** `pre`, `post_r1`, `post_r2`, `final`

**Required flags for experiment:**

| Flag | Survey | Timing |
|---|---|---|
| `pre` | S1 — Baseline | Before Round 1 |
| `gty_intro` | GTY intro seen | After S1, before Round 1 |
| `s2_efficacy` | S2 — Post-Round-1 Efficacy | After Round 1, before debrief |
| `s3_debrief` | S3 — Post-Debrief | After debrief/reflection (Groups A/B) |
| `s4_efficacy` | S4 — Post-Round-2 Efficacy | After Round 2, before post-round |
| `s5_improvement` | S5 — Post-Round-2 | After S4 (Groups A/B) |
| `final` | S6 — Final Experience | After assessment release |

**Files to update:** `lib/appMode.ts` (`ExperimentSurveyFlags` interface), `app/api/experiment/state/route.ts` (PATCH allowed keys)

---

## Summary — Implementation Priority Order

| # | Item | Complexity | Blocks |
|---|---|---|---|
| 1 | Expand `surveys_done` schema | Low | Everything else |
| 2 | Fix survey questions (S1–S6) + condition branching | Low-Medium | Steps 2, 5, 7, 9, 10, 12 |
| 3 | S2 trigger (post-Round-1, pre-debrief) | Medium | Step 5 |
| 4 | Group B static reflection page | Medium | Step 6 |
| 5 | S3 trigger (post-debrief/reflection) + round advancement | Medium | Step 7 + Round 2 |
| 6 | GTY introduction page | Low | Step 3 |
| 7 | Standardized scenario context display + ZOPA in AI prompt | Medium | Step 4 |
| 8 | S4 + S5 triggers (post-Round-2) | Low (reuse S2 pattern) | Steps 9, 10 |
| 9 | Suppress assessment in experiment debrief | Low | Step 11 |
| 10 | Assessment release page | Medium | Step 11 |
| 11 | S6 condition-specific questions | Low-Medium | Step 12 |
| 12 | Study complete screen | Low | End of flow |
| 13 | DB routing to experiment collections | Low | Data integrity |
