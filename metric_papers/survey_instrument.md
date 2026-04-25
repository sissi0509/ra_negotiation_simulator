# Survey Instrument
## AI Negotiation Simulator — Self-Report Measures

**Scale:** All items use a 1–7 Likert scale (1 = Strongly Disagree, 7 = Strongly Agree) unless noted.
**Version:** 2.1 (2026-04-22)
**Status:** Draft — pending professor confirmation before implementation.

---

## Overview

The survey instrument captures self-reported perceptions at six points across the experiment. Together with the BQS behavioral coding rubric and the ZOPA-based outcome score, these surveys form the full measurement strategy for the study.

| Survey | Timing | Groups | Primary Construct |
|---|---|---|---|
| S1 — Baseline | Before Round 1 | All | Negotiation self-efficacy + metacognitive awareness |
| S2 — Post-Round 1 | After Round 1, **before** any debrief | All | Self-efficacy + metacognitive awareness (pre-intervention) |
| S3 — Post-Reflection | After debrief/reflection activity | A and B only | Reflection impact and insight |
| S4 — Post-Round 2 | After Round 2, **before** post-round survey | All | Self-efficacy + metacognitive awareness (post-intervention) |
| S5 — Post-Round 2 | After Round 2 (and after S4) | All | Perceived learning transfer |
| S6 — Final Experience | After AI assessment | All | System experience (product, not research DV) |

**Key research measures:**
- **Self-efficacy delta:** S4 (Q1–Q2) − S2 (Q1–Q2) — did participants get more confident?
- **Metacognitive delta:** S4 (Q3–Q5) − S2 (Q3–Q5) — did participants develop better self-awareness?
- **Reflection impact:** S3 mean score (compare Group A vs. Group B)
- **Perceived transfer:** S5 mean score (compare all three groups)
- S1 used as a baseline covariate in all group comparisons.

---

## S1 — Baseline Survey

**Timing:** Before Round 1 negotiation begins
**Purpose:** Establish pre-experiment baseline for negotiation confidence and self-awareness. Used as a covariate to control for pre-existing differences across groups at randomization.

| # | Item | Construct | Reference |
|---|---|---|---|
| 1 | I feel confident in my negotiation skills. | Negotiation self-efficacy | Bandura (1977); Rigotti et al. (2008) — OSS-6 |
| 2 | I am aware of my strengths in negotiation. | Baseline self-knowledge | Custom |
| 3 | I am aware of my weaknesses in negotiation. | Baseline self-knowledge | Custom |
| 4 | I know how to improve my negotiation performance. | Baseline self-knowledge | Custom |

**Rationale:**
Q1 measures negotiation-specific self-efficacy. Rigotti et al. (2008), drawing on Bandura (1977), define occupational self-efficacy as the belief in one's ability to successfully fulfill task demands — here adapted to the negotiation domain. Duddu et al. (2025), the closest precedent study in AI negotiation coaching, used the OSS-6 (Rigotti et al., 2008) in pre/post design; Q1 follows that same framing.

Q2–Q4 measure pre-existing self-knowledge about negotiation — what the participant already knows about their own strengths, weaknesses, and areas for improvement before any intervention. These do not map to the SRIS self-reflection/insight distinction; they are simply static self-assessments used as baseline covariates. Treat Q2–Q4 as a single "baseline self-knowledge" cluster in analysis.

> ⚠️ **Issue:** Q1 and Q2–Q4 measure different constructs. Treat them as two separate clusters when analyzing (Q1 alone for baseline self-efficacy; Q2–Q4 averaged for baseline self-knowledge). Do not average all four together.

---

## S2 — Post-Round 1 Self-Efficacy + Metacognitive Awareness

**Timing:** Immediately after Round 1 ends, **before** any debrief or reflection activity begins. Timing is critical — administering this after the debrief would inflate both scores and contaminate the delta measures.
**Purpose:** Capture both self-efficacy and metacognitive awareness after Round 1, before the intervention. The S2 → S4 delta on each subscale is a primary self-report dependent variable.

**Two subscales, analyzed separately:**

*Subscale A — Self-Efficacy (Q1–Q2)*

