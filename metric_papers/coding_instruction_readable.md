# Transcript Coding Scheme
## AI Negotiation Simulator — Behavioral Coding Manual

**Theoretical basis:** NegotiAct (Jäckel et al., 2024) · Getting to Yes (Fisher, Ury & Patton, 1981)
**Applies to:** Salary negotiation and apartment rent negotiation transcripts
**Version:** 1.2 (based on `coding_instruction.md` v1.2)

---

## 1. Purpose

This document describes how a negotiation transcript is converted into structured behavioral data. The process has three steps:

1. **Segment** — divide the transcript into the smallest meaningful units of communication
2. **Code** — assign each unit one behavioral label from a 26-code scheme
3. **Map** — link each code to one of five negotiation skill dimensions

The output feeds directly into the scoring rubric (`scoring_rubric.md`), which converts the coded transcript into a Behavioral Quality Score (BQS) for each round.

---

## 2. What Gets Coded — and What Doesn't

Each transcript contains turns from two speakers:
- **Participant (User)** — the human whose negotiation behavior is being evaluated
- **AI Counterpart** — playing the role of hiring manager (salary scenario) or landlord (rent scenario)

**Only participant turns are scored.** AI turns are read and coded for context — for example, to understand what prompted a participant's active listening response — but AI codes never contribute to any score.

Two metadata fields from the transcript are checked before coding begins:
- **Scenario** (`salary_negotiation` or `apartment_rent`) — determines which scenario-specific examples apply
- **AI personality** (`aggressive`, `collaborative`, or `evasive`) — informs interpretation of the AI's moves and what a constructive participant response looks like

---

## 3. Step 1 — Segmenting into Thought Units

Before any labeling happens, each participant turn is divided into **thought units** — the smallest complete communicative act that can stand alone on its own.

A single turn often contains more than one thought unit. For example:

> *"I appreciate you being upfront about the increase. But before we get into numbers — can I ask what's actually driving it? Is it taxes, maintenance, something else?"*

This one turn contains two thought units:
- An acknowledgment of the counterpart's openness → one unit
- A question about the reasons behind the increase → a second unit

**The four segmentation rules:**

| Rule | When to apply | Example |
|---|---|---|
| **Speaker change** | Always — every new speaker begins a new unit | Every AI turn and participant turn is at least one unit |
| **New communicative act** | When the same speaker shifts to a clearly different action within one turn — statement + question, acknowledgment + claim | "I appreciate that. *But* can I ask what's driving the number?" → two units |
| **Same act, new thought** | Two complete separate thoughts of the same type in a row | "What matters most to you in this role? And what's your timeline?" → two units, both questions |
| **Short response** | Brief acknowledgments ("okay," "right," "got it," "sounds good") are always their own unit — never absorbed | "Right. So you're saying the budget is capped at $95k." → two units: short response + active listening |

**The absorption rule:** If a short phrase directly completes or explains the preceding sentence without adding a new communicative act, absorb it. "I want to understand what you're working with here" following "Can I ask what's driving the increase?" is elaboration, not a new act — keep them as one unit.

**Absorption fallback:** Because this is a text-based chat interface, mid-sentence fragments (verbal false starts, half-thoughts) do not occur — participants complete their thoughts before sending. If the four rules above still leave ambiguity, the tie-breaking test is: *can you assign this fragment a code from the 26-code scheme?* If yes, keep it as its own unit. If no code fits, absorb it into an adjacent unit.

---

## 4. Step 2 — The 26-Code Behavioral Taxonomy

The coding scheme uses **27 codes** — 26 selected from NegotiAct (Jäckel et al., 2024) plus one addition (CRIT, see Category C). NegotiAct is a validated taxonomy of 47 codes covering all verbal behavior in negotiations. The retained codes are those most relevant to workplace negotiations (salary and rent). Each thought unit receives exactly one code.

The codes are organized into five categories:

---

### Category A — Information Exchange (9 codes)

These codes capture what kind of information the participant shares or asks for. This is the most important category — *what* someone shares or asks shapes the entire negotiation trajectory.

