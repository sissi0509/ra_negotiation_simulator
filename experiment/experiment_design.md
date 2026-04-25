# Experiment Design — AI Negotiation Training System

**Version:** 2.1 (survey instrument finalized)
**Status:** Infrastructure complete; experiment not yet run

---

## 1. Research Question

Does an AI-guided post-negotiation debrief improve negotiation behavior and self-awareness compared to static self-reflection or no reflection?

---

## 2. Study Overview

Prior AI negotiation training systems provide written feedback reports after practice (Shea et al., 2024; Dannenmann et al., 2022; Rottner, 2024; Li Rong et al., 2025) but none close the self-reflection step. The closest system — Conversate (Daryanto et al., 2025) — adds post-session dialogic feedback in job interview training, but uses no domain behavioral theory and has not measured skill improvement. This study tests whether combining AI negotiation practice with a post-session dialogic debrief grounded in Getting to Yes and Debriefing with Good Judgment produces measurable behavioral improvement.

Three conditions are compared:
- **Group A:** AI-guided debrief (Sage)
- **Group B:** Static self-reflection with transcript
- **Group C:** No reflection

---

## 3. Participant Assignment

### Step 1 — Random Assignment to Condition

Upon enrollment, each participant is randomly assigned to one of three conditions:

| Group | Condition | Debrief format |
|---|---|---|
| A | AI Debrief | Interactive debrief with Sage (Debriefing with Good Judgment + Getting to Yes) |
| B | Static Reflection | Transcript + structured written prompts, no adaptive feedback |
| C | Control | No reflection activity |

Groups A and B both receive their transcript after Round 1. Only the reflection format differs — this isolates the effect of AI dialogic debrief vs. self-guided written reflection, holding information access constant.

### Step 2 — Counterbalanced Scenario Assignment

Within each group, participants are evenly split across two scenario orders:

| Sub-condition | Round 1 | Round 2 |
|---|---|---|
| Order 1 | Salary negotiation | Apartment rent negotiation |
| Order 2 | Apartment rent negotiation | Salary negotiation |

This creates a **2 (scenario order) × 3 (condition)** design with 6 sub-conditions of 5 participants each (30 total). Scenario order is recorded per participant and used as a control variable in analysis. Using a different scenario in Round 2 tests whether learning transfers to a new context, rather than measuring memory of Round 1.

### Fixed Settings Across All Groups

- **AI personality:** `aggressive` for all groups and all rounds. Rationale: holds AI counterpart behavior constant so any behavioral change is attributable to the participant; aggressive personality creates the most diagnostic variance in behavioral codes.
- **Standardized user context:** each participant receives a shared scenario description before each round. Full text is in `experiment/content/scenario_contexts.json`. The context describes the participant's alternative option (BATNA) in detail but withholds the AI's opening offer — that is revealed at the start of the conversation.
- **Hidden Zone of Possible Agreement (ZOPA):** the AI counterpart is given a secret range in its prompt (salary: floor $90k, ceiling $103k; apartment: floor $2,000/mo, ceiling $2,200/mo). The participant does not know this range. The outcome score is computed on the primary item only (base salary / monthly rent). Secondary package items are tracked separately.

---

## 4. Experiment Flow

High-level sequence for all participants:

```
S1 — Pre-Survey (baseline, all groups)
    ↓
Getting to Yes Introduction (all groups)
    ↓
Round 1 Negotiation
    ↓
S2 — Post-Round-1 Survey: self-efficacy + insight (all groups, BEFORE debrief)
    ↓
Debrief Intervention  (Group A: Sage / Group B: written prompts / Group C: none)
    ↓
S3 — Post-Reflection Survey: insight + readiness (Groups A and B only)
    ↓
Round 2 Negotiation
    ↓
S4 — Post-Round-2 Survey: self-efficacy + insight (all groups, identical to S2)
    ↓
S5 — Perceived Transfer Survey (all groups)
    ↓
AI Assessment Released — Round 1 only (all groups)
    ↓
S6 — Final Experience Survey (all groups)
```

---

## 5. Step-by-Step Detail

### Step 1 — Login

Participants log in to the system in experiment mode. History, past sessions, and AI assessment are all hidden during the study to avoid bias.

---

### Step 2 — Pre-Survey (Baseline)

Captures initial self-awareness and confidence before any negotiation practice.

Questions (1–7 Likert):
1. I feel confident in my negotiation skills
2. I am aware of my strengths in negotiation
3. I am aware of my weaknesses in negotiation
4. I know how to improve my negotiation performance

---

### Step 3 — Getting to Yes Introduction (All Groups)

