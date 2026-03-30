# Document 2: Scoring Rubric
## AI Negotiation Simulator — Behavioral Quality Assessment

**Version 1.2**
**Theoretical basis:** Getting to Yes (Fisher, Ury & Patton, 1981) + Smolinski & Xiong (2020) Negotiation Competency Model
**Input:** Coding Output from Document 1 v1.2
**Applies to:** Salary negotiation and apartment rent negotiation transcripts
**Scorer:** AI analyst (Claude Sonnet 4.6)

**Changes from v1.1:**
- Section 4: REJO removed from D2 negative indicators — reclassified as Neutral (v1.2). Rejecting an offer is a normal negotiation act; penalizing it artificially deflated D2 ratios for participants who both explored interests and made offer exchanges.
- Section 4: Score 1 behavioral description updated — REJO removed from the pattern description of a purely positional transcript

**Changes from v1.0:**
- Section 3: D1 threshold table made non-overlapping; qualitative adjustment criteria made explicit
- Section 4: D2 threshold table made non-overlapping; qualitative adjustment criteria made explicit
- Section 5: D3 threshold table made non-overlapping; added supplementary indicator adjustment rule
- Section 6: D4 threshold table confirmed non-overlapping (no change needed); qualitative adjustment criteria already explicit
- Section 7: D5 threshold table made non-overlapping; qualitative adjustment criteria made explicit
- Section 8: Composite score band numeric ranges added explicitly
- Section 10: Worked example updated to reflect v1.1 threshold tables

---

## Section 1 — Scoring Architecture

### 1.1 Overview

Scoring converts the coded transcript output from Document 1 into five dimension scores and one composite score. Each dimension corresponds to one of the five core principles from Getting to Yes. Scores are used to measure improvement between Round 1 and Round 2.

The scoring system uses two interlocking scales, following Smolinski & Xiong (2020):

- **A 5-point numeric scale** (1 through 5) for each dimension, enabling fine-grained measurement of improvement within and across levels
- **Three behavioral level descriptions** (Low, Mid, High) that anchor the numeric scale to observable behavior patterns

The relationship between the two scales is:

| Numeric Score | Behavioral Level | Meaning |
|---|---|---|
| 1 | Low | Dimension largely absent or consistently violated |
| 2 | Low-Mid boundary | Dimension attempted but rarely or ineffectively |
| 3 | Mid | Dimension present but inconsistent; mixed with contrary behaviors |
| 4 | Mid-High boundary | Dimension present consistently; occasional gaps |
| 5 | High | Dimension demonstrated consistently and strategically throughout |

### 1.2 What the Numeric Score Captures

The three behavioral levels define **qualitative zones**. The 5-point scale captures **position within and between those zones**. This distinction is critical for measuring improvement:

- A learner who moves from score 1 to score 2 has improved, even though both are in the Low zone
- A learner who moves from score 2 to score 3 has crossed a zone boundary — a more significant improvement
- Most early-round learners will score in the 1–3 range; scores of 4–5 reflect skilled negotiation behavior

The primary improvement signal is the **delta** between Round 1 and Round 2 scores. Even a delta of +1 on any dimension is meaningful evidence of behavioral change.

### 1.3 Input Requirements

Before scoring, confirm the Document 1 output contains:

- Scoreable user unit count (total user units minus SHRT units)
- Per-dimension frequency signals (positive units / scoreable user units)
- Per-dimension ratio signals (positive units / (positive + negative units))
- List of unit numbers contributing to each dimension
- D3 supplementary indicator units (if any)

If the scoreable user unit count is fewer than 5, flag the transcript as **too short to score reliably** and do not produce dimension scores. Report this as a data quality issue.

### 1.4 Scoring Sequence

Score dimensions in this order:

1. Separate People from Problem
2. Interests Not Positions
3. Invent Options for Mutual Gain
4. Objective Criteria
5. BATNA Awareness
6. Composite Score

---

## Section 2 — Zero Evidence Rule

### 2.1 When a Dimension Has No Evidence

Some dimensions — particularly Invent Options for Mutual Gain — may show zero positive and zero negative coded units. This is common in Round 1 transcripts from less experienced negotiators. Zero evidence means the user neither demonstrated nor violated the dimension.

**Apply the following rule:**

If a dimension has zero positive units AND zero negative units:
- Assign a score of **1**
- Flag it as **"Not Demonstrated"** rather than "Absent" or "Poor"
- Do not use the word "failed" in any output
- Note it as a priority development area for Round 2

**Rationale:** A score of 1 for Not Demonstrated is appropriate because the dimension was not engaged with. This is distinct from a score of 2 (attempted but ineffective) or a score of 1 earned through active violation (many negative units). The flag preserves this distinction in the output.

**Exception — BATNA Awareness:** BATNA Awareness scores 2 (not 1) when not demonstrated. See Section 7.3 for the rationale.

### 2.2 When a Dimension Has Only Negative Evidence

If a dimension has zero positive units and one or more negative units, the user actively moved against that dimension. Score as:
- 1 negative unit → score **1**, flag as "Violated"
- 2+ negative units → score **1**, flag as "Consistently Violated"

### 2.3 Ratio Calculation When Denominator Is Zero

If a dimension has positive units but zero negative units, the ratio is 1.0 (perfect positive ratio). This is not uncommon and is a good signal.

If a dimension has zero total units, the ratio is undefined. Do not attempt to calculate it. Apply the Zero Evidence Rule above.

---

## Section 3 — Dimension 1: Separate People from Problem

### 3.1 Definition

The Getting to Yes principle: negotiators should address the substantive issues of the negotiation separately from the relationship with the other party. A skilled negotiator treats the counterpart as a fellow problem-solver, not as an adversary, and manages their own emotional responses in ways that preserve the working relationship.

### 3.2 Relevant Codes from Document 1

| Code | Indicator Direction |
|---|---|
| ACLS (Active Listening) | Positive |
| POSA (Positive Affective Reaction) | Positive |
| ENCO (Encouragement) | Positive |
| PREL (Positive Relationship Remark) | Positive |
| CLAR (Clarification) | Positive |
| APOL (Apologizing) | Positive |
| NEGA (Negative Affective Reaction) | Negative |
| NREL (Negative Relationship Remark) | Negative |

### 3.3 Signal Thresholds

Calculate the following from the Document 1 output:

- **Frequency** = positive Separate People units / scoreable user units
- **Ratio** = positive units / (positive + negative units)