| Code | Name | What it captures | Example |
|---|---|---|---|
| **PPRI** | Providing Priority-Related Information | Stating what matters most and why — underlying needs, not just positions | *"What I care most about is base certainty, not the bonus — I need to plan around a fixed number."* |
| **APRI** | Asking for Priority-Related Information | Asking the counterpart what they really care about or need | *"Is the $2,400 driven by your actual costs, or where you think the market will bear?"* |
| **PPFI** | Providing Preference-Related Information | Stating a preference between specific options (more concrete than PPRI) | *"I'd prefer a signing bonus over a higher base if the total is the same."* |
| **APFI** | Asking for Preference-Related Information | Asking which of two specific options the counterpart prefers | *"Would a two-year lease help you — would that change things on the rate?"* |
| **PPOS** | Providing Positional Information | Stating a specific demand or limit with no supporting reasoning | *"I need $95,000. That's my number."* |
| **APOS** | Asking for Positional Information | Asking the counterpart to name their specific number or limit | *"What's the maximum you can offer for this role?"* |
| **FACT** | Facts and Additional Information | Sharing neutral factual context without tying it to a specific argument | *"Comparable units in this neighborhood are listed at $2,100–$2,200."* |
| **CLAR** | Clarification | Checking understanding of something the counterpart already said | *"When you say the budget is limited — do you mean for this role specifically, or across the department?"* |
| **EXTQ** | Extension Questions | Open-ended questions inviting the counterpart to elaborate, without asking for a specific type of information | *"What would help you feel comfortable coming down from $2,400?"* |

**Key distinction — PPRI vs. PPFI vs. PPOS:**
- PPRI = *why* something matters ("I need certainty for planning")
- PPFI = *which option* when choices are on the table ("I'd prefer signing bonus over base")
- PPOS = *just the demand* with no reasoning ("My number is $95k")

**Key distinction — FACT vs. SUBS:**
- FACT = "here is data" (no argument attached)
- SUBS = "here is data, *therefore* my position is X" (data + claim)

---

### Category B — Offers (5 codes)

These codes capture how participants make, modify, or respond to concrete proposals.

| Code | Name | What it captures | Example |
|---|---|---|---|
| **SIA** | Single-Issue Activity | An offer, counter-offer, or concession on one issue at a time | *"I can do $91,000."* |
| **MIA** | Multi-Issue Activity | A package offer bundling two or more issues | *"Would you consider $2,150 if I commit to a two-year lease and handle minor repairs?"* |
| **ROM** | Requesting Offer Modification | Asking the counterpart to improve their offer without making a counter-offer | *"Is there any room to move on that number?"* |
| **REJO** | Rejecting Offer | Explicitly declining the counterpart's offer | *"$2,400 is past the point where it makes sense for me to stay."* |
| **ACCO** | Accepting Offer | Explicitly agreeing to the counterpart's offer or a specific term | *"Okay, $89,000 works for me."* |

**Note on MIA:** This is the most important positive signal for the Invent Options dimension. Research (Jäckel et al., 2024) shows multi-issue offers correlate with higher joint gains and trigger more active listening from counterparts.

**Note on SIA vs. PPOS:** The distinction is framing. "I need $91,000" (demand framing) = PPOS. "I can do $91,000" (offer framing) = SIA. Both involve a number, but SIA implies willingness to close; PPOS is a statement of position.

**Note on REJO:** Rejecting an offer is a normal, necessary negotiation act. It is coded to track offer activity but carries no negative scoring weight — it is neutral in the dimension mapping.

---

### Category C — Persuasion (6 codes)

These codes capture how participants argue for their positions and whether they use principled reasoning or pressure.

| Code | Name | What it captures | Example |
|---|---|---|---|
| **SUBS** | Substantiation | Providing reasoning, evidence, or argument to support a position | *"Market rate for this role in this city is $87k–$95k. My ask is within that range."* |
| **ASUB** | Asking for Substantiation | Asking the counterpart to justify or explain their position | *"How did you arrive at that number?"* |
| **CRIT** | Criticism | Dismissing or negatively judging the counterpart's argument, reasoning, or offer — without providing counter-evidence | *"That market data doesn't apply here at all."* / *"Your reasoning doesn't hold up."* |
| **PCOM** | Positional Commitment | Signaling a hard limit or take-it-or-leave-it stance | *"I won't accept anything below $90,000. That's a firm line."* |
| **AVOI** | Avoiding | Deflecting, giving a non-answer, or failing to engage a direct question | AI asks for a specific number; participant responds with general remarks about fairness |
| **ENCO** | Encouragement | Positive reinforcement of the counterpart's reasoning or behavior, without agreeing to terms | *"I appreciate that you're being transparent about the budget constraints."* |

