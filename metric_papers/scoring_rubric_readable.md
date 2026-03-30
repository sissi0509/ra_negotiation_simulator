# Scoring Rubric
## AI Negotiation Simulator — Behavioral Quality Assessment

**Theoretical basis:** Getting to Yes (Fisher, Ury & Patton, 1981) · Smolinski & Xiong (2020) Negotiation Competency Model
**Input:** Coded transcript from `coding_instruction_readable.md`
**Applies to:** Salary negotiation and apartment rent negotiation transcripts
**Version:** 1.2 (reflects `scoring_rubric.md` v1.2 + CRIT addition)

---

## 1. Purpose

This document converts a coded negotiation transcript into a **Behavioral Quality Score (BQS)** — the primary process measure for the experiment.

The BQS is a **research measurement tool only.** It is applied post-experiment by an AI analyst (Claude Sonnet) to all participant transcripts. Participants never see their BQS during the study. The debrief intervention (Group A) runs on a separate pipeline — the `negotiation_diagnostic_matrix.md` and `pre_assessment_protocol.md` — which is independent of this rubric.

**What the BQS measures:** How skillfully a participant negotiated, scored across five dimensions from *Getting to Yes*. Each dimension scores 1–5; the composite ranges from 5–25.

**How it is used:** Round 1 BQS and Round 2 BQS are compared. The delta (Round 2 − Round 1) is the key outcome variable — it measures whether negotiation behavior improved across the two rounds, and whether that improvement differs across the three experimental groups (AI debrief, static reflection, control).

The coding scheme (`coding_instruction.md`) labels each thought unit with a behavioral code. This rubric takes those labels and converts them into the five dimension scores and the composite.

---

## 2. The Scoring Scale

### 2.1 How scores are calculated

Each dimension score is determined by two inputs:
1. **Quantitative signals** — frequency (how often the behavior appeared) and ratio (positive vs. negative balance), computed from Document 1 output. The use of frequency and ratio as the two primary signals follows Weingart, Olekalns & Smith (2004) and NegotiAct (Jäckel et al., 2024).
2. **Qualitative adjustment** — a ±1 point adjustment based on contextual criteria that the numbers alone cannot capture, such as whether positive behaviors were distributed across the transcript or concentrated in one phase. This follows the Behaviorally Anchored Rating Scale (BARS) approach — combining numeric scores with behavioral level descriptions and structured rater judgment. The 5-point scale and behavioral level anchors follow Smolinski & Xiong (2020). ⚠️ *The specific ±1 criteria for each dimension are project-specific operationalizations — flag for professor review.*

The result is a 5-point scale anchored to three behavioral levels:

| Score | Level | What it means |
|---|---|---|
| 1 | Low | Dimension largely absent, or consistently violated |
| 2 | Low-Mid | Dimension attempted but rarely or ineffectively |
| 3 | Mid | Dimension present but inconsistent; mixed with contrary behaviors |
| 4 | Mid-High | Dimension present consistently; occasional gaps |
| 5 | High | Dimension demonstrated consistently and strategically throughout |

### 2.2 What the numbers and levels each do

The three behavioral levels define **qualitative zones** — observable patterns of behavior. The 5-point scale captures **position within and between those zones**. This matters for measuring improvement:

- A move from 1 → 2 is progress within the Low zone
- A move from 2 → 3 crosses a zone boundary — a more significant shift
- Most early-round participants score 1–3; scores of 4–5 reflect skilled principled negotiation

### 2.3 Scoring sequence

Always score dimensions in this order: **D1 → D2 → D3 → D4 → D5 → Composite**

---

## 3. Zero Evidence Rules

Before applying the threshold tables, check whether any evidence exists. The threshold tables assume some behavior was present — they break down at zero.

Three situations can produce a score of 1, and they need to be distinguished because they mean different things:

| Situation | Positive units | Negative units | Score | Flag |
|---|---|---|---|---|
| Not engaged | 0 | 0 | 1 | "Not Demonstrated" |
| Violated once | 0 | 1 | 1 | "Violated" |
| Consistently violated | 0 | 2+ | 1 | "Consistently Violated" |

