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
| SUBS / FACT | ✓ | | Salary candidates naturally cite Glassdoor, market surveys |
| PPRI | | ✓ | Tenant emotional ties — neighborhood, schools, history |
| PCOM (BATNA positive) | ✓ | | Competing offer is a built-in scenario prop |
| PREL | | ✓ | Rental tenure history is a natural relational resource |

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

## Issue 2 — REJO Removed from D2 Negatives ✅ Done

### What Changed
`REJO (Rejecting Offer)` was previously a negative indicator for D2 (Interests Not Positions).

**Problem:** Rejecting an offer is a normal, necessary part of every negotiation. A participant who explores interests thoroughly but also rejects several offers was being penalized — their D2 ratio was artificially deflated.

**Fix applied (v1.2):**
- `coding_instruction.md`: REJO changed from `Interests Not Positions | Negative` → `N/A | Neutral`
- `scoring_rubric.md` Section 4.2: REJO marked as Neutral with rationale note

**Effect on D2 thresholds:** The ratio denominator shrinks slightly (fewer negatives), so the existing ratio thresholds may now be slightly easier to meet. Monitor in pilot calibration — adjust thresholds if needed.

**Still negative for D2:** PPOS, APOS, ROM, AVOI (these are genuinely anti-interest behaviors — stating positions, asking for positions, demanding moves, and deflecting).

---

## Issue 3 — AI Coder Reliability Validation 🔴 Must resolve

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
For any unit where human and AI disagreed, note the code conflict. If a pattern emerges (e.g., AI consistently confuses APRI and EXTQ), add a clarification rule to `coding_instruction.md` and re-run.

**Step 5 — Report in methods section**
Write something like:
> *"To validate AI coder reliability, 18% of transcripts (n=X) were independently coded by a human rater using the same coding manual. Cohen's Kappa for code assignment was κ = .XX, indicating [substantial/moderate] agreement. Unitizing reliability was U = .0X. Discrepancies were reviewed and resolved through clarification of three decision boundaries."*

### What to Add to `coding_instruction.md`
A reliability validation section — already added as Section 9 in `coding_instruction_readable.md`. Needs to be transferred to `coding_instruction.md` after professor review.

### Open question for professor
- Can you (the student) be the human validator, or does it need to be a blind second coder?
- Is a RA available to do independent coding, or will you use a classmate?

---

## Issue 4 — ACCO Dependency on AI Turn Coding 🟡 Should discuss

### The Problem
The rule states: *"ACCO is only counted as a D3 positive indicator when the accepted offer is a MIA."*
But to know whether the AI's offer was a MIA (multi-issue), the coder must read and classify AI turns — yet the instructions say AI turns are "coded for context only."
A coder who reads AI turns carelessly may miscategorize ACCO.

### Proposed Fix
Add this rule to the ACCO code definition in Section 3 and to the D3 section in Document 2:

> *"To determine whether ACCO qualifies as D3 positive: read the immediately preceding AI turn. If the AI offered two or more distinct terms simultaneously in that turn (e.g., price + lease length, or salary + start date), the ACCO is D3 positive. If the AI's preceding offer addressed only one term, the ACCO is neutral for D3."*

This makes the AI turn dependency explicit rather than implicit.

---

## Issue 5 — SHRT Proportion Has No Scoring Consequence 🟢 Nice to have

### The Problem
When SHRT units exceed 30% of total user units, it is flagged — but this flag has no effect on any dimension score. A participant who mostly says "okay", "right", "I see" throughout is scored identically to one who doesn't, just with a note.

Passive style is counter to both D1 (you can't separate people from problem without engagement) and D2 (you can't explore interests with short responses).

### Proposed Fix
Add to Section 2 (Zero Evidence / Annotation rules):
> *"If SHRT units exceed 30% of total user units: apply −1 adjustment to D1 (Separate People) and −1 adjustment to D2 (Interests) unless those dimensions already scored 1. This reflects that passive throughput responses indicate disengagement from both relationship management and interest exploration."*

### Open question for professor
Is this too mechanical? An alternative is to leave it as a flag and let the qualitative note carry the interpretation rather than affecting the numeric score.

---

## Issue 6 — BQS and Outcome Score Not Integrated ✅ Done (readable docs)

### The Problem
The experiment has **two independent DVs**:
1. **BQS (Behavioral Quality Score)** — the composite dimension score from this rubric, measuring *how* someone negotiated
2. **ZOPA Outcome Score** — the final deal value relative to the hidden AI range, measuring *what* they achieved

These are currently treated as separate measures with no framework for when they agree vs. disagree.

### Proposed Integration Framework

Add a Section 8.6 to `scoring_rubric.md` with this 2×2 interpretation table:

| BQS Delta | ZOPA Delta | Interpretation |
|---|---|---|
| Positive | Positive | **Clear improvement** — process and outcome both better. Strongest evidence for debrief effect. |
| Positive | Neutral/Negative | **Learning without execution** — behavioral quality improved but didn't convert to a better deal. May reflect scenario difficulty or transfer lag. Don't dismiss. |
| Neutral/Negative | Positive | **Lucky outcome** — better deal without process change. Could be scenario variation, AI behavior, or luck. Do not attribute to debrief. |
| Negative | Negative | **Regression** — flag for transcript review. Check if scenario difficulty explains it. |

### How the ZOPA Score Works (reminder)
- AI counterpart is given a hidden target range in its system prompt (e.g., salary ceiling $105k, floor $90k)
- User is given a standardized starting context (e.g., current salary $72k, competing offer mentioned)
- Final agreed value → compute position within the ZOPA: `(deal − floor) / (ceiling − floor)`
- Score of 1.0 = user captured maximum available value; score of 0 = deal at AI's floor
- If no agreement was reached, record as 0 or flag separately

