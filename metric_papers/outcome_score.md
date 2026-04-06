# Outcome Score

## AI Negotiation Simulator — Result Measure

**Theoretical basis:** Zone of Possible Agreement (ZOPA) — Fisher, Ury & Patton (1981)
**Input:** Final deal value extracted from coded transcript (see `coding_instruction_readable.md` Section 8 header)
**Applies to:** Salary negotiation and apartment rent negotiation transcripts

---

## 1. Purpose

The Outcome Score captures _what_ the participant achieved — the final deal value relative to the range of possible agreements. It is a separate and independent measure from the **Behavioral Quality Score (BQS)**, which captures _how_ the participant negotiated.

**Why these are two distinct DVs:**

| Measure       | What it captures                                                                          | Document                     |
| ------------- | ----------------------------------------------------------------------------------------- | ---------------------------- |
| BQS           | Process quality — how skillfully the participant applied principled negotiation behaviors | `scoring_rubric_readable.md` |
| Outcome Score | Result quality — where the final deal landed within the available value range             | This document                |

A participant can achieve a high BQS (excellent process) but a low Outcome Score (bad deal) — for example, by exploring interests effectively but failing to use that information to construct a favorable offer. The two scores together provide a richer picture of negotiation performance than either alone.

---

## 2. Formula

```
Outcome Score = (final deal − scenario floor) / (scenario ceiling − scenario floor)

Range: 0.0 to 1.0
  0.0 = deal at the AI's floor — minimum achievable for participant
  1.0 = deal at the AI's ceiling — maximum achievable for participant
```

**Direction:** Higher = better for the participant. A score of 0.5 means the participant captured exactly half of the available value in the ZOPA.

**Extracting the final deal:** The final deal value is recorded in the coding output header (see `coding_instruction_readable.md` Section 8). The coder extracts it directly from the transcript — the last agreed-upon figure, or "No Agreement" if the session ended without a deal.

---

## 3. ZOPA Ranges

Values extracted from `ai_prompts/scenario_salary_negotiation.md` and `ai_prompts/scenario_apartment_rent.md`.

| Scenario | Participant goal | Worst outcome (0.0) | Best outcome (1.0) | Formula |
|---|---|---|---|---|
| Salary negotiation | Maximize salary | $85,000 (AI's opening offer) | $95,000 (AI's absolute max) | `(final − 85,000) / (95,000 − 85,000)` |
| Apartment rent | Minimize rent | $2,400 (AI's opening offer) | $2,100 (AI's absolute floor) | `(2,400 − final) / (2,400 − 2,100)` |

**Direction note:** For salary, higher deal = higher score. For rent, lower deal = higher score — the formula is inverted accordingly. Both produce a 0.0–1.0 range where 1.0 = best possible outcome for the participant.

**AI soft limit (for context):** Salary AI will move to $92,000 with good pushback before reaching the $95,000 maximum. Rent AI will move to $2,200 before reaching the $2,100 floor. These soft limits are not used in the formula — only the final agreed value and the floor/ceiling matter.

---

## 4. No Agreement

If the negotiation ends without a deal:

- Record Outcome Score = 0.0, flagged as **"No Agreement"**
- Do **not** average with completed-deal scores without discussion
- Report no-agreement frequency as a separate metric in analysis
- A no-agreement outcome is not necessarily worse than a bad deal — the participant may have correctly walked away from an unfavorable outcome. Flag for transcript review before interpreting.

---

## 5. Improvement Delta

The primary research measure is the delta between rounds:

```
Outcome Delta = Round 2 Outcome Score − Round 1 Outcome Score
```

| Delta          | Interpretation                                      |
| -------------- | --------------------------------------------------- |
| +0.20 or more  | Strong improvement — notably better deal in Round 2 |
| +0.10 to +0.19 | Moderate improvement                                |
| −0.05 to +0.09 | Roughly stable                                      |
| −0.10 to −0.19 | Regression — flag for review                        |
| −0.20 or less  | Strong regression — flag and examine transcript     |

⚠️ _Delta cutoffs are preliminary. Calibrate against pilot data before final reporting._

---

## 6. Interpreting BQS and Outcome Score Together

The two scores can agree or disagree. Use this 2×2 matrix to interpret the combination:

| BQS Delta          | Outcome Delta      | Interpretation                                                                                                                                                         |
| ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Positive           | Positive           | **Clear improvement** — process and outcome both better. Strongest evidence for debrief effect.                                                                        |
| Positive           | Neutral / Negative | **Learning without execution** — behavioral quality improved but did not convert to a better deal. May reflect scenario difficulty, transfer lag, or ZOPA constraints. |
| Neutral / Negative | Positive           | **Lucky outcome** — better deal without process change. Could be scenario variation or AI behavior. Do not attribute to debrief.                                       |
| Negative           | Negative           | **Regression** — flag for transcript review.                                                                                                                           |

**Reporting convention:** Report BQS delta and Outcome Score delta as two separate columns in the results table. Do not collapse them into a single composite metric. The pattern of their relationship is itself a finding.

---

## 7. Relationship to Experimental Groups

In a three-group design (AI debrief / static reflection / control), the hypothesis is that AI debrief participants show greater improvement on BQS. Outcome Score improvement is a secondary, exploratory measure — a positive BQS delta does not guarantee an Outcome Score delta, and the analysis should not assume it does.

If Outcome Score deltas diverge from BQS deltas systematically, note possible explanations:

- Scenario difficulty variation across rounds (partially controlled by counterbalancing)
- AI counterpart behavior variation across sessions
- Transfer lag — behavioral learning may require multiple rounds before it converts to better deals

---

_This document should be read alongside `scoring_rubric_readable.md` (BQS process measure) and `coding_instruction_readable.md` (how transcripts are segmented, coded, and the deal value extracted)._
