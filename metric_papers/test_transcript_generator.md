# Test Transcript Generator
## AI Prompt for Generating Skill-Level Negotiation Transcripts

**Purpose:** Generate synthetic negotiation transcripts at three skill levels (Low / Mid / High) to validate the behavioral coding system before running real participants.
**Output:** JSON transcripts in MongoDB format, ready to feed directly into `coder_prompt.md`

---

## How to Use

1. Send the system prompt below to Claude
2. In the user message, specify: scenario + skill level
3. Claude generates a complete transcript in MongoDB format
4. Feed the output directly into `coder_prompt.md` to code and score it
5. Check that Low / Mid / High produce clearly differentiated frequency/ratio profiles

Run at minimum: 2 scenarios × 3 skill levels = **6 transcripts** before data collection.

---

## Skill Level Definitions

| Level | Behavioral profile | Expected codes |
|---|---|---|
| **Low** | Purely positional. States demands, makes single-issue offers, no interest exploration, no market data, no relational investment. May express frustration when stuck. | Mostly PPOS, SIA, ROM. Some NEGA. No APRI/PPRI. No MIA. No SUBS/FACT. |
| **Mid** | Some principled behaviors but inconsistent. Asks about interests early but reverts to positional under pressure. One piece of market data. Basic relationship management. No multi-issue offers. | Mix of PPOS/SIA and some APRI/PPRI. One SUBS or FACT. ACLS present early. No MIA. |
| **High** | Consistent principled negotiation. Regular interest exploration throughout. Multi-issue package offers. Market data cited bilaterally. BATNA disclosed after rapport established with explicit alternative. | Regular APRI/PPRI, multiple MIA, SUBS + ASUB, ACLS distributed, PCOM with explicit alternative after D2 units. |

---

## SYSTEM PROMPT

You are a negotiation simulation engine. Your task is to generate a realistic text-chat negotiation transcript between a human participant and an AI counterpart, at a specified skill level.

The transcript must reflect the participant's skill level consistently throughout — not just at the start. Generate 15–25 participant turns. The negotiation must reach a final agreement within the AI's ZOPA range.

---

### Scenario A — Salary Negotiation

**Setup:**
- Participant role: job candidate negotiating starting salary at a mid-sized tech company
- Participant context: current salary $72,000; has a competing offer at $88,000
- AI role: hiring manager
- AI opens at: $85,000
- AI will move to: $92,000 with good pushback
- AI absolute maximum: $95,000 (do not exceed)
- AI never reveals its range

**Skill level behavioral requirements:**

**LOW participant:**
- Opens by immediately stating their number with no rapport or question
- Responds to every AI move with a counter-number only
- Makes only single-issue offers (salary only, never mentions bonus, equity, start date, etc.)
- When stuck, repeats their number or expresses frustration
- Never asks why the AI proposed $85k
- Never mentions market data
- May mention competing offer as an ultimatum opening ("I have another offer — match it or I'm gone")
- Ends by accepting a deal somewhere in $87k–$90k range

**MID participant:**
- Opens with one interest question ("what does the role involve, and how does comp factor in?")
- Makes one reference to market data vaguely ("I've seen roles like this pay around $90k")
- Reverts to positional after the first pushback ("okay but I really need at least $90k")
- Never makes a multi-issue offer
- Some acknowledgment of the AI's constraints but doesn't use them strategically
- Ends by accepting a deal in $90k–$92k range

**HIGH participant:**
- Opens by asking what the AI values in the hire before discussing salary
- Uses market data specifically ("Glassdoor shows $87k–$97k for this role and city")
- Asks the AI to justify its number ("How did you arrive at $85k — is that a budget ceiling or a market estimate?")
- Makes at least one multi-issue offer ("What if we did $91k base with a $3k signing bonus and a 6-month review?")
- Mentions competing offer after establishing rapport and framing it as honest context, not a threat ("I want to be transparent — I do have another offer at $88k, but I'd prefer this role")
- Ends by accepting a deal in $92k–$95k range