**Why distinguish them if the score is the same?** Because they represent very different starting points for Round 2. A participant who never engaged with interest exploration has a different learning need than one who actively deflected every interest question. The flag preserves this distinction for analysis.

**Exception — D5 (BATNA Awareness):** When not demonstrated, D5 scores **2**, not 1. Absence of BATNA communication does not necessarily mean poor negotiating — in a short session, the participant may simply not have reached the point where BATNA becomes relevant. Score 1 is reserved for active misuse (threat framing, ultimatums).

⚠️ *The three-way distinction and the D5 exception are project-specific design decisions. The general principle — that absence and violation should be scored and flagged differently — follows standard rubric design practice (Jonsson & Svingby, 2007), but the specific rules here are our operationalization. Flag for professor review.*

---

> **Cross-reference:** For the full mapping of codes to dimensions and positive/negative directions, see `coding_instruction_readable.md` Section 5 (Step 3). The scoring rubric starts from the coded and mapped output — dimension unit counts are already determined before this document is applied.

---

## 4. Scoring Input Requirements

The scoring rubric takes the sequential code list from `coding_instruction_readable.md` Section 8 as its input. The full format is defined there — this section describes what is derived from it.

**From the header:**

| Field | Used for |
|---|---|
| Scoreable units (total minus SHRT) | Denominator for all frequency calculations |

**From the sequential code list:**

| Derived from list | Used for |
|---|---|
| Count of positive units per dimension | Frequency calculation |
| Count of negative units per dimension | Ratio calculation + Zero Evidence flag type |
| Position of positive/negative units (early / mid / late) | Qualitative adjustment — distribution check |
| Position of D2 positive units relative to D5 positive units | D5 Score 5 confirmation criterion 1 |
| Position of D2 or D3 positive units after first D5 positive unit | D5 Score 5 confirmation criterion 3 |
| D3 supplementary flagged units | D3 qualitative adjustment |
| PCOM classification in Notes column | D5 threshold and qualitative adjustment |
| Excluded SUBS units | D4 frequency denominator |
| APOS units present | D5 qualitative adjustment and Score 5 confirmation criterion 4 |

**Minimum transcript length:** If scoreable units < 5, do not score. Flag as "transcript too short to score reliably" and treat as missing data.

---

## 5. D1 — Separate People from Problem

### What this dimension measures

Participants should treat the negotiation as a joint problem to solve together, not as a contest against the counterpart. This means managing the relationship, managing emotions, and keeping the discussion constructive even when positions differ.

### Score thresholds

Two signals are calculated:
- **Frequency** = positive D1 units ÷ total scoreable user units
- **Ratio** = positive units ÷ (positive + negative units)

| Zone | Frequency | Ratio | Starting Score |
|---|---|---|---|
| Low | < 0.10 | *any*, OR ratio < 0.50 | 1 |
| Low-Mid | 0.10–0.14 | ≥ 0.50 | 2 |
| Mid | 0.15–0.24 | 0.50–0.84 | 3 |
| Mid-High | 0.15–0.24 | ≥ 0.85 | 4 |
| High | ≥ 0.25 | ≥ 0.85 | 5 |

**If frequency and ratio point to different zones:** use the lower zone as the starting score.

### Qualitative adjustment (±1 maximum, apply the first trigger that fires)

**Adjust up +1 if:**
- Positive socio-emotional behaviors are distributed across early, middle, *and* late turns (not just clustered at the opening)
- Participant maintained constructive tone under pressure — stayed warm or neutral after the counterpart rejected their position or avoided answering

**Adjust down −1 if:**
- Positive codes appear only in the opening turn and are absent from the rest
- The positive codes present are formulaic openers ("thanks for meeting with me") with no genuine relational engagement in the substantive turns

### Behavioral level descriptions

> **Note on how these descriptions are used:** The numeric score is determined by the threshold table and qualitative adjustment above — not by these descriptions. The behavioral level descriptions serve two purposes: (1) they help human readers understand what each score level looks like in practice; (2) the AI scorer uses them to write a short qualitative note explaining the score. They are anchors for interpretation, not the scoring mechanism.

