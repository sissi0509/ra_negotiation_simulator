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

**Open question for professor:** Should we treat scenario order as a between-subjects factor in the statistical model, or simply use it as a control covariate?

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
- Can you (the student) be the human validator, or does it need to be a blind second coder?
- Is a RA available to do independent coding, or will you use a classmate?

---

## Issue 3 — Threshold Values Have No Empirical Basis 🟢 Defer

### Professor Note (2026-03-30)
Professor confirmed this is **not urgent**. The raw frequency and ratio values are already informative measurement signals on their own — the delta between Round 1 and Round 2 can be computed directly from frequency/ratio without needing the zone-to-score conversion to be perfectly calibrated. The 1–5 zone scores are a useful summary layer but not required for the core analysis.

**Implication:** Report frequency/ratio deltas as the primary continuous measure. The zone scores are supplementary interpretation aids. Threshold calibration can happen after data collection as a refinement step.

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

## Issue 5 — Five Dimension Improvement Likelihood 🟡 Should discuss

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

**Options to discuss with professor:**
1. Report per-dimension deltas as primary results, not just composite delta — this shows where improvement actually happened
2. Consider a **weighted composite** where D1 and D2 receive higher weight for this specific study (since Sage directly targets them), and D3 receives lower weight
3. Leave equal weighting but add a discussion section note explaining the differential sensitivity prediction

---

## Issue 6 — PCOM Decision Rule Has No Direct Citation 🟡 Should discuss

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

### Options to Discuss with Professor
1. **Keep as-is** — flag in methods section as a theoretically-grounded but project-specific rule. Validate it empirically during spot-check: does human and AI coder agree on PCOM (Positional Commitment) valence at κ ≥ .70?
2. **Split PCOM into two codes:** PCOM-BATNA (explicit outside alternative, after interest exploration) vs. PCOM-POS (hard positional commitment, no alternative cited). Note: this doesn't eliminate the context-dependency — it just moves it from "determine valence" to "choose which code to assign." The problem is the same.
3. **Simplify the rule:** Treat all PCOM (Positional Commitment) as Interests Not Positions — Negative unless an explicit outside alternative is stated verbatim ("I have another offer", "three other units"). This is easier to apply and avoids the sequencing judgment.

### Open question for professor
- Is Option 3 (simplify to explicit-alternative-only positive) too conservative? It would miss cases where PCOM is strategically timed but not explicitly backed by a named alternative.
- Can we point to any paper that operationalizes BATNA invocation quality using sequencing rules?

---

## Issue 7 — D4 Ratio Cutoffs Theoretically Set 🟡 Should discuss

### The Problem
CRIT (Criticism) was added as a D4 negative code, making a ratio calculation possible for D4. The ratio thresholds were set theoretically (Mid ≥ 0.50, Mid-High/High ≥ 0.75) following the same logic as other dimensions, but without empirical validation. CRIT may be rare enough in practice that it rarely affects the ratio at all.

### Open question for professor
- Should we keep the ratio column for D4, or simplify back to frequency-only and handle CRIT purely through qualitative adjustment?
- Does pilot data show CRIT appearing frequently enough to matter?

---

## Issue 8 — SHRT Proportion Has No Scoring Consequence 🟢 Nice to have

### The Problem
When SHRT (Short Response) units exceed 30% of total user units, it is flagged — but this flag has no effect on any dimension score. A participant who mostly says "okay", "right", "I see" throughout is scored identically to one who doesn't, just with a note.

Passive style is counter to both D1 (you can't separate people from problem without engagement) and D2 (you can't explore interests with short responses).

### Proposed Fix
> *"If SHRT (Short Response) units exceed 30% of total user units: apply −1 adjustment to D1 (Separate People) and −1 adjustment to D2 (Interests) unless those dimensions already scored 1. This reflects that passive throughput responses indicate disengagement from both relationship management and interest exploration."*

### Open question for professor
Is this too mechanical? An alternative is to leave it as a flag and let the qualitative note carry the interpretation rather than affecting the numeric score.

---

## Summary: What to Bring to Prof Meeting

| Item | Status | Action Needed |
|---|---|---|
| Counterbalanced scenario design | 🔴 Must resolve | Confirm and update participant assignment logic |
| Reliability validation protocol | 🔴 Must resolve | Transfer Section 9 to `coding_instruction.md`; confirm who will be human validator |
| Threshold values — no empirical basis | 🟢 Defer | Prof confirmed: raw frequency/ratio delta is sufficient as primary measure; zone scores are supplementary. Calibrate after data collection. |
| ACCO (Accepting Offer) rule clarification | 🟡 Discuss | Small edit — confirm before finalizing |
| Five dimension improvement rates | 🟡 Discuss | Decide: equal weight composite, or per-dimension focus? |
| PCOM (Positional Commitment) decision rule — citation gap | 🟡 Discuss | Confirm sequencing rule or simplify to explicit-alternative-only |
| D4 ratio cutoffs — theoretically set | 🟡 Discuss | Validate in pilot — CRIT (Criticism) may be too rare to affect ratio meaningfully |
| SHRT (Short Response) scoring consequence | 🟢 Defer | Low priority; confirm with prof whether numeric penalty or flag-only |

---

*Last updated: 2026-03-30*
