# Test Brief

Edit this file, save it with a descriptive name, then tell Claude:
"read test_script/briefs/<filename> and run the test"

---

## Option A — Full run (negotiation + debrief)

scenario:    salary_negotiation | vendor_contract | apartment_rent
personality: collaborative | aggressive | evasive
user_style:  <describe how the simulated user behaves — both in negotiation and debrief>
test_focus:  <what behavior or edge case to probe>

---

## Option B — Debrief only (skip negotiation, load a saved transcript)

mode:            debrief_only
transcript_file: output/<transcript_filename>.json   (relative to test_script/)
user_style:      <describe how the simulated user behaves in the debrief>
test_focus:      <what behavior or edge case to probe>

---

## Notes for Claude Code acting as the user

- Read user_style carefully — stay in that character the entire session
- React to what the AI actually said each turn, not a generic script
- Keep test_focus in mind — create the conditions needed to probe the behavior
- For debrief_only: read the transcript first so you know what the user "remembers"
- Maintain the full debrief conversation in context so later replies reference earlier ones