**Low (Score 1–2):** The participant treats the negotiation as adversarial. The counterpart is framed as an obstacle. Patterns: expressing frustration (NEGA), negative remarks about the counterpart's motives (NREL), transactional tone with no relational acknowledgment, no recognition when the counterpart makes a concession.

*Salary Low:* Framing the employer as withholding; frustration at budget constraints without acknowledging their legitimacy.
*Rent Low:* Framing the landlord as greedy; anger at the increase without acknowledging real cost pressures.

**Mid (Score 3):** Maintains a reasonably professional tone but does not actively invest in the relationship. Polite but not warm. Some ACLS present. No NEGA or NREL. Positive language is procedural rather than strategic — the relationship is present but not used as a resource.

**High (Score 4–5):** Actively uses the relationship to advance problem-solving. Consistently reflects back the counterpart's reasoning (ACLS across the transcript). References shared interests (PREL). Encourages the counterpart's reasoning even when disagreeing (ENCO + REJO in same transcript). Maintains warmth under pressure.

*Score 4:* High frequency and ratio but socio-emotional behavior is concentrated in one part of the transcript.
*Score 5:* Distributed throughout including under pressure — e.g., remaining warm after the counterpart rejects their position or delays.

---

## 6. D2 — Interests Not Positions

### What this dimension measures

Participants should explore the underlying needs and interests behind positions — both their own and the counterpart's. Skilled negotiators ask *why*, explain *why*, and use interest information to find solutions that satisfy both parties' real needs rather than just splitting a number.

### Score thresholds

- **Frequency** = positive D2 units ÷ total scoreable user units
- **Ratio** = positive units ÷ (positive + negative units)

| Zone | Frequency | Ratio | Starting Score |
|---|---|---|---|
| Low | < 0.10 | < 0.40 | 1 |
| Low-Mid | < 0.10 | ≥ 0.40 | 2 |
| Low-Mid (alt) | 0.10–0.14 | *any* | 2 |
| Mid | 0.15–0.24 | 0.40–0.74 | 3 |
| Mid-High | 0.15–0.24 | ≥ 0.75 | 4 |
| High | ≥ 0.25 | ≥ 0.75 | 5 |

**Note on ratio thresholds:** The ratio threshold for D2 (0.75) is lower than D1 (0.85) because D2 naturally accumulates more negative units in any active negotiation. A ratio of 0.75 is strong performance for this dimension.

### Qualitative adjustment (±1 maximum)

**Adjust up +1 if:**
- Interest exploration occurs at multiple distinct points — not only at the opening but also mid-transcript after offers have been made
- The participant demonstrably uses interest information gathered earlier to frame a later argument or proposal (the connection must be explicit in the transcript)

**Adjust down −1 if:**
- Interest exploration is limited to one early question never returned to; the rest of the transcript is purely positional
- The participant asks about interests but immediately follows with a positional demand in the same turn — suggesting the interest question was rhetorical

### Behavioral level descriptions

**Low (Score 1–2):** Negotiates almost entirely in positional terms. States demands repeatedly without explaining the underlying need. Treats the counterpart's position as the obstacle, not a problem to understand. All activity is offers, counter-offers, and rejections with no exploration of why.

*Score 1:* Zero APRI/PPRI/APFI/PPFI. The transcript is entirely SIA, PPOS, and ROM — the participant never asks or explains "why."
*Score 2:* One or two interest units appear early and are never returned to.

*Salary Low:* Repeating a salary number without explaining what it needs to achieve; not asking what the employer values in the role.
*Rent Low:* Repeating a maximum rent without explaining housing constraints; not asking what the landlord needs the rent to cover.

**Mid (Score 3):** Some interest exploration but reverts to positional behavior under pressure. Asks "why" once, typically at the opening, then shifts to positional exchange. Interest information gathered is not obviously used later.

**High (Score 4–5):** Interest exploration is a consistent strategy, not just an opening move. Asks about the counterpart's interests at multiple points including after positions are stated. Uses interest information gathered earlier to frame later proposals. Explicitly names shared interests when they appear. Reframes impasses as interest problems to solve.