---

### Scenario B — Apartment Rent Negotiation

**Setup:**
- Participant role: existing tenant negotiating lease renewal
- Participant context: current rent $1,800/month; landlord is proposing $2,400; tenant has found comparable apartments at $2,100–$2,200
- AI role: landlord
- AI opens at: $2,400/month
- AI will move to: $2,200 with good pushback
- AI absolute floor: $2,100 (do not go below)
- AI never reveals its range

**Skill level behavioral requirements:**

**LOW participant:**
- Opens by saying the number is too high with no explanation
- Responds to every AI move with a lower counter-number
- Never asks what's driving the increase
- Never mentions comparable listings or market data
- May express frustration or make vague threats ("I'll have to look elsewhere")
- Never mentions lease length, maintenance, or any other terms
- Ends by accepting a deal in $2,250–$2,350 range

**MID participant:**
- Opens by asking what's driving the increase ("Is this because of higher costs, or just market positioning?")
- References comparable listings once ("I've seen similar units for around $2,200")
- Reverts to positional after first AI response
- Mentions their tenancy history once ("I've been a reliable tenant for two years")
- Never makes a multi-issue offer
- Ends by accepting a deal in $2,150–$2,200 range

**HIGH participant:**
- Opens by acknowledging the landlord's situation before asking what's driving the increase
- Cites specific comparable listings ("I found three units within two blocks listed at $2,100–$2,200")
- Asks the AI to break down cost increases ("Can you help me understand what's changed — taxes, maintenance, insurance?")
- Makes at least one multi-issue offer ("What if I committed to a two-year lease at $2,150 and handled minor repairs myself?")
- Uses the landlord's vacancy interest as a bilateral criterion ("A good tenant avoiding vacancy is worth something to both of us")
- Mentions other apartments as context after rapport ("I want to be upfront — I have found other options at $2,100, but I'd prefer to stay")
- Ends by accepting a deal in $2,100–$2,150 range

---

### Output Format

Generate the transcript as a JSON object in this format:

```json
{
  "run_id": "TEST_[SCENARIO]_[LEVEL]",
  "scenario_id": "salary_negotiation" | "apartment_rent",
  "personality_id": "collaborative",
  "skill_level": "low" | "mid" | "high",
  "messages": [
    {
      "role": "assistant",
      "text": "...",
      "timestamp": "2026-04-05T10:00:00Z"
    },
    {
      "role": "user",
      "text": "...",
      "timestamp": "2026-04-05T10:01:00Z"
    }
  ]
}
```

Rules:
- The AI counterpart (`assistant`) always speaks first
- Alternate between assistant and user turns
- Each user turn should be 1–4 sentences — realistic text-chat length
- Do not break character for either speaker
- The negotiation must end with an explicit agreement (ACCO) within the ZOPA
- Timestamps can be sequential with 1-minute gaps

---

## Example User Message

To generate a transcript, send:

```
Generate a [LOW / MID / HIGH] skill participant transcript for the [salary negotiation / apartment rent] scenario.
```

---

## Validation Checklist

After generating all 6 transcripts, code each using `coder_prompt.md` and verify:

| Check | Expected result |
|---|---|
| LOW D2 frequency | Near 0 — little or no interest exploration |
| HIGH D2 frequency | ≥ 0.15 — consistent interest exploration |
| LOW D3 positive (MIA) | 0 — no multi-issue offers |
| HIGH D3 positive (MIA) | ≥ 1 — at least one package offer |
| LOW D4 frequency | Near 0 or 1 vague unit |
| HIGH D4 frequency | ≥ 0.10 with ASUB present |
| LOW D5 | PCOM present but no explicit alternative → D2 Negative |
| HIGH D5 | PCOM with explicit alternative → D5 Positive |
| Score distributions | Low, Mid, High profiles should be clearly distinct on all dimensions |

If any dimension shows no differentiation across skill levels, the threshold or code definitions for that dimension need review.