The threshold zones below are mutually exclusive. Locate the first zone whose conditions are fully satisfied.

| Zone | Frequency | Ratio | Starting Score |
|---|---|---|---|
| Low | < 0.10 | Any, OR ratio < 0.50 | 1 |
| Low-Mid | 0.10–0.14 | ≥ 0.50 | 2 |
| Mid | 0.15–0.24 | 0.50–0.84 | 3 |
| Mid-High | 0.15–0.24 | ≥ 0.85 | 4 |
| High | ≥ 0.25 | ≥ 0.85 | 5 |

**Tie-breaking rule:** If frequency and ratio conditions point to different zones, use the lower zone as the starting score and apply the qualitative adjustment in Section 3.4.

**Adjustment rule:** After identifying the starting score, apply the qualitative check in Section 3.4. Adjust up or down by **1 point maximum**. Never adjust by more than 1 point.

### 3.4 Qualitative Adjustment Criteria

After identifying the starting score from thresholds, apply the following checklist. Each criterion that is met triggers a potential +1 or −1 adjustment. Apply only the single largest adjustment — do not stack.

**+1 adjustment triggers (apply the first that is met):**
- Positive socio-emotional behaviors are distributed across early, middle, AND late turns of the transcript (not concentrated in one phase)
- User demonstrated constructive tone under pressure — maintained warm or neutral tone after the counterpart rejected their position, delayed a decision, or avoided answering

**−1 adjustment triggers (apply the first that is met):**
- Positive codes appear only in the opening turn and are absent from the rest of the transcript
- The positive codes present are formulaic openers ("thanks for meeting with me") without any genuine relational engagement in the substantive turns

### 3.5 Behavioral Level Descriptions

#### Low (Score 1–2)

The user treats the negotiation as adversarial. The counterpart is framed as an obstacle rather than a fellow problem-solver. Observable patterns include:

- Expressing frustration, disappointment, or irritation about the counterpart's position or behavior (NEGA units present)
- Making negative remarks about the counterpart's motives or character (NREL units present)
- No acknowledgment of the counterpart's perspective, constraints, or reasoning
- Transactional tone throughout — purely focused on numbers with no relational acknowledgment
- When the counterpart makes a concession or shows goodwill, no recognition of it

**Score 1 specific:** Multiple NEGA or NREL units present, OR zero socio-emotional positive units across the entire transcript.

**Score 2 specific:** One or two isolated POSA, ENCO, or ACLS units present but surrounded by predominantly transactional or adversarial behavior. The positive units feel formulaic rather than genuine.

**Salary scenario indicators of Low:** Framing the employer as withholding or unfair; expressing frustration at the budget constraint without acknowledging its legitimacy; no acknowledgment of the employer's perspective on the hire.

**Rent scenario indicators of Low:** Framing the landlord as greedy or exploitative; expressing anger at the rent increase without acknowledging cost pressures; no recognition of the landlord's legitimate interest in covering expenses.

#### Mid (Score 3)

The user maintains a reasonably constructive tone but does not actively invest in the relationship. Observable patterns include:

- Generally polite and professional without being warm
- Acknowledges the counterpart's statements when they are reasonable (some ACLS present)
- No negative relationship remarks or expressions of frustration
- Occasional positive affective language but not sustained
- The relationship dimension is present but not used as a resource — the user does not leverage the relationship to advance problem-solving

**Score 3 specific:** Frequency between 0.15 and 0.24, ratio between 0.50 and 0.84. Positive codes are present but feel procedural rather than strategic.

#### High (Score 4–5)

The user actively uses the relationship as a tool for collaborative problem-solving. Observable patterns include:

- Consistently acknowledges and reflects back the counterpart's reasoning (ACLS appears multiple times across the transcript, not just once)
- Explicitly names shared interests or the shared goal of reaching an agreement (PREL present)
- Encourages the counterpart's reasoning even when disagreeing with their position (ENCO present alongside REJO or SUBS)
- Maintains constructive tone even when the negotiation is difficult or the counterpart is resistant
- Uses relationship assets (tenure, history, shared context) as legitimate objective criteria rather than emotional appeals

**Score 4 specific:** High frequency with high ratio, but positive socio-emotional behavior is concentrated in one part of the transcript rather than distributed throughout.

**Score 5 specific:** Positive socio-emotional behavior is distributed across early, middle, and late turns of the transcript. The user demonstrates it under pressure — for example, remaining warm and acknowledging after the counterpart rejects their position or delays a decision.

**Salary scenario indicators of High:** Explicitly noting the desire for a long-term working relationship; acknowledging the employer's budget constraints as legitimate before making arguments; expressing that the negotiation is about fit and mutual benefit, not just compensation.

**Rent scenario indicators of High:** Referencing tenure history as shared context rather than leverage; acknowledging the landlord's cost increases as real before arguing about the number; framing the conversation as finding a mutual solution rather than winning a dispute.

---

## Section 4 — Dimension 2: Interests Not Positions

### 4.1 Definition

The Getting to Yes principle: negotiators should focus on the underlying interests, needs, and concerns that motivate each party's position, rather than arguing about positions themselves. A skilled negotiator explores why the counterpart wants what they want, discloses their own interests, and uses interest information to find solutions that satisfy underlying needs rather than just splitting differences.

### 4.2 Relevant Codes from Document 1

| Code | Indicator Direction |
|---|---|
| APRI (Asking for Priority-Related Information) | Positive |
| PPRI (Providing Priority-Related Information) | Positive |
| APFI (Asking for Preference-Related Information) | Positive |
| PPFI (Providing Preference-Related Information) | Positive |
| EXTQ (Extension Questions) | Positive |
| PPOS (Providing Positional Information) | Negative |
| APOS (Asking for Positional Information) | Negative |
| REJO (Rejecting Offer) | Neutral — removed from D2 calculation (v1.2: rejecting an offer is a normal negotiation act, not inherently positional) |
| ROM (Requesting Offer Modification) | Negative |
| AVOI (Avoiding) | Negative |

### 4.3 Signal Thresholds

- **Frequency** = positive Interests Not Positions units / scoreable user units
- **Ratio** = positive units / (positive + negative units)

The threshold zones below are mutually exclusive. Locate the first zone whose conditions are fully satisfied.