*Score 4:* Consistent exploration with high ratio, but interest information is not visibly used to generate options or reframe proposals.
*Score 5:* Interest exploration drives the negotiation structure — the participant demonstrably uses what they learned to shape proposals and arguments across early, middle, and late turns.

*Salary High:* Asking what the employer values before proposing a number; using the employer's retention interest to frame the compensation argument.
*Rent High:* Asking what the landlord's cost floor actually is; using the landlord's interest in avoiding vacancy to argue for a lower number.

---

## 7. D3 — Invent Options for Mutual Gain

### What this dimension measures

Participants should generate creative options — packages, trades, contingencies — rather than treating the negotiation as a binary choice between two positions. The key behavior is making multi-issue offers (bundling two or more terms) which create more value than single-issue bargaining.

### Score thresholds

- **Frequency** = positive D3 units ÷ total scoreable user units
- **Ratio** = positive units ÷ (positive + negative units)

| Zone | Frequency | Ratio | Starting Score |
|---|---|---|---|
| Not Demonstrated | 0 positive, 0 negative | N/A | 1 (flag: Not Demonstrated) |
| Single-Issue Only | 0 positive, ≥ 1 negative | 0.0 | 1 (flag: Single-Issue Only) |
| Low-Mid | > 0 positive, < 0.07 | < 0.30 | 2 |
| Mid | 0.07–0.13 | *any*, OR ratio 0.30–0.59 with freq < 0.07 | 3 |
| Mid-High | 0.07–0.14 | ≥ 0.60 | 4 |
| High | ≥ 0.15 | ≥ 0.80 | 5 |

**Note on lower thresholds:** Multi-issue offers are cognitively demanding and even skilled negotiators deploy them selectively. A single well-constructed package offer is more meaningful than several single-issue offers. The thresholds reflect this.

### Qualitative adjustment (±1 maximum)

**Adjust up +1 if:**
- D3 supplementary indicators are present (PPFI, APFI, or EXTQ used in the multi-issue sense) — shows nascent multi-issue thinking even without a complete MIA
- A MIA present visibly incorporates interest information gathered earlier — the package is designed around interests, not just bundling for its own sake

**Adjust down −1 if:**
- All offer activity is SIA with no mention of additional negotiable dimensions at any point
- Participant explicitly frames the negotiation as single-issue ("it's just about the number for me")

**Special case — Not Demonstrated with supplementary indicators:** Score stays at 1, but the flag changes from "Not Demonstrated" to "Early Options Awareness." This preserves the low score while capturing a developmental signal for the debrief.

### Behavioral level descriptions

**Low (Score 1–2) — including Not Demonstrated:** Every offer is a single number or term. When an impasse occurs, the response is to concede on the single issue rather than introduce a new dimension. No mention of contingencies, creative arrangements, or alternative structures.

*Score 1 — Not Demonstrated:* No offers made at all. May indicate avoidance of commitment.
*Score 1 — Single-Issue Only:* Offers made, but every single one addresses only one issue.
*Score 2:* One mention of a potential alternative structure, or supplementary indicators present showing nascent awareness — but no complete MIA constructed.

*Salary Low:* Only negotiating base salary; never mentioning bonus, equity, start date, title, PTO, or remote work.
*Rent Low:* Only negotiating the monthly price; never mentioning lease length, maintenance, move-in terms, or parking.

**Mid (Score 3):** Introduces multi-issue thinking but does not develop it into concrete packages. Mentions additional negotiable dimensions. May ask whether other terms could be part of the discussion. If a MIA is made, it is typically a simple two-issue package and it is reactive — introduced when single-issue negotiation hits a wall, not as an opening strategy.

**High (Score 4–5):** Proactively creates value through multi-issue packages. Introduces multiple negotiable dimensions explicitly. Makes at least two MIA proposals. When an impasse occurs, responds by repackaging rather than conceding on a single dimension.

*Score 4:* Two or more MIA units, but packages are simple (two issues) with no explicit trade-off reasoning.
*Score 5:* Packages visibly reflect interest information gathered earlier. Trade-offs explained in terms of relative value to each party. The negotiation is genuinely integrative — enlarging the agreement rather than splitting the difference.

