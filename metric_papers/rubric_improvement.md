# Scoring System — Improvement Tracker
## AI Negotiation Simulator

**Version:** Post v1.1 review
**Purpose:** Documents all pending improvements, design decisions, and open questions to discuss with professor before running the experiment.

---

## Status Legend

| Symbol | Meaning |
|---|---|
| ✅ Done | Applied to readable docs (`coding_instruction_readable.md` / `scoring_rubric_readable.md`). Still needs transfer to AI coder versions (`coding_instruction.md` / `scoring_rubric.md`) after professor review. |
| 🔴 Must resolve | Blocks experiment validity — fix before data collection |
| 🟡 Should discuss | Important design decision requiring prof input |
| 🟢 Nice to have | Low priority, can defer to post-pilot |

---

## Issue 1 — Cross-Scenario Counterbalancing 🔴 Must resolve

### The Problem
Round 1 and Round 2 use different scenarios (salary vs. rent) to test transfer learning.
Different scenarios naturally produce different base rates for certain codes:

| Code | Higher in Salary | Higher in Rent | Why |
|---|---|---|---|
| SUBS (Substantiation) / FACT (Factual Information) | ✓ | | Salary candidates naturally cite Glassdoor, market surveys |
| PPRI (Providing Priority Information) | | ✓ | Tenant emotional ties — neighborhood, schools, history |
| PCOM (Positional Commitment — BATNA positive) | ✓ | | Invoking a competing offer is a culturally well-known salary negotiation tactic — participants are more likely to think of it spontaneously without any prompt. The equivalent move in rent (mentioning other apartments) is less commonly known. |
| PREL (Positive Relationship Remark) | | ✓ | Rental tenure history is a natural relational resource |

If everyone does salary → rent, a drop in D4 (Objective Criteria) in Round 2 might reflect the scenario, not skill regression.

### Proposed Fix: Counterbalanced Design

Split participants evenly at assignment:

| Group | Round 1 | Round 2 |
|---|---|---|
| Half of each condition | Salary negotiation | Apartment rent negotiation |
| Other half of each condition | Apartment rent negotiation | Salary negotiation |

This is a **2 (scenario order) × 3 (debrief condition)** design.

**Benefits:**
- Scenario order effects cancel out when you average across the full sample
- Both scenarios serve as both baseline and transfer conditions
- Enables an exploratory analysis: does skill transfer differently depending on which direction (salary → rent or rent → salary)?

**What this requires:**
- Equal assignment: e.g., 5 per scenario-order per condition if n=30 total
- Record `scenario_round1` and `scenario_round2` fields in the participant data schema (already partially done in ExperimentUser rounds array)
- When reporting composite score deltas, control for scenario order in the analysis (e.g., include it as a covariate, or report deltas separately for each order group)

**Proposed analysis approach:** Treat scenario order as a **covariate** (not a separate factor) in an ANCOVA model. With n=30, a full 2×3 factorial (scenario order × debrief condition) would have only ~5 participants per cell — not enough statistical power. Including scenario order as a covariate corrects for its influence on dimension scores while keeping the full sample together for the main debrief effect analysis.

This does not change participant assignment — counterbalancing (half salary-first, half rent-first) is still required to create the variation the covariate needs. This is a proposal for the analysis plan only; needs professor confirmation before finalizing.

---

## Issue 2 — AI Coder Reliability Validation 🔴 Must resolve

### The Problem
The scoring system uses Claude Sonnet as the coder. Any peer reviewer or professor will ask: *"How do you know the AI applies codes consistently and correctly?"* Without a reliability check, the behavioral scores are not defensible as a research measure.

Standard practice (from Weingart et al., 2004; Jäckel et al., 2024) requires reporting **Cohen's Kappa** between two independent coders. Target: **κ ≥ .70**.

### What "Spot-Check Protocol" Means — Concretely

**Step 1 — Select a sample of transcripts**
After data collection, randomly select **15–20% of all transcripts** (e.g., 5–6 transcripts if n=30) for human validation. Include transcripts from both scenarios and both rounds.

**Step 2 — Human coder applies Document 1 independently**
You (or a research assistant) manually code those transcripts using `coding_instruction.md` — segmenting into thought units and assigning codes — without seeing the AI's output first.

**Step 3 — Compare outputs**
For each thought unit in the sampled transcripts, compare the human code vs. the AI code. Compute:

- **Unitizing reliability (Guetzkow's U):** Do you and the AI agree on *where* the unit boundaries are?
  `U = |O_human − O_AI| / (O_human + O_AI)`
  Target: U < .05 (less than 5% discrepancy in unit count)

- **Interpretive reliability (Cohen's Kappa):** Do you and the AI agree on *which code* to assign?
  Standard Kappa formula. Target: **κ ≥ .70**

**Step 4 — Resolve disagreements and document**
For any unit where human and AI disagreed, note the code conflict. If a pattern emerges (e.g., AI consistently confuses APRI (Asking for Priority Information) and EXTQ (Exploratory/Expansive Question)), add a clarification rule to `coding_instruction.md` and re-run.

**Step 5 — Report in methods section**
Write something like:
> *"To validate AI coder reliability, 18% of transcripts (n=X) were independently coded by a human rater using the same coding manual. Cohen's Kappa for code assignment was κ = .XX, indicating [substantial/moderate] agreement. Unitizing reliability was U = .0X. Discrepancies were reviewed and resolved through clarification of three decision boundaries."*

### What to Add to `coding_instruction.md`
A reliability validation section — already added as Section 9 in `coding_instruction_readable.md`. Needs to be transferred to `coding_instruction.md` after professor review.

### Open question for professor
- **Recommended:** Use a blind second coder — someone who reads only the coding manual, not the design history. A person unfamiliar with the system who can still apply the codes consistently at κ ≥ .70 demonstrates that the manual is clear enough for general use, not just for the designer. This strengthens the reliability claim significantly.
- Is a RA available, or can a classmate serve as the blind validator?
- If no one else is available, can you (the designer) be the validator — and if so, how should that limitation be noted in the methods section?

---

## Issue 3 — Threshold Values Have No Empirical Basis 🟢 Defer

### Decision
**Primary analysis uses raw frequency/ratio values per dimension — not zone scores.** Zone scores (1–5) are deferred to post-experiment as a presentation/interpretation layer only.

After data collection, calibrate zone cutoffs empirically using the collected distribution if needed for reporting. Pre-experiment synthetic pilot transcripts are still useful as a coding sanity check (do the codes produce plausible frequency patterns?), but threshold calibration is not a blocking pre-experiment step.

**Updated in:** `scoring_rubric_readable.md` Section 10 — per-dimension frequency/ratio deltas are now explicitly the primary statistical measure; composite BQS delta is secondary.

### Original Problem (for reference)
Every dimension scoring table has specific cutoff values for frequency and ratio zones (e.g., frequency ≥ 0.25 = High for D1; ratio ≥ 0.75 = Mid-High for D2). These numbers were calibrated on a single worked example transcript. No published paper defines these thresholds.

**What is cited:**
- The use of frequency and ratio as the two signals → Weingart et al. (2004), NegotiAct (Jäckel et al., 2024)

**What is not cited:**
- The specific cutoff values → project-specific calibration, no empirical basis yet

### Deferred Fix: Two-Step Calibration (post-experiment)

**Step 1 — AI-generated synthetic transcripts**
Prompt the AI simulator to play users at three distinct skill levels — poor, mid-level, skilled — across both scenarios. Code and examine where frequency/ratio values land to set initial zone cutoffs.

**Step 2 — Real pilot validation**
Run 3–5 real participants, check whether participants are spread across zones or clustered, adjust thresholds if needed.

### Possible Reference Benchmarks
NegotiAct (Jäckel et al., 2024) Table 6 reports frequency proportions for socio-emotional codes (D1 only — no data for D2–D5). Weingart et al. (2004) reports no frequency data. No published benchmarks exist for D2, D3, D4, D5 threshold values.

---

## Issue 4 — ACCO Dependency on AI Turn Coding 🟡 Should discuss

### The Problem
The rule states: *"ACCO (Accepting Offer) is only counted as a D3 positive indicator when the accepted offer is a MIA (Multi-Issue Offer)."*
But to know whether the AI's offer was a MIA, the coder must read and classify AI turns — yet the instructions say AI turns are "coded for context only."
A coder who reads AI turns carelessly may miscategorize ACCO.

### Proposed Fix
Add this rule to the ACCO code definition in Section 3 and to the D3 section in Document 2:

> *"To determine whether ACCO qualifies as D3 positive: read the immediately preceding AI turn. If the AI offered two or more distinct terms simultaneously in that turn (e.g., price + lease length, or salary + start date), the ACCO is D3 positive. If the AI's preceding offer addressed only one term, the ACCO is neutral for D3."*

This makes the AI turn dependency explicit rather than implicit.

---

## Issue 5 — Five Dimension Improvement Likelihood ✅ Done

### The Research Question
Are all five GTY dimensions equally likely to improve within a **single training cycle** (one debrief session between Round 1 and Round 2)?

### Hypothesis from the Literature
Based on VR negotiation training research and general skill acquisition theory:

| Dimension | Expected Responsiveness to Single Debrief | Reason |
|---|---|---|
| D1 — Separate People | **High** | Sage directly addresses tone and relationship framing; socio-emotional behaviors are surface-level and imitable |
| D2 — Interests Not Positions | **High** | Sage explicitly teaches "ask why"; this is the core of the debrief intervention |
| D3 — Invent Options | **Low** | Requires deliberate multi-issue structuring; cognitively demanding; unlikely to shift in one round |
| D4 — Objective Criteria | **Medium** | Depends on participant doing pre-negotiation research; Sage can prompt but can't supply the data |
| D5 — BATNA | **Medium** | Sage can teach framing but the participant must think to invoke their BATNA spontaneously |

### Implication for Scoring
If D3 is unlikely to move in one round, a participant who improves meaningfully on D1+D2+D4+D5 may still show a modest composite delta because D3 anchors the bottom.

**Decision (2026-04-05):** Keep equal weighting (1:1:1:1:1). Differential weighting is unnecessary because per-dimension frequency/ratio deltas are the primary reported result — the differential sensitivity across dimensions will be visible directly in the data. The composite BQS remains equally weighted as a secondary summary only.

---

## Issue 6 — PCOM Decision Rule ✅ Done

### The Problem
PCOM (Positional Commitment) is the only code whose GTY dimension and valence are **context-dependent** — every other code maps directly in one pass. To assign PCOM's valence, the coder must:
1. Read the surrounding transcript to check whether interest exploration preceded the commitment
2. Check whether the commitment references an explicit outside alternative
3. Then decide: BATNA Awareness (positive or negative) vs. Interests Not Positions (negative)

This is a **two-pass process** and introduces more room for inconsistency than single-pass codes.

### The Citation Gap
The sequencing rule — *"interest exploration must precede PCOM for it to count as BATNA-positive"* — is a logical derivation from Fisher & Ury (1981), who argue BATNA should be invoked strategically after building mutual understanding, not as an opening threat. However, **no published paper directly operationalizes PCOM classification using this sequencing test**. The current decision rule is our project-specific adaptation.

**What is cited:**
- Fisher, Ury & Patton (1981) — BATNA concept and when to invoke it

**What is not cited:**
- The specific sequencing threshold (interest exploration must come first) is our operationalization, not from a paper

### Decision (2026-04-05)
**Option 3 applied.** PCOM is BATNA-positive only when an explicit outside alternative is stated verbatim ("I have another offer at $92k," "I've found three other apartments at $2,100"). All other PCOM = Interests Not Positions — Negative.

The sequencing requirement (interest exploration must precede PCOM) was removed — it introduced a judgment call that is hard to apply consistently and would reduce inter-rater reliability below the κ ≥ .70 target.

**Updated in:** `coding_instruction_readable.md` Section 6.1 — rule simplified to one question (explicit alternative present or not?); rationale for removing sequencing requirement noted inline.

---

## Issue 7 — D4 Ratio Cutoffs Theoretically Set 🟡 Should discuss

### The Problem
CRIT (Criticism) was added as a D4 negative code, making a ratio calculation possible for D4. The ratio thresholds were set theoretically (Mid ≥ 0.50, Mid-High/High ≥ 0.75) following the same logic as other dimensions, but without empirical validation. CRIT may be rare enough in practice that it rarely affects the ratio at all.

### Open question for professor
- Should we keep the ratio column for D4, or simplify back to frequency-only and handle CRIT purely through qualitative adjustment?
- Does pilot data show CRIT appearing frequently enough to matter?

---

## Issue 8 — SHRT Proportion Has No Scoring Consequence ✅ Done

### The Problem
When SHRT (Short Response) units exceed 30% of total user units, it is flagged — but this flag has no effect on any dimension score. A participant who mostly says "okay", "right", "I see" throughout is scored identically to one who doesn't, just with a note.

Passive style is counter to both D1 (you can't separate people from problem without engagement) and D2 (you can't explore interests with short responses).

### Proposed Fix
> *"If SHRT (Short Response) units exceed 30% of total user units: apply −1 adjustment to D1 (Separate People) and −1 adjustment to D2 (Interests) unless those dimensions already scored 1. This reflects that passive throughput responses indicate disengagement from both relationship management and interest exploration."*

### Decision (2026-04-05)
Flag only — no numeric penalty. The qualitative note carries the interpretation. With n=30, mechanical adjustments for edge cases add complexity without statistical payoff.

---

## Issue 9 — One Code Per Unit (Dominance Rule) ✅ Done

**Decision (2026-04-05):** Each thought unit receives exactly one code — the code that best represents the primary communicative purpose of that unit (dominance scheme). This matches NegotiAct's design requirement (mutually exclusive codes) and follows the recommendation in Weingart et al. (2004).

**If a unit appears multi-behavioral:** re-examine segmentation first — most apparent multi-code units can be split into two units at a natural boundary. If the unit genuinely cannot be split, apply the 4-level priority rule:
1. Task behavior over relational behavior
2. More specific code over general
3. The behavior that dominates the utterance
4. If still ambiguous, the code the unit most clearly exemplifies

**Added to:** `coding_instruction_readable.md` Section 3 ("One Code Per Unit — The Dominance Rule")
**Citations:** Jäckel et al. (2024); Weingart et al. (2004)

---

## Issue 10 — BQS and Outcome Score Separation ✅ Done

**Decision (2026-04-05):** The BQS (process measure) and Outcome Score (result measure) are separated into two standalone documents:

- `scoring_rubric_readable.md` — BQS only (5 dimensions, frequency/ratio thresholds, composite, worked example)
- `outcome_score.md` — Outcome Score only (ZOPA formula, no-agreement handling, delta table, BQS × Outcome interpretation matrix)

Section 1 of `scoring_rubric_readable.md` updated to note the separation explicitly. `building_plan.md` updated to list both documents. This reflects that BQS and Outcome Score are two independent DVs — BQS measures *how* the participant negotiated; Outcome Score measures *what* they achieved.

⚠️ ZOPA ranges (floor and ceiling for each scenario) are still [TBD] in `outcome_score.md` — must be filled before data collection begins.

---

## Issue 11 — Self-Efficacy Measure (New) 🟡 Should discuss

### The Suggestion
Add a brief self-efficacy measure (1–7 Likert scale) captured **after each round negotiation but before the debrief**. This creates a Round 1 → Round 2 delta on perceived confidence that can be compared against the behavioral delta (BQS frequency/ratio).

**Why timing matters:** If the self-efficacy questions fire after the debrief, the debrief itself inflates the confidence rating — you can't distinguish "I feel more confident because I debriefed" from "I feel more confident because I improved." Capturing it before the debrief keeps the measure clean.

**Proposed questions (1–7 Likert, asked after each round, before debrief):**
1. *"How confident do you feel in your ability to negotiate effectively?"* — general self-efficacy
2. *"How well do you think you performed in this negotiation?"* — perceived performance
3. *"How prepared did you feel going into this negotiation?"* — preparation confidence

**Why this is useful:** Enables testing the "learning without execution" pattern — the debrief group may show confidence gains even when behavioral frequency doesn't yet move. Self-efficacy change is itself a meaningful outcome, and it's cheap to collect.

### Implementation note (not yet done — do not change program until confirmed)
The current survey flow is: `pre → [Round 1] → post_r1 (post-debrief) → [Round 2] → post_r2 → final`. The self-efficacy questions need a new survey trigger that fires between Round 1 end and Debrief start — a `post_r1_pre_debrief` survey type, or the existing `post_r1` timing is moved earlier. Needs professor confirmation before implementing.

### Open question for professor
- Are 3 questions sufficient, or should we use a validated self-efficacy scale (e.g., GSE — General Self-Efficacy Scale)?
- Can this be added to the existing `post_r1` survey if we move its trigger to before the debrief, or does it need to be a separate survey type?

---

## Summary: What to Bring to Prof Meeting

| Item | Status | Action Needed |
|---|---|---|
| Counterbalanced scenario design | 🔴 Must resolve | Confirm and update participant assignment logic |
| Reliability validation protocol | 🔴 Must resolve | Transfer Section 9 to `coding_instruction.md`; confirm who will be human validator |
| ZOPA ranges for Outcome Score | 🔴 Must resolve | Fill floor/ceiling values in `outcome_score.md` before experiment runs |
| Threshold values — no empirical basis | 🟢 Defer | Primary analysis uses raw frequency/ratio per dimension; zone scores are post-experiment presentation layer only. |
| ACCO (Accepting Offer) rule clarification | 🟡 Discuss | Small edit — confirm before finalizing |
| Five dimension weighting | ✅ Done | Equal weighting kept; per-dimension reporting makes differential weights unnecessary |
| PCOM decision rule | ✅ Done | Option 3: explicit outside alternative verbatim = BATNA-positive; all other PCOM = Interests-negative |
| D4 ratio cutoffs — theoretically set | 🟡 Discuss | Validate in pilot — CRIT (Criticism) may be too rare to affect ratio meaningfully |
| SHRT scoring consequence | ✅ Done | Flag only — no numeric penalty |
| Self-efficacy measure (pre-debrief) | 🟡 Discuss | Add 3-question 1–7 Likert after each round, before debrief; needs new survey trigger — confirm with professor before implementing |
| One code per unit — dominance rule | ✅ Done | Added to `coding_instruction_readable.md` Section 3 |
| BQS and Outcome Score separated | ✅ Done | `scoring_rubric_readable.md` (BQS) + `outcome_score.md` (Outcome Score) |

---

*Last updated: 2026-04-05*