| Zone | Frequency | Ratio | Starting Score |
|---|---|---|---|
| Low | < 0.10 | < 0.40 | 1 |
| Low-Mid | < 0.10 | ≥ 0.40 | 2 |
| Low-Mid (alt) | 0.10–0.14 | Any | 2 |
| Mid | 0.15–0.24 | 0.40–0.74 | 3 |
| Mid-High | 0.15–0.24 | ≥ 0.75 | 4 |
| High | ≥ 0.25 | ≥ 0.75 | 5 |

**Note on ratio thresholds:** This dimension is harder to score high on than Separate People from Problem because every offer, counter-offer, and rejection counts as a negative indicator. A ratio of 0.75 is strong performance for this dimension — do not penalize users for making offers, which are a necessary part of negotiation.

**Tie-breaking rule:** If frequency and ratio conditions point to different zones, use the lower zone and apply the qualitative adjustment.

**Adjustment rule:** After identifying the starting score, apply the qualitative check in Section 4.4. Adjust up or down by **1 point maximum**.

### 4.4 Qualitative Adjustment Criteria

**+1 adjustment triggers (apply the first that is met):**
- Interest exploration occurs at multiple distinct points in the transcript — not only the opening turn but also mid-transcript after offers have been made
- The user demonstrably uses interest information gathered earlier to frame a later argument or proposal (the connection must be explicit in the transcript, not inferred)

**−1 adjustment triggers (apply the first that is met):**
- Interest exploration is limited to one early question that is never returned to; the rest of the transcript is purely positional
- The user asks about interests but immediately follows up with a positional demand in the same turn, suggesting the interest question was rhetorical rather than genuine

### 4.5 Behavioral Level Descriptions

#### Low (Score 1–2)

The user negotiates almost entirely in positional terms. Observable patterns include:

- States demands and positions repeatedly without explaining the needs behind them
- When asked about their interests, responds with a position instead (AVOI present)
- Does not ask why the counterpart wants what they want — treats the counterpart's position as the problem to overcome
- Primary strategy is making offers, counter-offers, and rejections with no interest exploration
- If interests are mentioned at all, they are stated once and then abandoned in favor of positional exchange

**Score 1 specific:** Zero APRI/PPRI/APFI/PPFI units. The entire negotiation is conducted through SIA, PPOS, and ROM. The user never asks "why" or explains "why" in terms of underlying needs.

**Score 2 specific:** One or two APRI or PPRI units appear, but they are isolated early in the transcript and the user reverts to positional behavior immediately after. The interest language does not influence the subsequent negotiation trajectory.

**Salary scenario indicators of Low:** Repeating a salary number without explaining what the number needs to achieve; not asking what the employer cares about in the role; treating budget constraints as arbitrary obstacles rather than real needs to understand.

**Rent scenario indicators of Low:** Repeating a maximum rent without explaining housing needs or constraints; not asking what the landlord needs the rent to cover; treating the rent increase as a negotiating position rather than a problem with underlying causes.

#### Mid (Score 3)

The user engages in some interest exploration but reverts to positional behavior under pressure. Observable patterns include:

- Asks about the counterpart's interests at least once, typically early in the negotiation
- Discloses some own interests but not comprehensively
- Interest exploration tends to occur at the opening of the negotiation and then gives way to positional exchange in the middle and closing phases
- When the counterpart states a position, the user responds with a counter-position rather than probing the interest behind it
- Interest information that is gathered is not obviously used to generate options or find solutions

**Score 3 specific:** APRI or PPRI present (frequency 0.15–0.24), but the ratio of positive to negative units is mixed (0.40–0.74) because offer-making and position-stating dominate the middle and late transcript.

#### High (Score 4–5)

Interest exploration is a consistent strategy throughout the negotiation, not just an opening move. Observable patterns include:

- Asks about the counterpart's interests at multiple points in the negotiation, including after positions are stated (not just at the opening)
- Discloses own interests proactively and connects them to the substantive issues
- When the counterpart states a position, responds with curiosity about the interest behind it rather than a counter-position
- Uses interest information gathered earlier in the conversation to frame later proposals
- Explicitly names shared or compatible interests when they appear
- Reframes positional impasses as interest problems to be solved

**Score 4 specific:** Consistent interest exploration with high ratio, but interest information is disclosed and gathered without being visibly used to generate options or reframe the problem.

**Score 5 specific:** Interest exploration drives the negotiation structure. The user demonstrably uses interest information gathered from the counterpart to shape their proposals and arguments. Interests are referenced across early, middle, and late transcript segments.

**Salary scenario indicators of High:** Asking what the employer values most in the role before proposing a number; explaining that the salary need reflects cost of living, career stage, or competing market options; using the employer's interest in retention or role fit to frame the compensation argument.

**Rent scenario indicators of High:** Asking what the landlord's actual cost floor is before responding to the proposed increase; explaining that the rent ceiling reflects income constraints or housing stability needs; using the landlord's interest in avoiding vacancy to frame the argument for a lower number.

---

## Section 5 — Dimension 3: Invent Options for Mutual Gain

### 5.1 Definition

The Getting to Yes principle: negotiators should generate a variety of possible agreements before deciding on one. A skilled negotiator does not treat the negotiation as a choice between their position and the counterpart's position, but instead creates new options — packages, trades, contingencies — that make more value available for both parties.

### 5.2 Relevant Codes from Document 1

**Primary indicators:**

| Code | Indicator Direction |
|---|---|
| MIA (Multi-Issue Activity) | Positive (Primary) |
| SIA (Single-Issue Activity) | Negative |
| ACCO (accepting a MIA package) | Positive (conditional) |

**Supplementary indicators (from Document 1 v1.2 Annotation 3):**

| Code | When Counted as D3 Supplementary |
|---|---|
| PPFI | When expressing preference involves bundling across multiple issues |
| APFI | When question directly probes whether a multi-issue package is possible |
| EXTQ | When question is directed at uncovering additional negotiable dimensions |

**Note on ACCO:** ACCO is only counted as a positive indicator when the accepted offer is a MIA. If the user accepts a SIA, ACCO is neutral for this dimension.

**Note on SIA:** SIA is a negative indicator because single-issue bargaining forecloses option generation. However, SIA is a necessary part of negotiation and its presence alone does not indicate poor performance. The ratio of MIA to SIA is the key signal.

### 5.3 Signal Thresholds

- **MIA Frequency** = MIA units / scoreable user units
- **MIA Ratio** = MIA units / (MIA + SIA units)