| # | Item | Construct | Reference |
|---|---|---|---|
| 1 | I feel confident in my ability to negotiate effectively. | Negotiation self-efficacy | Rigotti et al. (2008) — OSS-6; Bandura (1977) |
| 2 | I believe I could handle a similar negotiation successfully. | Negotiation self-efficacy | Rigotti et al. (2008) — OSS-6; Duddu et al. (2025) |

*Subscale B — Negotiation Insight (Q3–Q5)*

| # | Item | Construct | Reference |
|---|---|---|---|
| 3 | I have a clear understanding of what I did well in this negotiation. | Insight (SRIS-IN) | Grant et al. (2002) — SRIS |
| 4 | I understand what I should do differently next time. | Insight (SRIS-IN) | Grant et al. (2002) — SRIS |
| 5 | I understand why I got the outcome I did. | Insight (SRIS-IN) | Grant et al. (2002) — SRIS |

**Rationale:**
Q1–Q2 form the self-efficacy subscale. Rigotti et al. (2008) define occupational self-efficacy, building on Bandura (1977), as the belief in one's ability to successfully fulfill task demands. Their OSS-6 scale was used in pre/post design by Duddu et al. (2025) in the closest comparable study — an AI negotiation coaching experiment with N=267. Both items are forward-looking, asking about belief in future capability rather than past performance.

Q3–Q5 form the insight subscale, grounded in the SRIS-IN factor (Grant et al., 2002). Insight is defined as *the clarity of understanding of one's own thoughts, feelings, and behavior*. All three items use "understand" or "clear understanding" as the core framing, consistent with SRIS-IN. The subscale focuses on insight rather than self-reflection because what matters is the *outcome* of the reflective process — did the participant gain genuine understanding? Self-reflection is the process; insight is the result. The S2→S4 insight delta is the key measure: did the intervention (debrief / reflection / none) produce greater self-understanding after Round 2?

> ⚠️ **S2 and S4 must be identical.** Any changes made here must be mirrored exactly in S4.

---

## S3 — Post-Reflection Survey (Groups A and B only)

**Timing:** After the debrief/reflection intervention. Group A completes this after the Sage debrief; Group B completes this after the written reflection. Group C skips this survey entirely.
**Purpose:** Measure the immediate impact of the reflection activity on insight and perceived readiness. The Group A vs. Group B comparison on S3 tests whether AI-guided debriefing produces deeper insight than static written prompts.

| # | Item | Construct | Reference |
|---|---|---|---|
| 1 | I understand my negotiation performance more clearly now. | Insight (SRIS-IN) | Grant et al. (2002) |
| 2 | I understand what I should improve next time. | Insight (SRIS-IN) | Grant et al. (2002) |
| 3 | I can identify key moments that affected the negotiation. | Critical incident awareness | Custom |
| 4 | I feel more prepared for a similar negotiation. | Transfer readiness | Custom |

**Rationale:**
Q1 and Q2 measure insight — the clarity of understanding gained from the reflection activity — using the same SRIS-IN construct as S2/S4 (Grant et al., 2002). They ask whether the activity produced genuine understanding, not just whether it was completed. Q3 and Q4 are face-valid custom items measuring two practical outcomes: recognition of key turning points (Q3) and forward readiness (Q4). S3 is a secondary outcome — the primary comparison is Group A vs. Group B on Q1/Q2, testing whether Sage-guided debriefing produces deeper insight than self-directed written reflection.

> **Note on Group C:** Group C skips S3 entirely. Absence of data is the correct state — do not administer a placeholder.

> **Note on subtitle:** The survey subtitle changes by group — Group A sees "your conversation with Sage", Group B sees "the written reflection you just completed."

---

## S4 — Post-Round 2 Self-Efficacy + Metacognitive Awareness

**Timing:** Immediately after Round 2 ends, **before** the S5 post-round survey.
**Purpose:** Identical items to S2. The S4 − S2 delta on each subscale is the primary self-report dependent variable. Capturing this before S5 prevents the more reflective S5 questions from priming responses.

**Two subscales, analyzed separately:**

*Subscale A — Self-Efficacy (Q1–Q2)*

| # | Item | Construct | Reference |
|---|---|---|---|
| 1 | I feel confident in my ability to negotiate effectively. | Negotiation self-efficacy | Rigotti et al. (2008) — OSS-6; Bandura (1977) |
| 2 | I believe I could handle a similar negotiation successfully. | Negotiation self-efficacy | Rigotti et al. (2008) — OSS-6; Duddu et al. (2025) |