*Salary High:* Proposing base + bonus structure; offering a specific start date in exchange for a signing bonus; bundling title, base, and equity into a total compensation package.
*Rent High:* Proposing a lower monthly rate for a longer lease commitment; offering to handle minor repairs in exchange for rent stability; bundling rent, parking, and maintenance into a single package.

---

## 8. D4 — Objective Criteria

### What this dimension measures

When interests conflict, participants should resolve disagreements by reference to fair external standards — market rates, precedent, comparable data, professional norms — rather than by positional pressure or assertion of need. A skilled negotiator brings evidence, asks the counterpart to justify their position with evidence, and identifies standards that both parties can accept as fair.

**Note on SUBS:** Only SUBS that references an *external* standard (market data, comparables, precedent, costs) counts toward D4. SUBS justified purely by personal need does not qualify — it stays coded as SUBS but is excluded from the D4 count.

### Score thresholds

- **Frequency** = qualifying positive D4 units ÷ total scoreable user units
- **Ratio** = positive units ÷ (positive + negative units) — applied from Mid zone upward only. At Low frequency the evidence base is too small for ratio to discriminate meaningfully.

| Zone | Frequency | Ratio | Starting Score |
|---|---|---|---|
| Not Demonstrated | 0 qualifying units | — | 1 (flag: Not Demonstrated) |
| Low | 0.01–0.09 | — | 2 |
| Mid | 0.10–0.19 | ≥ 0.50 | 3 |
| Mid-High | 0.20–0.29 | ≥ 0.75 | 4 |
| High | ≥ 0.30 | ≥ 0.75 | 5 |

### Qualitative adjustment (±1 maximum)

**Adjust up +1 if:**
- ASUB is present alongside at least one SUBS or FACT unit

**Adjust down −1 if:**
- Only FACT units are present — no SUBS and no ASUB

### Behavioral level descriptions

**Low (Score 1–2):** Arguments based on assertion, preference, or need rather than external standards. When challenged, responds by restating or making a concession rather than providing evidence. Never asks the counterpart to justify their position (no ASUB).

*Score 1 — Not Demonstrated:* Zero SUBS, FACT, or ASUB. No attempt at any form of reasoning beyond stating positions and needs.
*Score 2:* One or two vague SUBS/FACT units — "I think the market supports this" without specific data.

*Salary Low:* Asking for $95k without citing salary surveys or benchmarks; not asking how the employer determined the budget.
*Rent Low:* Refusing $2,400 without citing comparable listings; not asking how the landlord calculated the new rate.