The threshold zones below are mutually exclusive and based on MIA frequency and ratio only. Supplementary indicators are used only for the qualitative adjustment, not for threshold calculation.

| Zone | MIA Frequency | MIA Ratio | Starting Score |
|---|---|---|---|
| Not Demonstrated | 0 MIA, 0 SIA | N/A | 1 (flag: Not Demonstrated) |
| Single-Issue Only | 0 MIA, ≥ 1 SIA | 0.0 | 1 (flag: Single-Issue Only) |
| Low-Mid | > 0 MIA, frequency < 0.07 | < 0.30 | 2 |
| Mid | MIA frequency 0.07–0.13 | Any, OR ratio 0.30–0.59 with frequency < 0.07 | 3 |
| Mid-High | MIA frequency 0.07–0.14 | ≥ 0.60 | 4 |
| High | MIA frequency ≥ 0.15 | ≥ 0.80 | 5 |

**Note:** This dimension has lower frequency thresholds than others because MIA is a cognitively demanding behavior that even skilled negotiators deploy selectively. A single well-constructed MIA is more meaningful than several low-quality SIAs.

**Tie-breaking rule:** If MIA frequency and ratio conditions point to different zones, use the lower zone and apply the qualitative adjustment.

**Adjustment rule:** After identifying the starting score, apply the qualitative check in Section 5.4. Adjust up or down by **1 point maximum**.

### 5.4 Qualitative Adjustment Criteria

**+1 adjustment triggers (apply the first that is met):**
- D3 supplementary indicators are present (PPFI, APFI, or EXTQ coded as D3 supplementary per Document 1 Annotation 3) — this shows the user is beginning to think in multi-issue terms even without a complete MIA
- A MIA present visibly incorporates interest information gathered earlier in the transcript — the package is designed around interests, not just bundling for its own sake

**−1 adjustment triggers (apply the first that is met):**
- All offer activity consists of SIA only with no mention of additional negotiable dimensions at any point
- The user explicitly frames the negotiation as a single-issue problem ("it's just about the number for me") — this signals resistance to option generation

**Special rule for Not Demonstrated (score 1):** If D3 supplementary indicators are present even though MIA = 0, the score remains 1 but the flag changes from "Not Demonstrated" to "Early Options Awareness." This preserves the low score while capturing the developmental signal for the debrief.

### 5.5 Behavioral Level Descriptions

#### Low (Score 1–2) — including Not Demonstrated

The user negotiates exclusively on a single dimension, treating the negotiation as a price-only problem. Observable patterns include:

- All offers are single-issue: a number, a term, a date — one thing at a time
- No attempt to bundle issues or create packages
- When an impasse occurs, the response is to make a concession on the single issue rather than introduce a new dimension
- No mention of alternative structures, contingencies, or creative arrangements
- The negotiation progresses through a sequence of single-issue offers and counter-offers narrowing toward a midpoint

**Score 1 — Not Demonstrated:** Zero offer activity at all. The user asks questions and makes arguments but never proposes anything concrete. This is unusual and may indicate avoidance of commitment. If D3 supplementary indicators are present, flag as "Early Options Awareness" instead.

**Score 1 — Single-Issue Only:** The user makes offers but every offer addresses only one issue. No evidence of multi-issue thinking at any point.

**Score 2 specific:** One mention of a potential alternative structure or additional issue, or D3 supplementary indicators present showing nascent multi-issue awareness, but no concrete MIA proposal constructed.

**Salary scenario indicators of Low:** Only negotiating base salary; never mentioning bonus, equity, start date, title, PTO, remote work, or other negotiable dimensions; responding to every counter-offer with a single revised number.

**Rent scenario indicators of Low:** Only negotiating the monthly price; never mentioning lease length, maintenance responsibilities, move-in terms, parking, or other negotiable dimensions; responding to every counter-offer with a single revised number.

#### Mid (Score 3)

The user introduces multi-issue thinking but does not fully develop it into concrete packages. Observable patterns include:

- Mentions one or more additional negotiable dimensions beyond price
- May ask whether other terms could be part of the discussion
- Does not construct a complete multi-issue proposal in most cases
- If a MIA is made, it is typically a simple two-issue package
- The multi-issue thinking is reactive rather than proactive — introduced when single-issue negotiation hits a wall rather than as an opening strategy

**Score 3 specific:** One MIA present, or two or more D3 supplementary indicators with mention of additional issues. The user demonstrates awareness that multiple issues exist but does not consistently leverage them.

#### High (Score 4–5)

The user proactively creates value by constructing and proposing multi-issue packages. Observable patterns include:

- Introduces multiple negotiable dimensions explicitly and uses them to build packages
- Makes at least two MIA proposals during the negotiation
- When an impasse occurs, responds by repackaging rather than conceding on a single issue
- The packages are designed around interests — they trade things the user values less for things they value more
- May explicitly invite the counterpart to identify what combinations work for them (APFI directed at package construction)

**Score 4 specific:** Two or more MIA units present, but the packages are simple (two issues) and the user does not demonstrate explicit trade-off reasoning.

**Score 5 specific:** The user constructs packages that visibly reflect interest information gathered earlier in the transcript. Trade-offs are explained in terms of relative value to each party. The negotiation is genuinely integrative — the user is trying to enlarge the agreement rather than just split the difference.

**Salary scenario indicators of High:** Proposing a base-plus-bonus structure; offering to start on a specific date in exchange for a signing bonus; suggesting a six-month review with a guaranteed raise trigger; bundling title, base, and equity into a total compensation package.

**Rent scenario indicators of High:** Proposing a lower monthly rate in exchange for a longer lease; offering to handle minor repairs in exchange for rent stability; suggesting a phased increase schedule; bundling rent, parking, and maintenance terms into a single package proposal.

---

## Section 6 — Dimension 4: Objective Criteria

### 6.1 Definition

The Getting to Yes principle: when interests conflict, negotiators should resolve disagreements by reference to fair external standards rather than by force of will or positional pressure. A skilled negotiator identifies legitimate criteria that both parties can accept — market rates, precedent, professional standards, costs — and uses them to justify their own positions and to challenge the counterpart's positions.

### 6.2 Relevant Codes from Document 1

| Code | Indicator Direction |
|---|---|
| SUBS (Substantiation with external reference) | Positive |
| FACT (Facts and Additional Information) | Positive |
| ASUB (Asking for Substantiation) | Positive |