*Subscale B — Negotiation Insight (Q3–Q5)*

| # | Item | Construct | Reference |
|---|---|---|---|
| 3 | I have a clear understanding of what I did well in this negotiation. | Insight (SRIS-IN) | Grant et al. (2002) — SRIS |
| 4 | I understand what I should do differently next time. | Insight (SRIS-IN) | Grant et al. (2002) — SRIS |
| 5 | I understand why I got the outcome I did. | Insight (SRIS-IN) | Grant et al. (2002) — SRIS |

**Rationale:** Identical to S2 by design. The same constructs must be measured in the same way at both time points for the deltas to be meaningful.

> ⚠️ **Do not change S4 independently of S2.** Both must stay in sync at all times.

---

## S5 — Post-Round 2 Perceived Transfer

**Timing:** After Round 2 and after S4.
**Purpose:** Measure the participant's subjective sense of learning transfer — whether they felt they improved, applied what they learned, and negotiated more strategically in Round 2. This is a secondary outcome, compared across all three groups.

| # | Item | Construct | Reference |
|---|---|---|---|
| 1 | I felt more confident in the second negotiation than the first. | Perceived confidence growth | Custom |
| 2 | I applied what I learned from the first round. | Perceived learning transfer | Custom |
| 3 | I had a clearer strategy in the second negotiation. | Strategic awareness | Custom |
| 4 | I handled the second negotiation more effectively. | Perceived skill improvement | Custom |

**Rationale:**
All four items are face-valid custom items measuring subjective sense of improvement from Round 1 to Round 2. No validated scale is being adapted here — the items are self-evident and directly reflect the study's design (two-round comparison). S5 is a secondary outcome; its primary analytical value is the cross-group comparison and its relationship to the BQS behavioral delta: a participant may show behavioral improvement without subjective awareness (BQS delta high, S5 low = unaware improver) or feel improved without behavioral evidence (BQS delta low, S5 high = overconfident).

> **Note on Group C:** The current implementation shows S5 to all three groups. This is intentional — Group C's S5 responses provide a "no-intervention transfer" baseline for comparison. Confirm with professor.

---

## S6 — Final Experience Survey

**Timing:** After the AI assessment is released (final step before study completion).
**Purpose:** Evaluate system usefulness, engagement, and trust. This is a **product feature survey**, not a primary research dependent variable. Results will be used to improve the platform, not to test the main research hypotheses.

### Shared items (all groups)

| # | Item | Construct | Reference |
|---|---|---|---|
| 1 | I found the negotiation practice useful. | Perceived usefulness | Custom |
| 2 | I would use this system again. | Reuse intention | Custom |
| 3 | I found the experience engaging. | Engagement | Custom |
| 4 | I trust the feedback provided by the system. | System trust | Custom |
| — | Do you have any suggestions for improving this training system? *(optional, open text)* | Qualitative feedback | — |

### Group A add-ons (ai_debrief)

| # | Item | Construct | Reference |
|---|---|---|---|
| 5 | The AI-guided debrief helped me understand my performance. | Debrief utility | Custom |
| 6 | The debrief conversation felt natural. | Conversational quality | Custom |
| 7 | I felt comfortable sharing my reasoning during the debrief. | Psychological safety | Custom |

### Group B add-ons (static_reflection)

| # | Item | Construct | Reference |
|---|---|---|---|
| 5 | The written reflection prompts helped me think about my performance. | Reflection utility | Custom |
| 6 | The transcript was useful for reflection. | Artifact utility | Custom |

**Rationale:**
All S6 items are face-valid custom items. S6 is a product feature survey — not a research dependent variable — so no validated scale is required. The items cover the aspects most relevant for product improvement: usefulness, reuse intention, engagement, system trust, and feature-specific utility. The open-text field collects qualitative suggestions without adding Likert burden.

> **Note:** S6 is administered after the AI assessment, which may prime Q4 ("I trust the feedback"). This ordering is intentional — trust is most meaningfully rated after participants have seen the feedback. Be aware when interpreting Q4.

---

## Delta Measures and Analysis

