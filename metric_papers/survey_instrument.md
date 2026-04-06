# Survey Instrument
## AI Negotiation Simulator — Self-Report Measures

**Scale:** All items use a 1–7 Likert scale (1 = Strongly Disagree, 7 = Strongly Agree) unless noted otherwise.
**Version:** 1.0 (2026-04-05)

---

## Overview

The survey instrument captures self-reported perceptions at six points across the experiment. Together these form the third measurement component alongside the behavioral coding rubric and the outcome score.

| Survey | Timing | Purpose |
|---|---|---|
| S1 — Baseline | Before Round 1 | Measure initial confidence and self-awareness |
| S2 — Pre-Debrief (Round 1) | After Round 1, **before** debrief | Capture perceived performance before reflection inflates it |
| S3 — Post-Debrief | After debrief intervention | Measure immediate impact of reflection activity |
| S4 — Pre-Debrief (Round 2) | After Round 2, **before** post-round survey | Capture perceived performance at Round 2 for delta comparison |
| S5 — Post-Round 2 | After Round 2 | Measure perceived improvement and transfer |
| S6 — Final Experience | After AI assessment release | Measure system usefulness and trust |

> ⚠️ **S2 and S4 are not yet implemented.** They require a new pre-debrief survey trigger that fires between the end of negotiation and the start of the debrief. Current `post_r1` survey fires after the debrief (Step 5 in experiment flow). Confirm with professor before implementing.

---

## S1 — Baseline Survey
**Timing:** Before Round 1 negotiation begins
**Purpose:** Establish pre-experiment baseline for confidence and self-awareness

| # | Item |
|---|---|
| 1 | I feel confident in my negotiation skills |
| 2 | I am aware of my strengths in negotiation |
| 3 | I am aware of my weaknesses in negotiation |
| 4 | I know how to improve my negotiation performance |
| 5 | I feel prepared for a negotiation like this |

---

## S2 — Pre-Debrief Self-Efficacy (Round 1)
**Timing:** Immediately after Round 1 negotiation ends, **before** the debrief intervention *(not yet implemented)*
**Purpose:** Capture raw perceived performance and confidence before the reflection activity. Used to compute self-efficacy delta (S2 → S4) independent of the debrief effect.

| # | Item |
|---|---|
| 1 | I feel confident in my ability to negotiate effectively |
| 2 | I think I performed well in this negotiation |
| 3 | I felt prepared going into this negotiation |

---

## S3 — Post-Debrief Survey
**Timing:** After the debrief intervention (Group A: AI debrief · Group B: static reflection · Group C: skipped)
**Purpose:** Measure immediate impact of the reflection activity on self-awareness and perceived readiness

| # | Item |
|---|---|
| 1 | I understand my negotiation performance more clearly now |
| 2 | I understand what I should improve next time |
| 3 | I can identify key moments that affected the negotiation |
| 4 | I feel more prepared for a similar negotiation |
| 5 | The reflection activity helped me think deeply about my performance |

> **Note for Group C (no debrief):** Group C participants skip this survey or receive a placeholder. Analyze Group C S3 responses separately if collected.

---

## S4 — Pre-Debrief Self-Efficacy (Round 2)
**Timing:** Immediately after Round 2 negotiation ends, **before** the post-round survey *(not yet implemented)*
**Purpose:** Same three items as S2. Round 1 → Round 2 delta (S4 − S2) is the self-efficacy improvement measure, captured before any further reflection activity.

| # | Item |
|---|---|
| 1 | I feel confident in my ability to negotiate effectively |
| 2 | I think I performed well in this negotiation |
| 3 | I felt prepared going into this negotiation |

---

## S5 — Post-Round-2 Survey
**Timing:** After Round 2 negotiation (and after S4)
**Purpose:** Measure perceived improvement and transfer of learning from Round 1 to Round 2

| # | Item |
|---|---|
| 1 | I felt more confident in the second negotiation than the first |
| 2 | I applied what I learned from the first round |
| 3 | I had a clearer strategy in the second negotiation |
| 4 | I handled the second negotiation more effectively |

---

## S6 — Final Experience Survey
**Timing:** After AI assessment is released to all participants (Step 8 in experiment flow)
**Purpose:** Evaluate perceived usefulness, satisfaction, and trust in the system

| # | Item |
|---|---|
| 1 | The AI assessment was useful |
| 2 | The feedback helped me understand my performance |
| 3 | I would use this system again to practice negotiation |
| 4 | I found the experience engaging |
| 5 | I trust the feedback provided by the AI system |

---

## Delta Measures

The key self-report deltas for analysis:

| Delta | Computation | What it captures |
|---|---|---|
| Self-efficacy delta | S4 (items 1–3) − S2 (items 1–3) | Change in perceived confidence and performance between rounds — before debrief influence |
| Post-debrief awareness | S3 (items 1–4) | Immediate reflection impact — compare across Groups A, B, C |
| Perceived improvement | S5 (items 1–4) | Subjective sense of Round 1 → Round 2 transfer |
| System trust | S6 (items 1–5) | User experience — not a primary DV |

**Comparing self-efficacy delta against BQS delta:**

| Self-Efficacy Delta | BQS Behavioral Delta | Interpretation |
|---|---|---|
| Positive | Positive | Improvement perceived and demonstrated |
| Positive | Neutral / Negative | Confidence gained but not yet converted to behavior — possible debrief effect on mindset |
| Neutral / Negative | Positive | Behavioral improvement without awareness — participant improved but didn't notice |
| Negative | Negative | Regression across both measures — flag for review |

---

## Open Questions for Professor

1. Are 3 items sufficient for S2/S4, or should we use a validated self-efficacy scale (e.g., the General Self-Efficacy Scale, GSE)?
2. Should S3 (post-debrief) be administered to Group C at all, or skipped entirely?
3. Can the existing `post_r1` survey trigger be moved to before the debrief, or does this require a new survey type in the app?

---

*This document should be read alongside `coding_instruction_readable.md` (behavioral coding) and `outcome_score.md` (ZOPA-based result measure). Together the three instruments form the full measurement strategy for the experiment.*