**Note on SUBS:** Not all Substantiation qualifies as Objective Criteria use. SUBS earns a positive indicator for this dimension only when it references an external standard, market data, precedent, or the counterpart's own interests as a criterion. SUBS that is purely self-referential ("I need this because it's important to me") does not qualify and should be marked as SUBS but not counted toward Objective Criteria.

**Qualification rule for SUBS:** When you encounter a SUBS unit, ask: does this substantiation reference something outside the speaker's own preferences or needs? If yes, count it. If no, exclude it from the Objective Criteria count but keep the SUBS code.

### 6.3 Signal Thresholds

- **Frequency** = qualifying positive Objective Criteria units / scoreable user units
- **No ratio calculation** — this dimension has no negative codes. Low scores come from low frequency only.

The threshold zones below are mutually exclusive.

| Zone | Frequency | Starting Score |
|---|---|---|
| Not Demonstrated | 0 qualifying units | 1 (flag: Not Demonstrated) |
| Low | 0.01–0.09 | 2 |
| Mid | 0.10–0.19 | 3 |
| Mid-High | 0.20–0.29 | 4 |
| High | ≥ 0.30 | 5 |

**Adjustment rule:** After applying frequency thresholds, apply the qualitative check in Section 6.4. Adjust up or down by **1 point maximum**.

### 6.4 Qualitative Adjustment Criteria

**+1 adjustment triggers (apply the first that is met):**
- At least one SUBS unit explicitly uses the counterpart's own interests or costs as a criterion — demonstrating bilateral use of standards that both parties can accept (e.g., using vacancy costs as a standard the landlord should weigh, or using the employer's retention interest as a criterion)