| Measure | Computation | Type | Use in analysis |
|---|---|---|---|
| Self-efficacy delta | S4 (Q1–Q2 mean) − S2 (Q1–Q2 mean) | Primary self-report DV | Compare across Groups A, B, C |
| Insight delta | S4 (Q3–Q5 mean) − S2 (Q3–Q5 mean) | Primary self-report DV | Compare across Groups A, B, C |
| Baseline self-efficacy | S1 (Q1) | Covariate | Control for pre-existing confidence differences |
| Baseline self-knowledge | S1 (Q2–Q4) mean | Covariate | Control for pre-existing self-awareness differences |
| Reflection impact | S3 (Q1–Q4) mean | Secondary DV | Compare Group A vs. Group B only |
| Perceived transfer | S5 (Q1–Q4) mean | Secondary DV | Compare all three groups |

**Why two deltas matter:**
The debrief (Group A) is designed to primarily produce insight — helping participants understand *why* things happened and *what* to do differently. Self-efficacy is a secondary downstream effect. If Group A shows a larger insight delta than Groups B and C, that is evidence the debrief is working through its intended mechanism. Separating the two lets us distinguish mechanism (insight) from outcome (confidence).

**Interpretation matrix — self-efficacy delta vs. BQS behavioral delta:**

| Self-efficacy delta | Metacognitive delta | BQS delta | Interpretation |
|---|---|---|---|
| ↑ | ↑ | ↑ | Full improvement — confident, self-aware, and better behavior |
| → / ↓ | ↑ | ↑ | Behavioral and cognitive gain without confidence boost — typical of realistic feedback |
| ↑ | → / ↓ | → / ↓ | Confidence without insight or behavior change — possible overconfidence effect |
| → / ↓ | → / ↓ | ↑ | Behavioral improvement without self-awareness — participant improved but didn't notice |
| ↓ | ↓ | ↓ | Regression across all measures — flag for review |

---

## Open Questions for Professor

1. **S2/S4 — two subscales:** Do the revised Q1–Q2 (self-efficacy) and Q3–Q5 (metacognitive awareness) items look appropriate? Any items to add, replace, or drop?
2. **OSS-6 adoption:** Duddu et al. (2024) used the full OSS-6 (6 items) for self-efficacy. Should we adopt OSS-6 directly (more established validity) or keep Q1–Q2 (shorter, negotiation-specific)?
3. **S5 for Group C:** Confirm whether Group C receives S5. Currently they do — treating their responses as a no-intervention transfer baseline.
4. **S1 subscale separation:** Should Q1 (efficacy) and Q2–Q4 (metacognition) in S1 be presented as two labeled sections, or left as one undifferentiated block for participants?
5. **Validated scale for S3:** Should S3 incorporate the full Debriefing Experience Scale (DES; Reed, 2012) or retain the current custom items? DES was designed for simulation in healthcare but has been adapted to AI debrief contexts (Evangelou et al., 2025).

---

## References

The four core references for this instrument:

- Bandura, A. (1977). Self-efficacy: Toward a unifying theory of behavioral change. *Psychological Review, 84*(2), 191–215. *(Foundational definition of self-efficacy as belief in one's ability to successfully execute a behavior — basis for all self-efficacy items.)*

- Grant, A. M., Franklin, J., & Langford, P. (2002). The self-reflection and insight scale: A new measure of private self-consciousness. *Social Behavior and Personality, 30*(8), 821–836. *(Defines and validates self-reflection [inspection of thoughts/feelings/behavior] and insight [clarity of understanding] as two distinct metacognitive factors — basis for Q2–Q4 in S1 and Q3–Q5 in S2/S4.)*

- Rigotti, T., Schyns, B., & Mohr, G. (2008). A short version of the occupational self-efficacy scale: Structural and construct validity across five countries. *Journal of Career Assessment, 16*(2), 238–255. *(Validates the 6-item OSS-6 for measuring domain-specific self-efficacy; used as the framework for Q1–Q2 in S2/S4.)*

- Duddu, V., Parekh, J. R., Mao, A., Min, H., Xiao, Z., Saha, K., & Das Swain, V. (2025). Does AI coaching prepare us for workplace negotiations? *arXiv preprint arXiv:2509.22545.* *(Closest comparable study — pre/post AI negotiation coaching experiment, N=267, three conditions; used OSS-6 as primary self-efficacy measure.)*

---

*This document should be read alongside `coding_instruction_readable.md` (behavioral coding) and `outcome_score.md` (ZOPA-based outcome measure). Together the three instruments form the full measurement strategy for the experiment.*