**Note on CRIT vs. NREL:** CRIT attacks the counterpart's *argument* ("that reasoning doesn't hold up"). NREL attacks the *person* ("you're just trying to squeeze me"). If a statement does both, assign NREL — the relational damage takes precedence.

**Note on CRIT reliability:** NegotiAct's validation study found Criticism had the lowest inter-rater agreement of all 47 codes (66.67%). It is easy to confuse with strong PCOM, NEGA, or NREL. When in doubt: if the statement attacks a *claim or piece of evidence*, use CRIT. If it expresses *emotion*, use NEGA. If it attacks the *person or relationship*, use NREL.

**Note on PCOM — context-dependent:** PCOM can be either a sign of positional rigidity or healthy BATNA awareness depending on *when* it appears and *how* it is framed. See Section 6 for the full decision rule.

**Note on SUBS for Objective Criteria:** Only SUBS that references an *external* standard (market data, comparable prices, precedent, the counterpart's own costs) counts as an Objective Criteria indicator. SUBS that justifies a position purely from personal need ("I need this because it's important to me") is coded as SUBS but does not earn Objective Criteria credit.

---

### Category D — Socio-Emotional (6 codes)

These codes capture the relational dimension of the negotiation — how the participant manages the relationship alongside the substance.

| Code | Name | What it captures | Example |
|---|---|---|---|
| **ACLS** | Active Listening | Paraphrasing or reflecting back what the counterpart said to show understanding | *"So what I'm hearing is — the $2,400 reflects real cost increases, but there's also a market positioning element. Is that right?"* |
| **POSA** | Positive Affective Reaction | Expressing positive emotion or goodwill about the negotiation situation | *"I'm really glad we're having this conversation openly."* |
| **NEGA** | Negative Affective Reaction | Expressing frustration, disappointment, or negative emotion | *"I have to say, it's disappointing to see such a large jump after two years."* |
| **PREL** | Positive Relationship Remark | Saying something positive about the ongoing relationship, shared history, or shared interests | *"I've been here two years, never missed a payment, haven't caused you any headaches."* |
| **NREL** | Negative Relationship Remark | Damaging the relationship or framing the counterpart negatively as a person | *"It feels like you're just trying to squeeze as much as you can out of me."* |
| **APOL** | Apologizing | Expressing regret for one's own behavior or the difficulty of the situation | *"I'm sorry if I'm pushing on this — I just need to be honest about where I stand."* |

**Key distinction — ACLS vs. POSA:**
- ACLS = *reflects content* ("So you're saying the cost increases are real...")
- POSA = *expresses feeling* ("I appreciate you being reasonable about this")

**Key distinction — NEGA vs. NREL:**
- NEGA = frustration about the *situation* ("I'm frustrated we're this far apart")
- NREL = negative judgment about the *person* ("You're just trying to squeeze me")

---

### Category E — Process (1 code)

| Code | Name | What it captures |
|---|---|---|
| **SHRT** | Short Response | Brief acknowledgments with no substantive content: "Yes," "No," "Okay," "Right," "Sure," "Got it," "Sounds good," "Fair enough" |

SHRT units are tracked but excluded from all dimension scoring calculations. They represent conversational throughput, not negotiation behavior. If SHRT exceeds 30% of total participant units, it is flagged as a sign of passive engagement.

---

## 5. Step 3 — Mapping Codes to GTY Dimensions

Once coded, each unit is linked to one of five skill dimensions from *Getting to Yes* and marked as a positive or negative signal for that dimension. This conversion is the bridge between behavior and score.

| Code | GTY Dimension | Signal |
|---|---|---|
| **D1 — Separate People from Problem** | | |
| ACLS | Separate People from Problem | ✅ Positive |
| POSA | Separate People from Problem | ✅ Positive |
| ENCO | Separate People from Problem | ✅ Positive |
| PREL | Separate People from Problem | ✅ Positive |
| CLAR | Separate People from Problem | ✅ Positive |
| APOL | Separate People from Problem | ✅ Positive |
| NEGA | Separate People from Problem | ❌ Negative |
| NREL | Separate People from Problem | ❌ Negative |
| **D2 — Interests Not Positions** | | |
| PPRI | Interests Not Positions | ✅ Positive |
| APRI | Interests Not Positions | ✅ Positive |
| PPFI | Interests Not Positions | ✅ Positive |
| APFI | Interests Not Positions | ✅ Positive |
| EXTQ | Interests Not Positions | ✅ Positive |
| PPOS | Interests Not Positions | ❌ Negative |
| APOS | Interests Not Positions | ❌ Negative |
| ROM | Interests Not Positions | ❌ Negative |
| AVOI | Interests Not Positions | ❌ Negative |
| **D3 — Invent Options for Mutual Gain** | | |
| MIA | Invent Options for Mutual Gain | ✅ Positive (primary) |
| ACCO | Invent Options for Mutual Gain | ✅ Positive (only when accepting a MIA) |
| SIA | Invent Options for Mutual Gain | ❌ Negative |
| **D4 — Objective Criteria** | | |
| SUBS | Objective Criteria | ✅ Positive (only with external reference) |
| FACT | Objective Criteria | ✅ Positive |
| ASUB | Objective Criteria | ✅ Positive |
| CRIT | Objective Criteria | ❌ Negative |
| **D5 — BATNA Awareness** | | |
| PCOM | BATNA Awareness | ⚠️ Context-dependent (see Section 6) |
| **Neutral — no dimension signal** | | |
| REJO | — | Neutral (tracks offer activity; not scored) |
| SHRT | — | Neutral (excluded from scoring) |

**Why some codes are negative:** Negative indicators don't mean the behavior is *wrong* — they mean it pulls the dimension score down if it dominates. Making offers (SIA) is necessary, but if *all* a participant does is make single-issue offers with no interest exploration, that indicates weak performance on D2 and D3. The ratio of positive to negative codes tells the story.

**Coverage check — all 27 codes accounted for:** D1 (8 codes: ACLS, POSA, ENCO, PREL, CLAR, APOL, NEGA, NREL) · D2 (9 codes: PPRI, APRI, PPFI, APFI, EXTQ, PPOS, APOS, ROM, AVOI) · D3 (3 codes: MIA, ACCO, SIA) · D4 (4 codes: SUBS, FACT, ASUB, CRIT) · D5 (1 code: PCOM) · Neutral (2 codes: REJO, SHRT) = 27 total.

---

## 6. Key Design Decisions

### 6.1 PCOM — The Context-Dependent Code

Positional Commitment (PCOM) is the only code that requires reading the surrounding transcript before assigning it to a dimension. The same statement can be either a sign of positional rigidity *or* healthy BATNA awareness depending on timing and framing.

**The decision rule — applied in order:**

| Condition | Classification |
|---|---|
| PCOM appears before any interest exploration (APRI, PPRI, APFI, PPFI, EXTQ) | Interests Not Positions — **Negative** |
| PCOM appears after interest exploration AND references an explicit outside alternative ("another offer," "three other apartments") | BATNA Awareness — **Positive** |
| PCOM appears after interest exploration but references NO outside alternative | Interests Not Positions — **Negative** (a commitment without an alternative is still positional) |
| PCOM is phrased as a threat or ultimatum with no prior relationship building | BATNA Awareness — **Negative** |

**The intuition:** A skilled negotiator establishes mutual understanding before signaling their walk-away point. The same information ("I have another offer at $92k") lands very differently as an opening gambit vs. as honest transparency after rapport has been built.

---

### 6.2 D3 Supplementary Indicators

The Invent Options dimension is primarily scored on **MIA** (multi-issue offers). But novice negotiators often begin to think in multi-issue terms before they're ready to make a formal package proposal. Three codes carry a secondary signal for D3 when used in a specific way:

| Code | Counts as D3 supplementary when... | Does NOT count when... |
|---|---|---|
| **PPFI** | The preference involves trading *across* multiple issues ("I'd prefer lower base with a longer-term guarantee") | It's a preference along a single dimension ("I prefer morning meetings") |
| **APFI** | The question directly probes whether a multi-issue package is possible ("Would a two-year lease change what rent you'd accept?") | It's asking which of two single-issue options the counterpart prefers |
| **EXTQ** | The question is specifically inviting the counterpart to expand the issue space ("What else might make this work, beyond just the number?") | It's a general open-ended question about interests |

These supplementary indicators don't replace MIA in the primary frequency calculation — they serve as a qualitative adjustment signal, capturing developmental movement toward multi-issue thinking even before formal packages appear.

---

### 6.3 Why REJO Is Neutral

In an earlier version of this scheme, REJO (Rejecting Offer) was classified as a negative indicator for Interests Not Positions. This was revised because rejecting an offer is a normal, necessary act in every negotiation. A participant who explores interests thoroughly but also rejects several inadequate offers was being penalized — the ratio calculation conflated active negotiating behavior with positional rigidity.

REJO is now coded to track offer activity but carries no scoring weight in any dimension.

---

## 7. A Brief Worked Example

The following is a real participant turn from a salary negotiation transcript. It demonstrates how segmentation and coding work together.

**Raw turn:**
> *"Yeah, I figured we'd be having this conversation. I appreciate you being upfront about it. But before we get into numbers — can I ask what's actually driving the increase? Like, is it taxes, maintenance costs, something else? I want to understand what you're working with here."*

**Segmentation:**

| Unit | Text | Reasoning |
|---|---|---|
| A | "Yeah, I figured we'd be having this conversation. I appreciate you being upfront about it." | Acknowledgment + positive affect — two short related statements forming one relational act |
| B | "But before we get into numbers — can I ask what's actually driving the increase? Like, is it taxes, maintenance costs, something else?" | New communicative act: question about the counterpart's interests |
| C | "I want to understand what you're working with here." | Absorbed into B — elaborates the same question, cannot stand alone |

**Coding:**

| Unit | Code | Dimension | Signal | Reasoning |
|---|---|---|---|---|
| A | POSA | Separate People | ✅ Positive | Positive affect about the situation and the counterpart's behavior |
| B | APRI | Interests Not Positions | ✅ Positive | Asking what is driving the counterpart's position — interest exploration, not asking for a number |

**Result:** This two-unit turn contributes one positive signal to D1 (Separate People) and one positive signal to D2 (Interests Not Positions). It is a strong opening — the participant is building relationship and exploring interests before any offer exchange begins.

---

## 8. Coding Output Format

After coding a transcript, the output is a **sequential code list** — one row per thought unit, in order. This single list contains everything the scoring rubric needs: codes, dimension assignments, directions, and positions.

```
CODING OUTPUT

Transcript ID:    [run_id from MongoDB]
Scenario:         [salary_negotiation / apartment_rent]
Personality:      [aggressive / collaborative / evasive]
Total user units: [number]
SHRT units:       [number]
Scoreable units:  [total minus SHRT — denominator for all frequency calculations]

--- SEQUENTIAL CODE LIST ---

Unit | Code | Dimension      | Direction
-----|------|----------------|----------
1    | POSA | D1             | Positive
2    | ACLS | D1             | Positive
3    | APRI | D2             | Positive
4    | PPOS | D2             | Negative
5    | SHRT | Neutral        | —
6    | FACT | D4             | Positive
7    | ASUB | D4             | Positive
8    | APFI | D2 / D3-supp   | Positive
9    | SIA  | D3             | Negative
10   | PCOM | D5             | Positive
11   | SUBS | D4             | Positive
12   | SUBS | D4-excl        | —
13   | REJO | Neutral        | —
14   | MIA  | D3             | Positive
...  | ...  | ...            | ...
```

**D2 / D3-supp:** Used when APFI, PPFI, or EXTQ qualifies as a D3 supplementary indicator (see Section 6.2). The unit counts as D2 Positive for scoring and is additionally flagged for the D3 qualitative adjustment.

**D4-excl:** Used for SUBS units that are self-referential and do not qualify as D4 Positive. The unit is tracked so the scorer can confirm the D4 frequency denominator is correct.

--- DEAL OUTCOME ---

Agreement reached:  [Yes / No]
Final deal value:   [number with unit, e.g. "$96,500" or "$2,150/month" — or "N/A" if no agreement]

Note: The coder extracts the final agreed value from the last ACCO unit or the closing exchange. The ZOPA floor and ceiling are defined per scenario in the scoring rubric (Section 11) — the scorer applies the formula post-hoc.
```

---

## 9. Reliability Standard

Because this coding scheme is applied by an AI, inter-rater reliability must be validated before analysis. A human researcher independently codes a random sample of transcripts (15–20% of the total) using this document, and Cohen's Kappa is computed between human and AI assignments.

Target: **κ ≥ .70** (Weingart et al., 2004). This threshold indicates substantial agreement and is the standard for coding-based negotiation research.

Any systematic disagreements between human and AI coders are reviewed, the relevant decision boundary is clarified in this document, and affected transcripts are re-coded before final analysis.

---

*This document should be read alongside `scoring_rubric.md`, which describes how coded transcripts are converted into dimension scores and a composite Behavioral Quality Score.*