**−1 adjustment triggers (apply the first that is met):**
- All SUBS and FACT units reference only a single type of criterion (e.g., only market comps, with no reference to costs, precedent, or the counterpart's interests). Reliance on a single criterion type is weaker than a multi-standard approach.

### 6.5 Behavioral Level Descriptions

#### Low (Score 1–2)

The user makes arguments based on assertion, preference, or need rather than external standards. Observable patterns include:

- Positions are stated but not justified with external reference points
- When challenged on a position, the response is to restate it or make a concession rather than provide evidence
- No reference to market rates, comparables, precedent, costs, or professional standards
- Does not ask the counterpart to justify their position with evidence (no ASUB)
- Treats the negotiation as a contest of preferences rather than a problem with an objectively better solution

**Score 1 — Not Demonstrated:** Zero SUBS, FACT, or ASUB units. No attempt at any form of reasoning or justification beyond stating positions and needs.

**Score 2 specific:** One or two FACT or SUBS units present, but they are vague or self-referential. For example: "I think the market supports my number" without citing any specific data.

**Salary scenario indicators of Low:** Asking for $95,000 without citing salary surveys, competing offers, or market benchmarks; not asking the employer how they determined the budget figure; justifying the ask only by reference to personal need or tenure.

**Rent scenario indicators of Low:** Refusing $2,400 without citing comparable listings, neighborhood trends, or cost data; not asking the landlord how they calculated the new rate; justifying resistance only by reference to personal budget constraints.

#### Mid (Score 3)

The user introduces some objective criteria but does not use them systematically. Observable patterns include:

- References at least one external standard (market rate, comparable, cost data)
- The reference is specific enough to be meaningful — a range or a source, not just a vague appeal to "the market"
- Does not consistently ask the counterpart to meet the same standard
- Objective criteria are used defensively (to resist the counterpart's position) more than offensively (to propose a fair framework for resolution)
- Does not attempt to identify criteria that both parties can accept — uses criteria primarily to support own position

**Score 3 specific:** One or two qualifying SUBS/FACT units with specific data, and possibly one ASUB. The user demonstrates awareness of objective criteria as a concept but does not make it the organizing logic of the negotiation.

#### High (Score 4–5)

Objective criteria are the primary framework through which the user argues. Observable patterns include:

- References multiple types of external standards across the transcript
- Cites specific data rather than general appeals ("$2,100 to $2,200 per Zillow listings in this zip code" rather than "other apartments are cheaper")
- Asks the counterpart to justify their position with external evidence (ASUB present)
- Identifies or proposes criteria that both parties can accept as fair, not just criteria that favor the user
- Uses the counterpart's own interests and costs as objective standards (e.g., cost of vacancy, cost of a long search, cost of training a new hire)
- When the counterpart challenges a criterion, responds with a different criterion rather than abandoning the framework

**Score 4 specific:** Multiple qualifying units with specific data, ASUB present. The user uses criteria consistently but primarily to support their own position.

**Score 5 specific:** The user uses criteria bilaterally — applying them to evaluate both their own position and the counterpart's position. The user explicitly proposes a fair standard or identifies criteria grounded in the counterpart's own interests. The negotiation has an evidential structure.

**Salary scenario indicators of High:** Citing a specific salary survey with a range; asking how the employer determined the budget and what benchmark they used; referencing the cost of a long search or a bad hire as a criterion; proposing that market rate should govern both parties' positions.

**Rent scenario indicators of High:** Citing specific comparable listings with a price range; asking what cost inputs the landlord used to calculate $2,400; using the cost of vacancy and turnover as a criterion the landlord should weigh; proposing that neighborhood market rate should govern both parties' expectations.

---

## Section 7 — Dimension 5: BATNA Awareness

### 7.1 Definition

The Getting to Yes principle: negotiators should know their Best Alternative to a Negotiated Agreement — what they will do if no agreement is reached — and use that knowledge to negotiate from a position of genuine security rather than anxiety. A skilled negotiator knows their BATNA, knows the counterpart's BATNA, communicates their own BATNA honestly when appropriate, and avoids both ignoring their BATNA (accepting bad deals) and weaponizing it (using it as a threat that damages the relationship).

### 7.2 Relevant Codes from Document 1

BATNA Awareness is scored primarily through PCOM units that have been classified as BATNA-relevant per the Section 4 annotation rules in Document 1. Additionally:

| Code | Indicator Direction |
|---|---|
| PCOM — BATNA Positive (explicit alternative + prior interest exploration) | Positive |
| PCOM — BATNA Negative (threat without alternative, or no prior exploration) | Negative |
| PPRI units that reference alternatives or outside options | Positive |
| APOS when used to probe counterpart's alternatives | Positive |

**Note:** BATNA Awareness is the most context-dependent dimension. It cannot be scored purely by counting codes. Section 7.3 provides the threshold framework but Section 7.4 qualitative descriptions carry more weight for this dimension than for others. When frequency/ratio signals and qualitative descriptions conflict, defer to the qualitative description.

### 7.3 Signal Thresholds

- **Frequency** = positive BATNA units / scoreable user units
- **Ratio** = positive BATNA units / (positive + negative BATNA units)

The threshold zones below are mutually exclusive.

| Zone | Frequency | Ratio | Starting Score |
|---|---|---|---|
| Not Demonstrated | 0 BATNA units of any kind | N/A | 2 (see note) |
| Low | Any BATNA units | < 0.40 | 1 |
| Low-Mid | < 0.10 | 0.40–0.69 | 2 |
| Mid | 0.10–0.14 | 0.70–0.84 | 3 |
| Mid-High | 0.10–0.24 | ≥ 0.85 | 4 |
| High | ≥ 0.15 | 1.0 | 5 (subject to qualitative confirmation) |

**Note on Not Demonstrated score of 2:** Unlike other dimensions where zero evidence scores 1, BATNA Awareness scores 2 when not demonstrated. Absence of BATNA communication is not necessarily poor negotiating — in some transcripts, especially short ones, a user may simply not have reached the point where BATNA becomes relevant. Score 2 reflects this ambiguity. Score 1 is reserved for active misuse of BATNA (threats, ultimatums, or BATNA-negative PCOM units present).

**Tie-breaking rule:** If frequency and ratio conditions point to different zones, use the lower zone and apply the qualitative adjustment.

**Adjustment rule:** After identifying the starting score, apply the qualitative check in Section 7.4. Adjust up or down by **1 point maximum**. For High zone (starting score 5), qualitative confirmation is required — do not confirm score 5 without checking the qualitative criteria below.

### 7.4 Qualitative Adjustment Criteria

**+1 adjustment triggers (apply the first that is met):**
- BATNA signals are distributed across the transcript (not all clustered in one phase) AND each signal is framed as honest information rather than threat language
- User explicitly connected their BATNA to the counterpart's interests — made clear that no agreement has costs for both parties, not just themselves

**−1 adjustment triggers (apply the first that is met):**
- BATNA was communicated only once, very early in the negotiation, before any interest exploration — suggests it was used as an opening pressure tactic rather than genuine information
- BATNA language is threatening or aggressive even if technically meeting the frequency threshold

**Qualitative confirmation required for Score 5:** All of the following must be true. If any criterion is absent, score is capped at 4.
- BATNA communicated after prior interest exploration (not as opening move)
- BATNA framed as honest transparency, explicitly distinguished from posturing
- User continued interest exploration or option generation after signaling BATNA (did not rely on BATNA as the only strategy)
- User showed awareness of the counterpart's BATNA — what they will do if no agreement is reached

### 7.5 Behavioral Level Descriptions

#### Low (Score 1–2)

The user either ignores their BATNA entirely or misuses it as a threat.

**Ignoring BATNA (score 2):**
- No reference to outside alternatives at any point
- User appears to negotiate from anxiety — making excessive concessions, accepting terms that seem unfavorable without resistance
- Positional commitments appear without grounding in a genuine alternative ("I can't go above X" with no explanation of what happens if no agreement is reached)
- No signal that the user has thought about what they will do if the negotiation fails

**Misusing BATNA as threat (score 1):**
- BATNA communicated as an ultimatum: "Accept my terms or I walk"
- Alternative is introduced to pressure the counterpart rather than to honestly signal the user's constraint
- No prior interest exploration before the BATNA signal
- BATNA communication damages the relationship rather than informing it
- Counterpart is given no opportunity to respond constructively to the BATNA signal

**Salary scenario indicators of Low — Ignoring:** Making concessions down to a number that is below market rate without resistance; never mentioning the competing offer even when it is part of the scenario setup; accepting the first offer without exploring alternatives.

**Salary scenario indicators of Low — Threat:** "I have another offer at $92,000 and if you can't match it I'm gone" as an opening statement before any interest exploration.

**Rent scenario indicators of Low — Ignoring:** Accepting $2,400 after minimal resistance; not mentioning that other apartments are available; allowing the landlord to frame the decision entirely.

**Rent scenario indicators of Low — Threat:** "I've found three other places for $2,100. Take it or leave it" without prior relationship acknowledgment or interest exploration.

#### Mid (Score 3)

The user demonstrates awareness of their BATNA but does not use it skillfully. Observable patterns include:

- Mentions an outside alternative at some point in the negotiation
- The mention is honest — it reflects a real alternative rather than a bluff
- Timing is suboptimal — either too early (before relationship is established) or too late (after the negotiation has already narrowed to a number)
- BATNA is mentioned once and then not referenced again, rather than being woven into the negotiation logic
- The user does not explicitly connect their BATNA to the stakes of the decision for the counterpart
- Framing is adequate but not strategic — the alternative is disclosed but not used to shift the negotiation framework

**Score 3 specific:** One PCOM unit classified as BATNA Positive. The user mentions their alternative honestly but does not use it to set the terms of the negotiation.

#### High (Score 4–5)

The user uses BATNA awareness as a structural element of the negotiation strategy. Observable patterns include:

- Communicates their BATNA honestly and transparently, not as a threat
- Times the BATNA signal appropriately — after interest exploration and relationship establishment, not as an opening move
- Uses BATNA to clarify the decision the counterpart faces, not to pressure them
- Connects the BATNA to the counterpart's interests — making clear that no agreement has costs for both parties
- Does not over-rely on the BATNA — returns to interest exploration and option generation after signaling it
- Shows curiosity about the counterpart's BATNA — what they will do if no agreement is reached

**Score 4 specific:** Multiple PCOM units classified as BATNA Positive, distributed across the transcript. The user's BATNA is clearly established and consistently informing their negotiating stance without dominating it.

**Score 5 specific:** All of the above, plus the user explicitly connects their BATNA to the interests of both parties. The BATNA is used as a criterion for evaluating proposed agreements, not just as a limit or a threat.

**Salary scenario indicators of High:** Mentioning the competing offer after establishing rapport and exploring interests; framing it as context for the decision rather than leverage; using the cost of a long search as a counterpart BATNA consideration.

**Rent scenario indicators of High:** Mentioning alternative apartments after acknowledging the landlord's cost constraints; framing it honestly; using the cost of vacancy as the counterpart's BATNA consideration.

---

## Section 8 — Composite Score

### 8.1 Calculation

The composite score is the sum of the five dimension scores.

```
Composite Score = D1 + D2 + D3 + D4 + D5

Where:
D1 = Separate People from Problem (1–5)
D2 = Interests Not Positions (1–5)
D3 = Invent Options for Mutual Gain (1–5)
D4 = Objective Criteria (1–5)
D5 = BATNA Awareness (1–5)

Range: 5 (minimum) to 25 (maximum)
```

### 8.2 Score Interpretation Bands

| Composite Score | Band | Interpretation |
|---|---|---|
| 5–8 | Early stage | Negotiation is primarily positional with limited principled behavior |
| 9–12 | Developing | Some principled behaviors present but inconsistent |
| 13–17 | Intermediate | Principled behaviors present across most dimensions |
| 18–21 | Proficient | Consistent principled behavior with some dimensions at high level |
| 22–25 | Advanced | Principled negotiation demonstrated consistently across all dimensions |

### 8.3 Improvement Delta

The primary research measure is the improvement delta between Round 1 and Round 2.

```
Overall Delta = Round 2 Composite Score − Round 1 Composite Score

Per-Dimension Delta = Round 2 Dimension Score − Round 1 Dimension Score
```

**Interpreting deltas:**

| Delta | Interpretation |
|---|---|
| +4 or more | Strong improvement |
| +2 to +3 | Moderate improvement |
| +1 | Marginal improvement |
| 0 | No change |
| −1 | Marginal regression |
| −2 or less | Regression (flag for review) |

**Note on regression:** A negative delta does not necessarily indicate that learning did not occur. Scenario difficulty, negotiation partner behavior, and transcript length can all affect scores. Flag regressions but do not treat them as definitive evidence of no learning without examining the transcript.

### 8.4 Equal Weighting Rationale

All five dimensions are weighted equally (1:1:1:1:1) in the composite score. This reflects the Getting to Yes framework, which treats all five principles as co-equal foundations of principled negotiation rather than a hierarchy. If future research indicates that certain dimensions are stronger predictors of negotiation outcomes in your specific scenarios, weighting can be adjusted as a parameter without rebuilding the rubric.

### 8.5 Cross-Scenario Consistency Note

This rubric applies to both salary and rent negotiation transcripts. The threshold values were calibrated on a rent negotiation sample. Different scenarios may produce different base rates for certain codes — for example, SUBS may appear more naturally in salary negotiations where candidates cite market surveys, and PPRI may appear more in rent negotiations where tenants have emotional ties to location.

**Recommendation:** For the primary pre/post improvement comparison, keep the scenario consistent across Round 1 and Round 2 for each participant. If participants complete different scenarios across rounds, note this as a limitation and interpret composite score deltas with caution.

---

## Section 9 — Scoring Output Format

After scoring a transcript, produce the following structured output.

```
SCORING OUTPUT

Transcript ID: [identifier]
Scenario: [Salary / Rent]
Round: [1 / 2]
Scoreable user units: [number]

DIMENSION SCORES

D1 — Separate People from Problem
  Frequency signal: [value]
  Ratio signal: [value]
  Threshold zone: [Low / Low-Mid / Mid / Mid-High / High]
  Starting score: [1–5]
  Qualitative adjustment: [+1 / None / −1] — [trigger that fired, or "none"]
  Behavioral level: [Low / Mid / High]
  Numeric score: [1–5]
  Key evidence units: [list unit numbers]
  Qualitative note: [1–2 sentences describing the dominant pattern observed]

D2 — Interests Not Positions
  Frequency signal: [value]
  Ratio signal: [value]
  Threshold zone: [Low / Low-Mid / Mid / Mid-High / High]
  Starting score: [1–5]
  Qualitative adjustment: [+1 / None / −1] — [trigger that fired, or "none"]
  Behavioral level: [Low / Mid / High]
  Numeric score: [1–5]
  Key evidence units: [list unit numbers]
  Qualitative note: [1–2 sentences]

D3 — Invent Options for Mutual Gain
  MIA frequency signal: [value]
  MIA ratio signal: [value]
  D3 supplementary indicators present: [Yes / No — list codes if Yes]
  Threshold zone: [Not Demonstrated / Single-Issue Only / Low-Mid / Mid / Mid-High / High]
  Starting score: [1–5]
  Qualitative adjustment: [+1 / None / −1] — [trigger that fired, or "none"]
  Behavioral level: [Low / Mid / High / Not Demonstrated / Early Options Awareness]
  Numeric score: [1–5]
  Key evidence units: [list unit numbers]
  Qualitative note: [1–2 sentences]

D4 — Objective Criteria
  Frequency signal: [value]
  Threshold zone: [Not Demonstrated / Low / Mid / Mid-High / High]
  Starting score: [1–5]
  Qualitative adjustment: [+1 / None / −1] — [trigger that fired, or "none"]
  Behavioral level: [Low / Mid / High / Not Demonstrated]
  Numeric score: [1–5]
  Key evidence units: [list unit numbers]
  Qualitative note: [1–2 sentences]

D5 — BATNA Awareness
  Frequency signal: [value]
  Ratio signal: [value]
  Threshold zone: [Not Demonstrated / Low / Low-Mid / Mid / Mid-High / High]
  Starting score: [1–5]
  Qualitative adjustment: [+1 / None / −1] — [trigger that fired, or "none"]
  Score 5 qualitative confirmation: [All criteria met / Not met — capped at 4]
  Behavioral level: [Low / Mid / High / Not Demonstrated]
  Numeric score: [1–5]
  Key evidence units: [list unit numbers]
  Qualitative note: [1–2 sentences]

COMPOSITE SCORE
  D1: [score]
  D2: [score]
  D3: [score]
  D4: [score]
  D5: [score]
  Total: [sum] / 25
  Band: [Early stage / Developing / Intermediate / Proficient / Advanced]

IMPROVEMENT DELTA (if Round 2)
  D1 delta: [value]
  D2 delta: [value]
  D3 delta: [value]
  D4 delta: [value]
  D5 delta: [value]
  Overall delta: [value]
  Interpretation: [Strong improvement / Moderate improvement /
                   Marginal improvement / No change / Regression]

FLAGS (if any)
  [List any flags: transcript too short, dimension not demonstrated,
   D3 early options awareness, SHRT proportion above 30%,
   regression detected, cross-scenario comparison, etc.]
```

---

## Section 10 — Worked Scoring Example

The following applies the rubric to the sample transcript from Document 1 Section 6.

**Input:** Dimension unit counts from Document 1 worked example
**Scoreable user units:** 15

---

### D1 — Separate People from Problem

Positive units: 5 (Units 2, 5, 9, 11, 15)
Negative units: 0
Frequency: 5/15 = **0.33**
Ratio: 5/(5+0) = **1.0**

Threshold lookup: Frequency ≥ 0.25, ratio ≥ 0.85 → **High zone, starting score 5**

Qualitative adjustment check:
- Are positive units distributed across early, middle, AND late turns? → Unit 2 (early), Unit 5 (mid), Units 9, 11, 15 (mid-late) → **Yes → +1 trigger met**
- Did user maintain constructive tone under pressure (after AI deflected in Unit 14)? → Unit 15 immediately follows AI avoidance and remains warm → **Yes → +1 trigger also met**
- Starting score is already 5 — adjustment cannot exceed maximum of 5. No adjustment applied.

**Qualitative adjustment: None (already at maximum). Score confirmed at 5.**

Qualitative note: User consistently acknowledged the landlord's reasoning and demonstrated goodwill across the full transcript, including after the landlord deflected questions and delayed commitment.

**D1 Score: 5**

---

### D2 — Interests Not Positions

Positive units: 3 (Units 3, 13, 23)
Negative units: 1 (Unit 18)
Frequency: 3/15 = **0.20**
Ratio: 3/(3+1) = **0.75**

Threshold lookup: Frequency 0.15–0.24, ratio ≥ 0.75 → **Mid-High zone, starting score 4**

Qualitative adjustment check:
- Does interest exploration occur at multiple distinct points, including mid-transcript? → Unit 3 (early), Unit 13 (mid, after argument), Unit 23 (late) → **Yes → +1 trigger met**
- Does user demonstrably use interest information to frame a later argument? → Unit 12 (vacancy cost argument) follows from interest exploration in Units 3 and 13 → **Yes → +1 trigger also met** (first trigger is sufficient)

**Qualitative adjustment: +1. Score adjusted to 5.**

Wait — applying cap: maximum score is 5. Starting score 4 + 1 = 5. Permitted.

Qualitative note: User asked about the counterpart's interests at multiple points and disclosed their own underlying preference, and used the landlord's interest in avoiding vacancy to construct the objective criteria argument in Unit 12.

**D2 Score: 5**

> **Note on change from v1.0:** Original worked example scored D2 at 4. Under v1.1 threshold tables, the Mid-High zone starts at frequency ≥ 0.15 with ratio ≥ 0.75 (previously the overlap between Mid and Mid-High created ambiguity at frequency 0.20). With non-overlapping zones, 0.20 / 0.75 now cleanly maps to Mid-High (starting score 4), and the qualitative adjustment lifts to 5 based on the explicit criteria.

---

### D3 — Invent Options for Mutual Gain

Primary positive units (MIA): 0
Negative units (SIA): 0
D3 Supplementary units: 0
MIA Frequency: 0
MIA Ratio: N/A

Threshold lookup: 0 MIA, 0 SIA → **Not Demonstrated zone, starting score 1**

Qualitative adjustment check:
- D3 supplementary indicators present? → No → no +1 adjustment
- User framed negotiation as single-issue? → No explicit framing, but all behavior was single-dimension → no −1 adjustment

**Qualitative adjustment: None. Score confirmed at 1 (flag: Not Demonstrated).**

Qualitative note: User did not make any concrete offers during the negotiation and did not propose any multi-issue packages. The transcript ends before the negotiation reaches an agreement phase. Priority development area for Round 2.

**D3 Score: 1 (flag: Not Demonstrated)**

---

### D4 — Objective Criteria

Qualifying positive units: 3 (Units 6 FACT, 7 ASUB, 12 SUBS)
Frequency: 3/15 = **0.20**

Threshold lookup: Frequency 0.20–0.29 → **Mid-High zone, starting score 4**

Qualitative adjustment check:
- Does any SUBS unit use the counterpart's own interests as a criterion? → Unit 12 (vacancy cost) → **Yes → +1 trigger met**

**Qualitative adjustment: +1. Score adjusted to 5.**

Qualitative note: User cited market comparables, asked the landlord to distinguish between cost-based and market-based pricing, and used the landlord's own vacancy costs as a criterion — demonstrating bilateral use of objective standards.

**D4 Score: 5**

---

### D5 — BATNA Awareness

Positive units: 3 (Units 10, 16, 22 — all PCOM classified BATNA Positive)
Negative units: 0
Frequency: 3/15 = **0.20**
Ratio: 3/(3+0) = **1.0**

Threshold lookup: Frequency ≥ 0.15, ratio = 1.0 → **High zone, starting score 5 (subject to qualitative confirmation)**

Score 5 qualitative confirmation checklist:
- BATNA communicated after prior interest exploration (not as opening move)? → Units 3 and 7 precede Unit 10 → **Yes ✓**
- BATNA framed as honest transparency, not posturing? → Unit 10: "That's not me posturing" explicit → **Yes ✓**
- User continued interest exploration after signaling BATNA? → Unit 13 (APRI) follows Unit 10 (PCOM) → **Yes ✓**
- User showed awareness of counterpart's BATNA? → Unit 12 (vacancy cost argument) considers what happens to the landlord without an agreement → **Yes ✓**

All confirmation criteria met.

**Qualitative adjustment: None. Score confirmed at 5.**

Qualitative note: User disclosed their BATNA multiple times in honest, non-threatening framing and timed the disclosures after establishing rapport and exploring interests. Used vacancy cost as a mirror of the counterpart's BATNA consideration.

**D5 Score: 5**

---

### Composite Score

```
D1 (Separate People):     5
D2 (Interests):           5  [changed from 4 in v1.0]
D3 (Options):             1  (Not Demonstrated)
D4 (Criteria):            5
D5 (BATNA):               5
                         ——
Total:                   21 / 25
Band:                    Proficient
```

**Flags:**
- D3 Not Demonstrated: user did not make any offers or propose any packages. This is a clear development priority for Round 2 and a natural focus area for the debrief regardless of group assignment.

---

*End of Document 2 — Version 1.2*
