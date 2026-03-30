# Scoring System Overview
## AI Negotiation Simulator — Behavioral Quality Assessment

**Version:** 1.1
**Last updated:** 2026-03-28
**Documents:** `coding_instruction.md` (v1.2) + `scoring_rubric.md` (v1.2)

---

## What This Is

The scoring system measures whether participants' negotiation behavior improves between Round 1 and Round 2 of the experiment. It takes a raw conversation transcript from MongoDB and produces a structured **Behavioral Quality Score (BQS)** — five dimension scores (1–5 each) plus a composite score (5–25).

This score is one of two primary outcome measures in the experiment. The other is the **ZOPA-based outcome score** (the final deal value relative to the AI's hidden target range). BQS captures *how* someone negotiated; ZOPA score captures *what* they achieved.

---

## Theoretical Foundations

The scoring system is grounded in three sources:

| Source | What it contributes |
|---|---|
| **Getting to Yes** (Fisher, Ury & Patton, 1981) | The five dimensions being measured — the core principles of principled negotiation |
| **NegotiAct** (Jäckel et al., 2024) | The 26-code behavioral taxonomy — a validated scheme for coding every utterance in a negotiation |
| **Smolinski & Xiong (2020)** Negotiation Competency Model | The behavioral level format (Low / Mid / High) that anchors numeric scores to observable behavior patterns |

Two additional papers informed design decisions:
- **Weingart, Olekalns & Smith (2004)** — methodology for frequency/ratio signals, thought unit approach, and reliability standards
- **VR negotiation training study** — experimental precedent for which dimensions are likely to improve after a single training cycle

---

## The Four-Step Pipeline

### Step 1 — Segment the Transcript into Thought Units

Before any coding, each transcript is divided into **thought units** — the smallest complete communicative act that can stand alone.

Rules (from NegotiAct segmentation standards):
- New unit when the speaker changes
- New unit when the same speaker shifts to a genuinely different communicative act
- Short acknowledgments ("okay", "right", "got it") are their own unit
- If a sentence elaborates the preceding sentence without adding a new act, absorb it

Transcripts are read directly from MongoDB. Each document has the structure:
```json
{
  "scenario_id": "salary_negotiation" | "apartment_rent",
  "personality_id": "aggressive" | "collaborative" | "evasive",
  "messages": [{ "role": "assistant"|"user", "text": "...", "timestamp": "..." }]
}
```
`role: "user"` = participant. `role: "assistant"` = AI counterpart.

**Documented in:** `coding_instruction.md` Section 2

---

### Step 2 — Assign a Behavioral Code to Each Unit

Each participant (user) thought unit receives exactly one code from a **26-code scheme** derived from NegotiAct. AI turns are coded for context only — never counted in scores.

The 26 codes are organized into five categories:

| Category | Example codes |
|---|---|
| Information exchange | PPRI (stating priorities), APRI (asking about counterpart's priorities), FACT (market data) |
| Offers | MIA (multi-issue offer), SIA (single-issue offer), REJO (rejecting offer) |
| Persuasion | SUBS (substantiation with evidence), ASUB (asking counterpart to justify), PCOM (positional commitment) |
| Socio-emotional | ACLS (active listening), POSA (positive affect), NEGA (negative affect) |
| Process | SHRT (short acknowledgment — excluded from scoring) |

Each code has a precise definition, examples from both scenarios (salary and rent), and a decision boundary explaining what it is NOT.

**Documented in:** `coding_instruction.md` Sections 3–4

---

### Step 3 — Map Codes to Getting to Yes Dimensions

Every code is pre-mapped to one of five GTY dimensions and designated as a positive or negative indicator. This converts behavioral observations into principled negotiation assessment.

| Dimension | Positive indicators (examples) | Negative indicators (examples) |
|---|---|---|
| D1 — Separate People from Problem | ACLS, POSA, PREL, ENCO | NEGA, NREL |
| D2 — Interests Not Positions | APRI, PPRI, APFI, PPFI | PPOS, APOS, ROM, AVOI |
| D3 — Invent Options for Mutual Gain | MIA (primary); PPFI, APFI, EXTQ (supplementary) | SIA |
| D4 — Objective Criteria | SUBS (with external reference), FACT, ASUB | — (frequency only) |
| D5 — BATNA Awareness | PCOM (after interest exploration + explicit alternative) | PCOM (as threat, no prior exploration) |

One code requires special handling: **PCOM (Positional Commitment)** is context-dependent. Whether it scores as BATNA-positive or Interests-negative depends on the sequencing — whether interest exploration occurred before the commitment, and whether an explicit alternative is referenced.

**Documented in:** `coding_instruction.md` Section 4

---

### Step 4 — Score Each Dimension and Compute Composite

For each dimension, two quantitative signals are computed from the coded transcript:

- **Frequency signal** = positive units for that dimension / total scoreable user units
- **Ratio signal** = positive units / (positive + negative units)

These map to a starting score (1–5) via a threshold table. A qualitative adjustment (±1 max) corrects for patterns the numbers miss — for example, whether positive behaviors are distributed throughout the transcript or concentrated only in the opening turn.

The five dimension scores add to a **composite BQS (range: 5–25)**. The primary research measure is the **delta**: Round 2 BQS − Round 1 BQS.

**Documented in:** `scoring_rubric.md` Sections 3–8

---

## Key Design Decisions

These decisions were made deliberately and are documented here for reference:

| Decision | Rationale |
|---|---|
| Only user turns are scored | AI behavior is held constant; only participant behavior varies |
| SHRT units excluded from frequency | Short acknowledgments are procedural throughput, not negotiation behavior |
| REJO is neutral (not D2 negative) | Rejecting an offer is a normal, necessary act — penalizing it artificially deflated interest-exploration scores |
| D3 has supplementary indicators | Novice negotiators often show multi-issue thinking (PPFI, APFI, EXTQ) before making a full MIA; these are captured as developmental signals |
| BATNA Not Demonstrated = score 2, not 1 | Absence of BATNA communication in a short transcript is ambiguous, not a failure |
| Equal weighting across five dimensions | Getting to Yes treats all five principles as co-equal foundations |
| Qualitative adjustment capped at ±1 | Prevents edge cases from distorting the numeric score |
| Input from MongoDB, not plain text | Transcripts are read directly from the `transcripts` collection; `scenario_id` and `personality_id` fields provide scoring context |

---

## Reliability Validation

Because the scorer is an AI (Claude Sonnet), inter-rater reliability must be validated before analysis:

1. Randomly select 15–20% of collected transcripts (~5–6 for n=30)
2. Human rater independently codes those transcripts using `coding_instruction.md`
3. Compute **Cohen's Kappa** (target: κ ≥ .70) and **Guetzkow's U** (target: U < .05)
4. Resolve systematic disagreements; re-code affected transcripts
5. Report final Kappa in the methods section

This is standard practice per Weingart et al. (2004) and Jäckel et al. (2024).

---

## Open Issues and Pending Decisions

See `rubric_improvement.md` for the full tracker. Key items:

| Issue | Status |
|---|---|
| Counterbalanced scenario design (half salary-first, half rent-first) | Design confirmed; needs wiring into participant assignment |
| REJO reclassified as neutral | ✅ Done in v1.2 |
| Reliability validation protocol | Protocol defined; validator to be confirmed with professor |
| ACCO dependency on AI turn coding | Needs one clarifying rule added |
| BQS + ZOPA outcome score integration | 2×2 interpretation table defined in `experiment_Design.md` |
| Five dimension differential sensitivity | Open question for professor |

---

## Files in This Project

| File | What it is |
|---|---|
| `coding_instruction.md` (v1.2) | Document 1 — transcript input format, segmentation rules, 26-code scheme, GTY mapping, worked example |
| `scoring_rubric.md` (v1.2) | Document 2 — scoring architecture, five dimension rubrics, composite score, worked example |
| `rubric_improvement.md` | Tracker of all pending design decisions and open questions for professor meeting |
| `building_plan.md` | This document — system overview |
| `NegotiAct.pdf` | Source of the 26-code behavioral taxonomy and segmentation rules (Jäckel et al., 2024) |
| `quantitative_coding_of_negotiation_behaviour.pdf` | Methodology: frequency/ratio signals, thought unit approach, reliability standards (Weingart et al., 2004) |
| `a_nego_competencey_model.pdf` | Source of the behavioral level description format — Low/Mid/High with observable traits |
| `nego_as_an_interpersonal_skills.pdf` | Validates text-based chat coding; 14-category cross-reference |
| `vr_negotiation_train.pdf` | Experimental precedent for AI-assisted negotiation training; dimension improvement predictions |
| `getting-to-yes.pdf` | Source of the five GTY dimensions and their definitions (Fisher, Ury & Patton, 1981) |

---

*Version 1.1 — updated to reflect v1.2 documents, MongoDB input format, and experiment design alignment*