Before starting the first negotiation, all participants read a brief introduction to the five Getting to Yes principles (Fisher, Ury & Patton, 1981). This gives everyone a common theoretical baseline to work from during practice and ensures the debrief can refer to these principles without them being unfamiliar.

> Content is in `experiment/content/gty_intro.json`. Page not yet built — `app/gty-intro/page.tsx` is a pending implementation item.

The five principles presented to participants:
1. **Separate the people from the problem** — address relationship and substance separately; avoid personal attacks
2. **Focus on interests, not positions** — understand why each side wants what they want, not just what they're asking for
3. **Invent options for mutual gain** — look for creative solutions that expand value for both sides before dividing it
4. **Insist on objective criteria** — use market data, precedent, and external standards to justify positions
5. **Know your best alternative** — understand your options if no agreement is reached; this defines your walk-away point

All three groups see this introduction equally — it is a constant across conditions, not a variable. The experimental variable remains only the debrief format after Round 1.

---

### Step 4 — Round 1 Negotiation

Before the negotiation starts, the participant receives a standardized scenario description. The context gives full details about their alternative option (BATNA) but withholds the AI counterpart's opening offer — that is revealed at the start of the conversation. Full context text is in `experiment/content/scenario_contexts.json`.

- **Salary scenario:** Participant is a new graduate choosing between two job offers. Their alternative (Company B) offers $88k base, 20 days PTO, hybrid work, and a flexible start date. They negotiate with Company A's HR manager, whose opening package is revealed at the start of the conversation. The negotiation covers base salary, start date, PTO, signing bonus, equity, and relocation — only some of which are proactively offered.
- **Apartment rent scenario:** Participant has just moved to a new city and is choosing between two apartments. Their alternative (Apartment B) is $1,950/month with heat and water included (~$1,990/month effective). They negotiate with the landlord of Apartment A, whose opening terms are revealed at the start of the conversation. The negotiation covers monthly rent, lease length, utilities, parking, and move-in terms.

Both scenarios are designed as multi-issue packages so that all five Getting to Yes dimensions (D1–D5) can meaningfully fire during behavioral coding. The AI counterpart's opening position is anchored above their true flexibility, and secondary items (signing bonus, utilities, etc.) are not volunteered — the participant must ask or propose them.

This standardized context ensures all participants within a scenario start from the same position, making outcomes comparable across groups.

The participant then negotiates with the AI counterpart in a text-based chat. The full conversation is recorded as a transcript.

The AI counterpart:
- Uses the `aggressive` personality
- Operates within the hidden Zone of Possible Agreement range (base salary $90k–$103k; monthly rent $2,000–$2,200)
- Receives a standardized role prompt so behavior is consistent across participants
- Outcome score is computed on the primary item only (base salary / monthly rent); secondary package items are tracked separately as "unlocked items" by the AI coder

---

### Step 5 — Post-Round-1 Survey (S2) *(all groups)*

Received by all three groups immediately after Round 1 ends, **before** any debrief activity begins. Timing is critical — this must fire before any reflection to avoid inflating scores.

Two subscales, analyzed separately:

**Subscale A — Self-Efficacy (1–7 Likert):**
1. I feel confident in my ability to negotiate effectively.
2. I believe I could handle a similar negotiation successfully.

**Subscale B — Negotiation Insight (1–7 Likert):**
3. I have a clear understanding of what I did well in this negotiation.
4. I understand what I should do differently next time.
5. I understand why I got the outcome I did.

> The S2 → S4 delta on each subscale is the primary self-report dependent variable. See `metric_papers/survey_instrument.md` for full rationale and references.

---

### Step 6 — Debrief Intervention

Each group receives a different reflection activity:

**Group A — AI Debrief (Sage)**

Sage conducts a structured post-session debrief using Debriefing with Good Judgment. The debrief runs in three internal pipeline stages:
- **Stage 1:** AI analyzes the transcript and selects 2 key moments, generating a diagnostic hypothesis about the cognitive frame behind each moment, grounded in Getting to Yes principles
- **Stage 2:** Sage leads a conversation — stating the hypothesis, exploring why the participant made that choice, offering an alternative move, and eliciting a takeaway
- **Stage 3:** A final assessment is auto-generated at the end of the conversation (context → strengths → areas for improvement → next steps) — this fires automatically but is **not shown to the participant at this stage**; it is withheld until Step 11 after all behavioral measurements are complete. Releasing it earlier would introduce additional feedback into the system and make it impossible to isolate the effect of the debrief format alone on Round 2 behavior.

The participant sees their transcript during the debrief.

**Group B — Static Reflection**