### Key design requirement
**Both scenarios must have their ZOPA ranges documented and stored** before the experiment starts. The AI prompt must include exact floor and ceiling values, and these must be recorded in the experiment schema so the outcome score can be computed post-hoc.

### Open question for professor
- Should BQS and ZOPA score be combined into a single composite outcome, or always reported separately?
- How do we handle the case where a participant reaches no agreement? Score as 0 on ZOPA, or exclude from outcome analysis?
- If ZOPA outcome is the primary DV for the paper, BQS becomes a process mediator — does this change how we frame the study?

---

## Issue 7 — Five Dimension Improvement Likelihood 🟡 Should discuss

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
| D5 — BATNA | **Medium** | Scenario gives a built-in BATNA (competing offer / other apartments); Sage can teach framing but the prop is already there |

### Implication for Scoring
If D3 is unlikely to move in one round, a participant who improves meaningfully on D1+D2+D4+D5 may still show a modest composite delta because D3 anchors the bottom.

**Options to discuss with professor:**
1. Report per-dimension deltas as primary results, not just composite delta — this shows where improvement actually happened
2. Consider a **weighted composite** where D1 and D2 receive higher weight for this specific study (since Sage directly targets them), and D3 receives lower weight
3. Leave equal weighting but add a discussion section note explaining the differential sensitivity prediction

---

## Issue 8 — PCOM Decision Rule Has No Direct Citation 🟡 Should discuss

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
1. **Keep as-is** — flag in methods section as a theoretically-grounded but project-specific rule. Validate it empirically during spot-check: does human and AI coder agree on PCOM valence at κ ≥ .70?
2. **Split PCOM into two codes:** PCOM-BATNA (explicit outside alternative, after interest exploration) vs. PCOM-POS (hard positional commitment, no alternative cited). Note: this doesn't eliminate the context-dependency — it just moves it from "determine valence" to "choose which code to assign." The problem is the same.
3. **Simplify the rule:** Treat all PCOM as Interests Not Positions — Negative unless an explicit outside alternative is stated verbatim ("I have another offer", "three other units"). This is easier to apply and avoids the sequencing judgment.

### Open question for professor
- Is Option 3 (simplify to explicit-alternative-only positive) too conservative? It would miss cases where PCOM is strategically timed but not explicitly backed by a named alternative.
- Can we point to any paper that operationalizes BATNA invocation quality using sequencing rules?

---

## Issue 9 — Threshold Values Have No Empirical Basis 🔴 Must resolve

### The Problem
Every dimension scoring table has specific cutoff values for frequency and ratio zones (e.g., frequency ≥ 0.25 = High for D1; ratio ≥ 0.75 = Mid-High for D2). These numbers were calibrated on a single worked example transcript. No published paper defines these thresholds. If a reviewer asks "why 0.15 and not 0.12?" there is currently no strong answer.

**What is cited:**
- The use of frequency and ratio as the two signals → Weingart et al. (2004), NegotiAct (Jäckel et al., 2024)

**What is not cited:**
- The specific cutoff values (0.10, 0.15, 0.25, 0.50, 0.75, 0.85, etc.) → project-specific calibration, no empirical basis yet

### Why This Matters
If the thresholds are poorly calibrated:
- Everyone scores 1–2 (thresholds too strict) → no variance, cannot detect improvement
- Everyone scores 4–5 (thresholds too lenient) → ceiling effect, cannot detect improvement
- Either way, the BQS delta becomes uninformative as a research outcome

### Required Fix: Pilot Calibration
Before running the full experiment, run a small pilot (3–5 participants) and score their transcripts. Check the distribution:
- Are participants spread across zones, or clustered?
- Does the composite score range reflect the 5–25 scale meaningfully?
- Are any dimensions showing no variance at all?

Adjust thresholds based on pilot data. Document any changes and the reasoning in a version note.

### Possible Reference Benchmarks
Weingart et al. (2004) and NegotiAct (Jäckel et al., 2024) both report descriptive statistics of code frequencies across their samples. These could serve as rough anchors for what "normal" frequency looks like in negotiation transcripts — worth checking before pilot calibration.

### Open question for professor
- Is a pilot calibration step feasible given the study timeline?
- Should threshold adjustment after pilot be pre-registered, or treated as exploratory?
- Is there a published negotiation coding study whose frequency distributions we could use as a benchmark?

---

## Summary: What to Bring to Prof Meeting

| Item | Status | Action Needed |
|---|---|---|
| Counterbalanced scenario design | 🔴 Must resolve | Confirm and update participant assignment logic |
| REJO removed from D2 | ✅ Done | No action needed |
| Reliability validation protocol | 🔴 Must resolve | Write Section 6 in coding_instruction.md; confirm who will be human validator |
| ACCO rule clarification | 🟡 Discuss | Small edit — confirm before finalizing |
| SHRT scoring consequence | 🟢 Defer | Low priority; confirm with prof whether numeric penalty or flag-only |
| BQS + ZOPA integration table | ✅ Done | Added as Section 11 in scoring_rubric_readable.md; ZOPA ranges still TBD before experiment |
| Five dimension improvement rates | 🟡 Discuss | Decide: equal weight composite, or per-dimension focus? |
| PCOM decision rule — citation gap | 🟡 Discuss | Confirm sequencing rule or simplify to explicit-alternative-only |
| Threshold values — no empirical basis | 🔴 Must resolve | Run pilot calibration before full experiment; check frequency distributions against Weingart/NegotiAct |
| D4 ratio cutoffs — theoretically set | 🟡 Discuss | Ratio added for CRIT (Mid ≥ 0.50, Mid-High/High ≥ 0.75); validate in pilot — CRIT may be too rare to affect ratio meaningfully |

---

*Last updated: 2026-03-29*
