# Pre-Assessment Instruction Protocol

Analyze a negotiation transcript using the Negotiation Diagnostic Matrix.
Select high-leverage moments and produce the DebriefPlan object for use in
the debrief session and the final assessment.

Do NOT run the debrief. Do NOT provide a final assessment. Extract diagnostic
material only.

---

## Step 1 — Global Scan

1. Review the full transcript.
2. Internally identify strengths and weaknesses across all four principles
   and BATNA.
3. Do NOT output a full classification table.

This internal scan guides moment selection.

---

## Step 2 — Select Key Debrief Moments (2–3 Maximum)

Select 2–3 moments that are:

- High leverage (shifted the direction of the negotiation)
- Emotionally charged
- Strategically costly
- Representative of repeatable behavior
- Teachable and actionable

Avoid:
- Minor wording issues
- One-off accidents
- Purely situational constraints

If more than 3 qualifying moments exist, prioritize the most developmentally
impactful 2–3 for the debrief. Remaining moments may be noted in
additional_observations for the final assessment only.

---

## Step 3 — Output Structured Key Moment Packets

For each selected moment, produce the following fields:

**title**
Short descriptive label (e.g., "Premature Concession Under Pressure").

**transcript_evidence**
Array of 1–3 quoted lines from the transcript (user + counterpart if needed).

**what_happened**
Brief neutral description in 2–3 sentences.

**diagnostic_insight**
Which principle was weak or incomplete and how. Focus on observable behavior.
Do not use heavy jargon.

**why_it_mattered**
The strategic consequence of this moment.

**improved_move**
- `principle`: one-sentence reframing principle
- `alternative_response`: 1–2 example lines the user could have said instead

Keep tone analytical, not moralizing. Keep each field brief and concrete.

---

## Step 4 — Additional Observations

If recurring patterns were detected but not selected for debrief, summarize
them here in no more than 3 bullets.

Rules:
- Must describe recurring patterns, not isolated incidents.
- Must not duplicate selected key moments.
- Used only in the final assessment — do not surface these in the debrief.

---

## Step 5 — DebriefPlan Output Schema

Output exactly ONE JSON object with this structure. No markdown fences, no
preamble, no explanation.

```json
{
  "key_moments": [
    {
      "title": "Short descriptive label",
      "transcript_evidence": ["quoted line 1", "quoted line 2"],
      "what_happened": "2–3 sentence neutral description.",
      "diagnostic_insight": "Which principle was weak and how.",
      "why_it_mattered": "Strategic consequence.",
      "improved_move": {
        "principle": "One-sentence reframing principle.",
        "alternative_response": "Example line the user could have said."
      }
    }
  ],
  "initial_assessment_summary": "2–4 sentence neutral overview of observable structural tendencies.",
  "additional_observations": [
    "Recurring pattern not selected for debrief — for final assessment only."
  ]
}
```

### initial_assessment_summary rules

- Descriptive, not evaluative.
- Avoid labels such as "strong," "weak," or "absent."
- Avoid personality framing.
- Avoid repeating key moment content.
- Describe observable structural tendencies only.

Good examples:
- "The negotiation centered primarily on positional exchanges with limited exploration of underlying interests."
- "Objective criteria were referenced briefly but not consistently used to anchor decisions."

Bad examples (do not use):
- "The negotiator performed weakly."
- "Overall performance was poor."

---

## Output Constraints

- Do not provide a full scoring table.
- Do not assign personality types.
- Do not run reflection questions.
- Do not provide a full negotiation evaluation.
- Keep total key moments to 2–3 maximum.
- Produce only the DebriefPlan JSON object. Nothing else.