Participant receives their transcript and completes 5 structured written prompts with no adaptive feedback:
1. Identify one moment where your response could have been better
2. What did you do in that moment?
3. Why do you think it did not go well?
4. What would you do differently next time?
5. What is one takeaway for future negotiations?

**Group C — Control**

No reflection activity. Proceeds directly to Round 2.

---

### Step 7 — Post-Reflection Survey (S3) *(Groups A and B only)*

Captures the immediate impact of the reflection activity. Group C skips this step and proceeds directly to Round 2. Survey subtitle is group-specific: Group A sees "your conversation with Sage", Group B sees "the written reflection you just completed."

Questions (1–7 Likert):
1. I understand my negotiation performance more clearly now.
2. I understand what I should improve next time.
3. I can identify key moments that affected the negotiation.
4. I feel more prepared for a similar negotiation.

> Q1–Q2 measure insight (primary comparison: Group A vs. Group B). Q3–Q4 are secondary face-valid items.

---

### Step 8 — Round 2 Negotiation

Participant negotiates using the other scenario (counterbalanced from Round 1). Same AI settings apply — aggressive personality, standardized backstory, hidden ZOPA range. The full conversation is recorded.

Round 2 measures whether learning from the debrief transfers to a new negotiation context.

---

### Step 9 — Post-Round-2 Survey (S4) *(all groups)*

Identical items to Step 5 (S2). Captured immediately after Round 2 ends, **before** S5. The S4 − S2 delta on each subscale is the primary self-report dependent variable.

**Subscale A — Self-Efficacy (1–7 Likert):**
1. I feel confident in my ability to negotiate effectively.
2. I believe I could handle a similar negotiation successfully.

**Subscale B — Negotiation Insight (1–7 Likert):**
3. I have a clear understanding of what I did well in this negotiation.
4. I understand what I should do differently next time.
5. I understand why I got the outcome I did.

> ⚠️ Do not change S4 questions independently of S2. Both must stay in sync.

---

### Step 10 — Post-Round-2 Perceived Transfer Survey (S5) *(all groups)*

Captures perceived improvement after completing both rounds. All three groups receive this survey — Group C's responses serve as a no-intervention transfer baseline.

Questions (1–7 Likert):
1. I felt more confident in the second negotiation than the first.
2. I applied what I learned from the first round.
3. I had a clearer strategy in the second negotiation.
4. I handled the second negotiation more effectively.

---

### Step 11 — AI Assessment Released *(all groups)*

After all behavioral measurements are complete, all participants receive an AI-generated assessment of their **Round 1** negotiation. Group A's assessment is based on the Sage debrief conversation; Groups B and C receive a transcript-only assessment generated from the same final assessment protocol. The assessment was generated earlier but withheld until this point to avoid influencing Round 2 behavior.

> This is a product feature — not a research dependent variable. It is shown to all participants as a useful closing experience.

---

### Step 12 — Final Experience Survey ⚠️ *(survey content pending professor confirmation)*

Evaluates the overall system experience. Because the three groups had different reflection experiences, the survey uses a shared core for all groups plus condition-specific questions appended for Groups A and B.

**All groups — shared core (1–7 Likert):**
1. I found the negotiation practice useful
2. I would use this system again
3. I found the experience engaging
4. I trust the feedback provided by the system

**Group A only — AI debrief experience:**
5. The AI-guided debrief helped me understand my performance
6. The debrief conversation felt natural
7. I felt comfortable sharing my reasoning during the debrief

**Group B only — static reflection experience:**
5. The written reflection prompts helped me think about my performance
6. The transcript was useful for reflection

Group C receives only the shared core questions.

---

## 6. Data Collection and Processing

### What Data Is Collected

| Source | Data | Groups |
|---|---|---|
| Round 1 & 2 transcripts | Full conversation text, final agreed deal value | All |
| S1 — Baseline survey | Self-efficacy (1 item) + self-knowledge (3 items) | All |
| S2 — Post-Round-1 survey | Self-efficacy (2 items) + insight (3 items) | All |
| S3 — Post-reflection survey | Insight (2 items) + custom (2 items) | A and B only |
| S4 — Post-Round-2 survey | Self-efficacy (2 items) + insight (3 items) — identical to S2 | All |
| S5 — Perceived transfer survey | Subjective improvement (4 items) | All |
| S6 — Final experience survey | System experience (4–7 items) | All |

---

### Behavioral Quality Score (BQS) — Process Measure

Transcripts are coded using a 27-code behavioral scheme derived from NegotiAct (Jäckel et al., 2024) plus one added code (Criticism, as a negative indicator for Dimension 4). Only user turns are coded; AI turns provide context only.

