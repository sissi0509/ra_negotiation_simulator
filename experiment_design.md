# Experiment Design — AI Negotiation Training System

**Version:** 2.0 (revised with related work context)
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
- **Standardized user context:** each participant receives a shared backstory before each round (e.g., "Your current salary is $72k. You have received a competing offer at $88k.") so all participants within a scenario start from the same position.
- **Hidden Zone of Possible Agreement (ZOPA):** the AI counterpart is given a secret target range in its prompt (e.g., salary ceiling $105k, floor $90k). The participant does not know this range. The final agreed number is used to compute the outcome score.

---

## 4. Experiment Flow

High-level sequence for all participants:

```
Pre-Survey (baseline)
    ↓
Getting to Yes Introduction (all groups)
    ↓
Round 1 Negotiation
    ↓
Post-Round-1 Self-Efficacy Survey  ⚠️ [not yet implemented]
    ↓
Debrief Intervention  (Group A: Sage / Group B: written prompts / Group C: none)
    ↓
Post-Debrief Survey
    ↓
Round 2 Negotiation
    ↓
Post-Round-2 Self-Efficacy Survey  ⚠️ [not yet implemented]
    ↓
Post-Round-2 Survey
    ↓
AI Assessment Released (both rounds)
    ↓
Final Experience Survey
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

### Step 3 — Getting to Yes Introduction (All Groups) ⚠️ *(not yet implemented)*

Before starting the first negotiation, all participants read a brief introduction to the five Getting to Yes principles (Fisher, Ury & Patton, 1981). This gives everyone a common theoretical baseline to work from during practice and ensures the debrief can refer to these principles without them being unfamiliar.

The five principles presented to participants:
1. **Separate the people from the problem** — address relationship and substance separately; avoid personal attacks
2. **Focus on interests, not positions** — understand why each side wants what they want, not just what they're asking for
3. **Invent options for mutual gain** — look for creative solutions that expand value for both sides before dividing it
4. **Insist on objective criteria** — use market data, precedent, and external standards to justify positions
5. **Know your best alternative** — understand your options if no agreement is reached; this defines your walk-away point

All three groups see this introduction equally — it is a constant across conditions, not a variable. The experimental variable remains only the debrief format after Round 1.

---

### Step 4 — Round 1 Negotiation

Before the negotiation starts, the participant receives a standardized scenario description that explains their role, the context, and their starting position. For example ⚠️ *(scenario prompts not yet finalized)*:

- **Salary scenario:** "You are negotiating your salary for a new job offer. Your current salary is $72k. You have received a competing offer at $88k. You would like to negotiate the best possible offer from this employer."
- **Apartment rent scenario:** "You are negotiating rent for an apartment you want to move into. The landlord has proposed $2,100/month. You are currently paying $1,800/month elsewhere and would like to secure the best possible rate."

This standardized context ensures all participants within a scenario start from the same position, making outcomes comparable across groups.

The participant then negotiates with the AI counterpart in a text-based chat. The full conversation is recorded as a transcript.

The AI counterpart:
- Uses the `aggressive` personality
- Operates within the hidden Zone of Possible Agreement range
- Receives a standardized role prompt so behavior is consistent across participants

---

### Step 5 — Post-Round-1 Self-Efficacy Survey ⚠️ *(not yet implemented — all groups)*

Received by all three groups immediately after Round 1 ends, **before** any debrief activity begins.

Purpose: capture perceived confidence and performance before reflection, so the debrief cannot inflate post-round ratings.

Questions (1–7 Likert):
1. How confident do you feel in your ability to negotiate effectively?
2. How well do you think you performed in this negotiation?
3. How prepared did you feel going into this negotiation?

> ⚠️ Timing is critical. The current post-round-1 survey fires after the debrief — a new pre-debrief trigger is needed before running the study.

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

### Step 7 — Post-Debrief Survey *(Groups A and B only)* ⚠️ *(not yet implemented)*

Captures the immediate impact of the reflection activity. Group C skips this step and proceeds directly to Round 2.

Questions (1–7 Likert):
1. I understand my performance more clearly
2. I understand what I should improve next time
3. I can identify key moments that affected the negotiation
4. I feel more prepared for a similar negotiation
5. The reflection activity helped me think deeply

---

### Step 8 — Round 2 Negotiation

Participant negotiates using the other scenario (counterbalanced from Round 1). Same AI settings apply — aggressive personality, standardized backstory, hidden ZOPA range. The full conversation is recorded.

Round 2 measures whether learning from the debrief transfers to a new negotiation context.

---

### Step 9 — Post-Round-2 Self-Efficacy Survey ⚠️ *(not yet implemented)*

Same three self-efficacy questions as Step 5, captured after Round 2 ends.

---

### Step 10 — Post-Round-2 Survey *(Groups A and B only)* ⚠️ *(not yet implemented)*

Captures perceived improvement after completing both rounds. Group C skips this step.

Questions (1–7 Likert):
1. I felt more confident in the second negotiation
2. I applied what I learned from the first round
3. I had a clearer strategy in the second negotiation
4. I handled the second negotiation more effectively

---

### Step 11 — AI Assessment Released *(all groups)*

After all behavioral measurements are complete, all participants receive their AI assessment report for both rounds. This report was auto-generated at the end of each negotiation session but withheld until this point to avoid influencing Round 2 behavior.

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

| Source | Data |
|---|---|
| Round 1 & 2 transcripts | Full conversation text, final agreed deal value |
| Pre-survey | Baseline self-awareness and confidence (4 items) |
| Post-round self-efficacy surveys | Perceived confidence and performance before each debrief (3 items × 2 rounds) |
| Post-debrief survey | Immediate reflection impact (5 items) |
| Post-round-2 survey | Perceived improvement (4 items) |
| Final experience survey | System usability and trust (5 items) |

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

Survey measures track three constructs:
- **Self-awareness:** pre-survey → post-debrief → post-round-2 change in perceived clarity of strengths/weaknesses
- **Self-efficacy:** post-round-1 → post-round-2 delta in perceived confidence (pre-debrief timing)
- **System experience:** final survey ratings of usefulness and trust

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
   2. Should the survey questions be grounded in established scales from the literature (e.g., validated self-efficacy or self-awareness instruments)? If so, which ones are appropriate for this context? And who will be responsible for manually reviewing or validating survey responses?


**Pending implementation:**
   1. Pre-debrief self-efficacy survey (both rounds) — confirm timing and build before running the study.
   2. Separate experiment transcripts and experiment debriefs database collections — agreed schema, not yet wired into the API routes.