**Mid (Score 3):** References at least one external standard specifically enough to be meaningful — a range or a source, not just a vague appeal. Does not consistently ask the counterpart to meet the same standard. Uses criteria defensively (to resist the counterpart's position) more than offensively (to propose a fair framework).

**High (Score 4–5):** Objective criteria are the primary framework for argument. References multiple types of external standards. Cites specific data rather than general appeals. Asks the counterpart to justify their position with evidence (ASUB present). Identifies or proposes criteria that both parties can accept as fair.

*Score 4:* Multiple qualifying units with specific data, ASUB present — but criteria primarily support the participant's own position.
*Score 5:* Bilateral use of criteria — applies them to evaluate both their own position and the counterpart's. Explicitly proposes a fair standard or identifies criteria grounded in the counterpart's interests.

*Salary High:* Citing a specific salary survey with a range; asking how the employer determined the budget and what benchmark they used; referencing the cost of a long search as a counterpart criterion.
*Rent High:* Citing specific comparable listings; asking what cost inputs the landlord used; using vacancy and turnover costs as the counterpart's criterion to weigh.

---

## 9. D5 — BATNA Awareness

### What this dimension measures

Participants should know their Best Alternative to a Negotiated Agreement — what they will do if no deal is reached — and use that knowledge to negotiate from security rather than anxiety. This means knowing their own BATNA, communicating it at the right time, and being curious about the counterpart's BATNA. The two failure modes are opposite: ignoring BATNA (making bad deals out of anxiety) and weaponizing it (using it as a threat that damages the relationship).

**Important:** D5 is the most context-dependent dimension. PCOM's classification as positive or negative depends on context — see `coding_instruction_readable.md` Section 6.1 for the decision rule. The quantitative thresholds provide a starting point, but the qualitative descriptions carry more weight here than for any other dimension. When signals conflict, defer to the qualitative description.

### Score thresholds

- **Frequency** = positive BATNA units ÷ total scoreable user units
- **Ratio** = positive units ÷ (positive + negative BATNA units)

| Zone | Frequency | Ratio | Starting Score |
|---|---|---|---|
| Not Demonstrated | 0 BATNA units of any kind | N/A | **2** (see note) |
| Low | Any BATNA units | < 0.40 | 1 |
| Low-Mid | < 0.10 | 0.40–0.69 | 2 |
| Mid | 0.10–0.14 | 0.70–0.84 | 3 |
| Mid-High | 0.10–0.24 | ≥ 0.85 | 4 |
| High | ≥ 0.15 | 1.0 | 5 (requires qualitative confirmation) |

**Why Not Demonstrated scores 2 not 1:** Absence of BATNA communication is not inherently poor. In a shorter session, the participant may not have reached the point where BATNA becomes relevant. Score 2 reflects this ambiguity. Score 1 is reserved for active misuse (threatening or ultimatum framing).

**Score 5 requires confirmation:** Do not assign 5 without checking all four criteria in the qualitative section below.

### Qualitative adjustment (±1 maximum) and Score 5 confirmation

**Adjust up +1 if (apply the first that fires):**
- D5 positive units are distributed across early, mid, and late transcript AND no D5 negative units present
- APOS units are present in the D5 coding output

**Adjust down −1 if (apply the first that fires):**
- Exactly 1 D5 positive unit AND its position precedes all D2 positive units
- D5 negative units are present

**Score 5 qualitative confirmation — all four must be true (cap at 4 if any is absent):**
1. First D5 positive unit position falls after at least one D2 positive unit
2. No D5 negative units present
3. D2 or D3 positive units appear after the first D5 positive unit
4. APOS units present in coding output

### Behavioral level descriptions

**Low (Score 1–2):** Two distinct failure modes:

*Ignoring BATNA (Score 2):*
- No reference to outside alternatives at any point
- Appears to negotiate from anxiety — excessive concessions, accepting unfavorable terms without resistance
- No signal the participant has thought about what happens if the negotiation fails

*Weaponizing BATNA (Score 1):*
- BATNA communicated as an ultimatum before any interest exploration
- Alternative is introduced to pressure, not to inform
- Damages the relationship rather than clarifying the decision

*Salary — Ignoring:* Making concessions below market rate; never mentioning the competing offer even when it is in the scenario setup.
*Salary — Threat:* "I have another offer at $92k and if you can't match it I'm gone" as an opening statement.
*Rent — Ignoring:* Accepting $2,400 after minimal resistance; not mentioning that other apartments are available.
*Rent — Threat:* "I've found three other places for $2,100. Take it or leave it" without prior rapport.

**Mid (Score 3):** Mentions an outside alternative honestly — but timing is suboptimal (either too early or too late) and it is mentioned once without being woven into the negotiation logic. Does not explicitly connect the BATNA to the counterpart's stakes.

**High (Score 4–5):** BATNA is a structural element of the negotiation strategy — not a one-off mention and not a threat. Communicates honestly and strategically. Connects the BATNA to what no agreement costs both parties. Continues interest exploration and option generation after signaling BATNA. Shows curiosity about the counterpart's own alternatives.

*Score 4:* Multiple positive BATNA signals distributed across the transcript. BATNA informs the stance without dominating it.
*Score 5:* All of the above, plus explicit connection to the counterpart's BATNA consideration. The BATNA is used as a criterion for evaluating proposed agreements.

*Salary High:* Mentioning the competing offer after establishing rapport; framing it as context, not leverage; referencing the cost of a long search as the counterpart's BATNA.
*Rent High:* Mentioning alternative apartments after acknowledging the landlord's cost constraints; using vacancy cost as the counterpart's BATNA consideration.

---

## 10. Composite Score and Interpretation

### Calculation

```
Composite Score = D1 + D2 + D3 + D4 + D5
Range: 5 (minimum) to 25 (maximum)
```

### Interpretation bands

| Score | Band | What it indicates |
|---|---|---|
| 5–8 | Early stage | Primarily positional negotiation; principled behaviors largely absent |
| 9–12 | Developing | Some principled behaviors present but inconsistent across dimensions |
| 13–17 | Intermediate | Principled behaviors present across most dimensions, not all consistent |
| 18–21 | Proficient | Consistent principled behavior; some dimensions at high level |
| 22–25 | Advanced | Principled negotiation demonstrated consistently across all five dimensions |

### Improvement delta

The primary research measure is the **delta** between Round 1 and Round 2:

```
Overall Delta = Round 2 Composite − Round 1 Composite
Per-Dimension Delta = Round 2 Dimension Score − Round 1 Dimension Score
```

| Delta | Interpretation |
|---|---|
| +4 or more | Strong improvement |
| +2 to +3 | Moderate improvement |
| +1 | Marginal improvement |
| 0 | No change |
| −1 | Marginal regression |
| −2 or less | Regression — flag for transcript review |

**On regression:** A negative delta is not definitive evidence that no learning occurred. Scenario difficulty, AI counterpart behavior, and transcript length all affect scores. Flag regressions and examine the transcript before drawing conclusions.

### Equal weighting rationale

All five dimensions are weighted 1:1:1:1:1. This reflects the Getting to Yes framework, which treats all five principles as co-equal foundations of principled negotiation. If future research identifies certain dimensions as stronger predictors of outcomes in these specific scenarios, weighting can be adjusted without rebuilding the rubric.

---

## 11. Outcome Score

### What it measures

The Outcome Score captures *what* the participant achieved — the final deal value relative to the range of possible agreements. It is a separate measure from the BQS, which captures *how* they negotiated. Both scores are needed: BQS measures process quality, Outcome Score measures result quality.

### Formula

```
Outcome Score = (final deal − scenario floor) / (scenario ceiling − scenario floor)

Range: 0.0 (deal at the AI's floor — minimum for participant) to 1.0 (deal at the AI's ceiling — maximum for participant)
```

### ZOPA ranges (to be filled before experiment runs)

The AI counterpart is given a hidden reservation range in its system prompt. These values must be recorded before data collection begins.

| Scenario | Floor | Ceiling | Notes |
|---|---|---|---|
| Salary negotiation | [TBD] | [TBD] | AI will not accept below floor; ceiling is maximum AI can offer |
| Apartment rent | [TBD] | [TBD] | AI will not accept above ceiling; floor is minimum AI will accept |

⚠️ *ZOPA ranges are a must-resolve before the experiment runs — without them the outcome score cannot be computed post-hoc.*

### No agreement reached

If the negotiation ends without a deal, record as:
- Outcome Score = 0.0, flagged as "No Agreement"
- Treat separately in analysis — do not average with completed deals without discussion

### Interpreting BQS and Outcome Score together

The two scores can agree or disagree. Use this 2×2 table to interpret the combination:

| BQS Delta | Outcome Delta | Interpretation |
|---|---|---|
| Positive | Positive | **Clear improvement** — process and outcome both better. Strongest evidence for debrief effect. |
| Positive | Neutral / Negative | **Learning without execution** — behavioral quality improved but did not convert to a better deal. May reflect scenario difficulty or transfer lag. |
| Neutral / Negative | Positive | **Lucky outcome** — better deal without process change. Could be scenario variation or AI behavior. Do not attribute to debrief. |
| Negative | Negative | **Regression** — flag for transcript review. |

---

## 12. Worked Scoring Example

The following applies the rubric to a sample transcript from `coding_instruction_readable.md` Section 7. The transcript is a rent negotiation; scoreable user units = 15.

**Coded output used as input:**
- D1: 5 positive units, 0 negative (Units 2, 5, 9, 11, 15)
- D2: 3 positive units, 1 negative (Units 3, 13, 23 positive; Unit 18 negative)
- D3: 0 MIA, 0 SIA, 0 supplementary
- D4: 3 qualifying positive units (Unit 6 FACT, Unit 7 ASUB, Unit 12 SUBS with external reference)
- D5: 3 positive BATNA units, 0 negative (Units 10, 16, 22 — all PCOM BATNA Positive)

---

### D1 — Separate People from Problem

Frequency: 5/15 = **0.33** · Ratio: 5/5 = **1.0**
Threshold: frequency ≥ 0.25, ratio ≥ 0.85 → **High → starting score 5**

Qualitative check: positive units distributed across early (Unit 2), mid (Unit 5), and late turns (Units 9, 11, 15) ✓ · Participant remained warm after the AI deflected in Unit 14 ✓ · Starting score already 5 — no adjustment possible.

**D1 Score: 5**
*Note: User consistently acknowledged the landlord's reasoning and maintained goodwill across the full transcript, including after deflection.*

---

### D2 — Interests Not Positions

Frequency: 3/15 = **0.20** · Ratio: 3/4 = **0.75**
Threshold: frequency 0.15–0.24, ratio ≥ 0.75 → **Mid-High → starting score 4**

Qualitative check: interest exploration at Unit 3 (early), Unit 13 (mid, after argument exchange), Unit 23 (late) ✓ · Unit 12 vacancy cost argument demonstrably built on interest information from Units 3 and 13 ✓ → **+1 adjustment**

**D2 Score: 5**
*Note: Participant asked about counterpart's interests at multiple points and used the landlord's interest in avoiding vacancy to construct the objective criteria argument.*

---

### D3 — Invent Options for Mutual Gain

MIA: 0 · SIA: 0 · Supplementary: 0
Threshold: 0 MIA, 0 SIA → **Not Demonstrated → starting score 1**

Qualitative check: no supplementary indicators → no adjustment.

**D3 Score: 1 (flag: Not Demonstrated)**
*Note: No concrete offers made; no multi-issue thinking evidenced. Clear development priority for Round 2.*

---

### D4 — Objective Criteria

Qualifying positive units: 3 (FACT, ASUB, SUBS with external reference)
Frequency: 3/15 = **0.20**
Threshold: 0.20–0.29 → **Mid-High → starting score 4**

Qualitative check: Unit 12 used the landlord's vacancy costs as a criterion — bilateral standard ✓ → **+1 adjustment**

**D4 Score: 5**
*Note: Cited market comparables, asked the landlord to distinguish cost-based from market-based pricing, and used the landlord's vacancy costs bilaterally.*

---

### D5 — BATNA Awareness

Frequency: 3/15 = **0.20** · Ratio: 3/3 = **1.0**
Threshold: frequency ≥ 0.15, ratio = 1.0 → **High → starting score 5 (requires confirmation)**

Score 5 confirmation:
1. BATNA after prior interest exploration? Units 3 and 7 precede Unit 10 ✓
2. Framed as honest transparency? Unit 10: "That's not me posturing" ✓
3. Continued interest exploration after BATNA signal? Unit 13 (APRI) follows Unit 10 ✓
4. Awareness of counterpart's BATNA? Unit 12 considers what happens to the landlord without agreement ✓

All four criteria met. No adjustment needed.

**D5 Score: 5**
*Note: BATNA disclosed multiple times in honest framing after rapport established. Used vacancy cost as the counterpart's BATNA mirror.*

---

### Composite Score

| Dimension | Score |
|---|---|
| D1 — Separate People | 5 |
| D2 — Interests Not Positions | 5 |
| D3 — Invent Options | 1 (Not Demonstrated) |
| D4 — Objective Criteria | 5 |
| D5 — BATNA Awareness | 5 |
| **Total** | **21 / 25** |
| **Band** | **Proficient** |

**Flag:** D3 Not Demonstrated — participant made no offers or proposals. Clear development priority for Round 2.

---

*This document should be read alongside `coding_instruction_readable.md`, which describes how raw transcripts are segmented and coded before scoring begins.*
