# Script Test — Run Instructions

Fully autonomous end-to-end test runner. A separate Claude (Haiku by default) acts as the
simulated user — it has NO knowledge of project internals, only the brief and the conversation.

---

## How it works

```
run_test.js
  ├── calls /api/chat            ← gets counterpart reply
  ├── calls Anthropic API        ← simulated user responds (Haiku, brief-only context)
  ├── loops until sim user ends negotiation
  ├── calls /api/debrief/plan
  ├── calls /api/debrief         ← gets Sage reply
  ├── calls Anthropic API        ← simulated user responds to Sage
  ├── loops until Sage closes session
  └── calls /api/debrief/assessment → saves log
```

No file exchange. No human input during the run.

---

## Prerequisites

- Dev server running: `cd negotiation-simulator && npm run dev`
- Node 18+
- `ANTHROPIC_API_KEY` in env or in `negotiation-simulator/.env.local`

---

## Step 1 — Create or choose a brief

Briefs live in `test_script/briefs/`. Each brief defines what kind of user to simulate.
Ask Claude to create a new brief, or use an existing one.

---

## Step 2 — Run the test

With a brief:
```bash
cd test_script && node run_test.js --brief briefs/salary_evasive_skilled.md
```

With defaults from config.json:
```bash
cd test_script && node run_test.js
```

To use Sonnet instead of Haiku for a more nuanced simulated user, set in `config.json`:
```json
"sim_model": "claude-sonnet-4-6"
```

---

## Step 3 — Check the output

```bash
cat test_script/output/*.txt
```

Log has four sections:
- `=== NEGOTIATION ===`
- `=== DEBRIEF CONVERSATION ===`
- `=== DEBRIEF SUMMARY ===`
- `=== FINAL ASSESSMENT ===`

Full session is also saved to MongoDB (`transcripts` + `debriefs` collections).

---

## Brief format

```
scenario:    salary_negotiation | vendor_contract | apartment_rent
personality: collaborative | aggressive | evasive
user_style:  <how the simulated user behaves — negotiation + debrief>
test_focus:  <what edge case or behavior to probe>
```

For debrief-only (skip negotiation, load a saved transcript):
```
mode:            debrief_only
transcript_file: output/<filename>.json
user_style:      <debrief behavior>
test_focus:      <what to probe>
```
