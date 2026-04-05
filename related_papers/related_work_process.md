# Related Work Writing Process

A structured process for producing a rigorously sourced related work section, developed through practice on this project. Designed to minimize back-and-forth: most steps run autonomously; the author is involved only at key review checkpoints.

---

## Steps Overview

| Step | Who | Author action |
|------|-----|---------------|
| 1. Field mapping | AI proposes | **Approve / redirect** |
| 2. Paper collection | Author only | Bring papers |
| 3. Categorization + gap check | AI proposes | **Approve / find more papers** |
| 4. Paper summaries | AI writes | **Spot-check** |
| 5. Flow design | AI proposes | **Approve narrative arc** |
| 6. First draft | AI writes | — |
| 7. Sentence-level verification | AI runs, author responds | **Approve / question each claim** |
| 8. Professor-view review | AI reads as reviewer | **Decide what to fix** |

---

## Step 1 — Field Mapping

AI brainstorms which subfields are relevant to the project and proposes a coverage map. Author confirms or redirects before any writing begins.

*Example output:*
> "You need: (1) AI negotiation training, (2) soft-skills simulation, (3) debriefing theory, (4) AI-facilitated debriefing."

---

## Step 2 — Paper Collection *(author)*

Author collects all papers. No AI involvement at this stage.

---

## Step 3 — Categorization + Gap Check

AI sorts papers by subfield and flags areas that are thin or missing. Recommends whether to find more papers before proceeding.

Author approves the coverage map or supplies additional papers.

---

## Step 4 — Paper Summaries *(critical step)*

For each paper, AI produces a structured entry with three parts:

```
### Author et al. (Year) — Short title

Summary: 2–3 sentences on what the paper does and finds.

Relevance: How this paper connects to the current project.

Direct quotes: Exact sentences from the paper likely to be cited.
  - "…exact quote…" (p. X)
```

> **Why direct quotes are required:** Summaries paraphrase, and paraphrase drifts from the original over time. In this project, errors found at Step 7 could have been caught at Step 4 if direct quotes had been recorded. With quotes in the summary file, verification at Step 7 becomes a quick lookup rather than a re-read of the paper.

---

## Step 5 — Flow Design

Before any writing, AI proposes the paragraph structure and narrative arc. Author approves the logic or restructures.

*Example:*
> "Para 1: broad AI simulation → Para 2: AI negotiation training + GTY gap → Para 3: bridge (behavioral change challenge) → Para 4: debriefing theory + AI debriefing work → Para 5: gap statement and contribution."

---

## Step 6 — First Draft

AI writes the full draft using only direct quotes from Step 4 as source material. No claims are introduced without a quote anchor.

---

## Step 7 — Sentence-Level Verification *(interactive)*

AI goes through each factual claim one at a time and presents a verification card:

```
Claim:        "[exact sentence from draft]"
Source:       Author et al. (Year)
Direct quote: "…exact quote from paper…"
Assessment:   ✅ Supported / ⚠️ Inference / ❌ Not found
```

Author responds per card:
- **✅** — move to next
- **❓** — question or discuss
- **✏️** — fix this one

For ⚠️ (inference without direct support) or ❌ (no supporting quote), AI proposes a fix inline. Author approves or adjusts.

> **What this session found:** Several claims attributed to a paper were actually inferences drawn from that paper, not the paper's own statement. Others were secondary citations — Paper A citing Paper B, but the claim being attributed to Paper A. Both types were caught and removed during this step.

---

## Step 8 — Professor-View Review

AI reads the completed draft as a skeptical external reviewer and checks:

1. **Transitions** — do paragraph breaks flow logically? Are connectives overused?
2. **Redundancy** — is the same point stated twice within a section?
3. **Overclaims** — does any language ("proven," "always") exceed what the citations support?
4. **Gap statement** — are all identified gaps explicitly closed by the contribution statement?
5. **Citation accuracy** — is any claim attributed to a secondary source rather than the original?

AI returns a numbered list of issues. Author decides which to act on.

---

## Lessons Learned (This Project)

- **Paraphrase drift is the main source of citation errors.** Summary files that paraphrase rather than quote introduce subtle inaccuracies that are hard to catch without going back to the original paper. Adding direct quotes to Step 4 would have prevented most errors found in Step 7.
- **Negative inferences must not be attributed to a paper.** If Paper A says "behavioral change requires surfacing cognitive frames," it does not say "feedback-only approaches fail." The second claim is an inference and must be hedged as such.
- **Secondary citations are a silent risk.** If Paper A cites Paper B's finding, attributing that finding to Paper A is inaccurate. Either locate Paper B directly, or remove the claim.
- **Two instances of the same connective across a paragraph break read as repetitive.** (e.g., ending one paragraph with "Yet…" and opening the next with "Yet…")
- **Redundant framing sentences weaken a paragraph.** Opening a cluster with "Existing work has been confined to medical education" and closing with "To date, work remains concentrated in clinical simulation" says the same thing twice. Cut the opener; let the examples carry the point.