**Step 1 — Behavioral Coding**

Each user turn is segmented into thought units and assigned one behavioral code. Output is a sequential list — one row per thought unit:

| Thought Unit | Code | Dimension | Direction |
|---|---|---|---|
| 1 | ... | D1 | Positive |
| 2 | ... | D3 | Positive |
| ... | | | |

**Step 2 — Dimension Ratio Computation**

For each dimension, a ratio is computed from the coded unit list:

**Dimension ratio = positive-coded units in that dimension / total coded units in that dimension**

This produces five ratios (0.0–1.0), one per Getting to Yes dimension (Fisher, Ury & Patton, 1981):

| Dimension | What it measures |
|---|---|
| D1 — Separate People from Problem | Relational tone, active listening, avoiding adversarial framing |
| D2 — Interests Not Positions | Exploring why not just what; disclosing own interests |
| D3 — Invent Options for Mutual Gain | Multi-issue proposals, creative packages, expanding the deal |
| D4 — Objective Criteria | Using market data, precedent, external standards |
| D5 — Best Alternative to a Negotiated Agreement Awareness | Communicating alternatives honestly without threats |

**Change delta = Round 2 ratio − Round 1 ratio, per dimension, compared across the three groups.** A positive delta indicates more use of that behavior type in Round 2; direction is interpreted in context of the dimension and the negotiation outcome.

> The behavioral coding pipeline is entirely separate from the Sage debrief pipeline. Participants never see their behavioral score during the study.

---

### Outcome Score — Result Measure

`(final deal − ZOPA floor) / (ZOPA ceiling − ZOPA floor)` → 0.0–1.0

A score of 1.0 means the participant captured the full available value; 0.0 means the deal landed at the AI's minimum. Extracted from transcript by the AI coder. If no agreement was reached: score = 0.0, flagged separately.

The outcome score and the behavioral dimension ratios are collected as separate measures and will be interpreted together after data collection.

---

### Survey Analysis

Two primary self-report deltas, both computed as S4 − S2:
- **Self-efficacy delta** (S4 Q1–Q2 mean − S2 Q1–Q2 mean) — did participants get more confident? Grounded in Bandura (1977) and Rigotti et al. (2008) OSS-6.
- **Insight delta** (S4 Q3–Q5 mean − S2 Q3–Q5 mean) — did participants develop clearer understanding of their performance? Grounded in Grant et al. (2002) SRIS-IN.

Secondary measures:
- **S3 insight score** (Q1–Q2 mean) — immediate reflection impact; compare Group A vs. Group B only
- **S5 perceived transfer** (Q1–Q4 mean) — subjective improvement across rounds; compare all three groups
- **S1** used as baseline covariate (Q1 = baseline self-efficacy; Q2–Q4 = baseline self-knowledge)

See `metric_papers/survey_instrument.md` for full item list, construct definitions, and references.

---

### AI Coder Reliability Validation

Because behavioral coding is performed by an AI, inter-rater reliability must be validated before analysis:

1. After data collection, randomly select 15–20% of transcripts (~5–6 transcripts for 30 participants)
2. A human rater independently codes those transcripts using the coding instruction manual — same segmentation rules and code set, blind to AI output
3. Compute **Cohen's Kappa** between human and AI code assignments (target: κ ≥ .70) and **Guetzkow's U** for unitizing agreement (target: U < .05)
4. Systematic disagreements are reviewed, coding rules clarified, and affected transcripts re-coded
5. Final Kappa is reported in the methods section of the paper

---

## 7. Sample Size

**Target:** 30 participants total — 10 per condition group, 5 per counterbalanced sub-condition. This is a pilot study; results should be framed as preliminary rather than conclusive.
**Preferred:** 15+ per group (45+ total, 7–8 per sub-condition) — improves statistical confidence meaningfully.

Recruitment: Northeastern University students.

---

## 8. Open Questions for Professor

**Study design:**
   1. Should each group have the same number of participants, or is an unequal allocation across groups acceptable?
   2. Is Group B static reflection strong enough as a control, or should it use a validated reflection instrument?

**Measurement:**
   1. Can the researcher serve as the human validator for the behavioral coding reliability spot-check, or is a blind second coder required?
   2. S2/S4 use 2 self-efficacy items (adapted from OSS-6) and 3 insight items (adapted from SRIS-IN). Is this sufficient, or should the full OSS-6 (6 items) be adopted for stronger psychometric validity?
   3. S5 is now administered to all three groups (Group C as no-intervention baseline). Confirm this is appropriate.

**Survey instrument:**
   Full item list, construct definitions, references, and analysis plan are in `metric_papers/survey_instrument.md`.
