# Document 1: Coding Instruction Document
## AI Negotiation Simulator — Transcript Coding Scheme

**Version 1.2**
**Theoretical basis:** NegotiAct (Jäckel et al., 2024) + Getting to Yes (Fisher, Ury & Patton, 1981)
**Applies to:** Salary negotiation and apartment rent negotiation transcripts
**Scorer:** AI analyst (Claude Sonnet 4.6)

**Changes from v1.1:**
- Section 1: Input format updated to reflect actual MongoDB JSON schema (was fictional plain-text format)
- Section 4: REJO reclassified from Interests Not Positions (Negative) → N/A (Neutral); rejecting an offer is a normal negotiation act, not inherently positional

**Changes from v1.0:**
- Section 3: Added PPFI and EXTQ as supplementary positive indicators for Invent Options for Mutual Gain (D3 sensitivity improvement)
- Section 4: GTY Dimension Lookup Table updated to reflect D3 indicator additions
- Section 4: PCOM annotation clarified with explicit sequencing rule

---

## Section 1 — How to Read the Transcript

### 1.1 Input Format

Transcripts are retrieved directly from the MongoDB `transcripts` collection. Each document has the following JSON structure:

```json
{
  "run_id": "uuid-string",
  "scenario_id": "salary_negotiation" | "apartment_rent",
  "scenario_name": "Salary Negotiation" | "Apartment Rent Negotiation",
  "personality_id": "aggressive" | "collaborative" | "evasive",
  "personality_name": "Aggressive" | "Collaborative" | "Evasive",
  "user_id": "participant-email",
  "started_at": "ISO-8601 timestamp",
  "exported_at": "ISO-8601 timestamp",
  "messages": [
    {
      "role": "assistant" | "user",
      "text": "...",
      "timestamp": "ISO-8601 timestamp"
    }
  ]
}
```

**What to read before coding:**
- `scenario_id` — determines which scenario-specific examples and decision rules apply throughout this document
- `personality_id` — provides context for interpreting AI behavior (e.g., an aggressive counterpart will produce more pressure moves, which affects what counts as constructive user response)
- `messages` — the ordered conversation; process in array order (index 0 first)

### 1.2 Speaker Identification

Each message in the `messages` array has a `role` field:

- **`role: "user"`** — the human participant whose negotiation behavior is being evaluated
- **`role: "assistant"`** — the AI counterpart playing the role of landlord (`apartment_rent`) or hiring manager/employer (`salary_negotiation`)

All code examples in this document use `[User]` and `[AI]` as shorthand for these roles.

### 1.3 Scoring Rule

**Only `role: "user"` turns contribute to dimension scores.**

`role: "assistant"` turns are still coded because they provide essential context for interpreting the user's responses. A user's active listening code only makes sense if you can see what the AI said that prompted it. However, AI turn codes are never counted in frequency calculations or ratio signals. They serve as context anchors only.

### 1.4 Turn vs Thought Unit

A **turn** is everything one speaker says before the other speaker responds. A single turn may contain multiple **thought units**. The segmentation rules in Section 2 explain how to divide turns into thought units. All coding happens at the thought unit level, not the turn level.

---

## Section 2 — Thought Unit Segmentation Rules

A thought unit is the smallest meaningful segment of speech that can stand alone as a complete communicative act. Each thought unit receives exactly one code.

Apply the following four rules in order. When a rule triggers, begin a new thought unit.

---

### Rule 1 — Speaker Change

Every time the speaker changes, a new thought unit begins regardless of content length or topic continuity.

**Example:**
```
[AI]: I'm looking at $2,400 a month going forward.
[User]: I figured we'd be having this conversation.
```
→ The AI statement is one thought unit. The user statement is a new thought unit. Two units total.

---

### Rule 2 — New Communicative Act Within Same Turn

If a speaker performs two distinct communicative acts within one turn, they become two separate thought units. The test is: **could each statement stand alone and still make complete sense without the other?**

Common signals that a new communicative act is beginning within a turn:
- A conjunction that introduces a new direction: "But...", "And...", "So...", "However..."
- A topic shift within the same turn
- A statement followed by a question
- An acknowledgment followed by a substantive claim

**Example from sample transcript — User Turn 2:**

```
[User]: Yeah, I figured we'd be having this conversation. 
        I appreciate you being upfront about it.
        But before we get into numbers — can I ask what's 
        actually driving the increase? Like, is it taxes, 
        maintenance costs, something else? I want to understand 
        what you're working with here.
```

This turn contains three thought units:
- **Unit A:** "Yeah, I figured we'd be having this conversation. I appreciate you being upfront about it." → acknowledgment and positive relationship remark
- **Unit B:** "But before we get into numbers — can I ask what's actually driving the increase? Like, is it taxes, maintenance costs, something else?" → asking for priority-related information
- **Unit C:** "I want to understand what you're working with here." → this reinforces Unit B's intent and is absorbed into Unit B as a single complete act. It does not stand alone meaningfully. **Do not split it.**

**The absorption rule:** If a short sentence directly explains or completes the preceding sentence and cannot stand alone as a communicative act, absorb it into the preceding unit rather than creating a new one.

---

### Rule 3 — Same Code Category, New Complete Thought

If a speaker performs the same type of communicative act twice in a row but expresses two genuinely separate thoughts, these become two thought units even though they share the same code.

**Example:**
```
[User]: Can I ask what's driving the increase? 
        And can you tell me what your floor is?
```
→ Two separate questions = two thought units, both coded as asking for priority-related information.

**Counter-example:**
```
[User]: Can I ask what's driving the increase — 
        like, is it taxes or market rate?
```
→ One question with elaboration = one thought unit. The "like, is it taxes or market rate?" is a clarification of the same question, not a new question.

---

### Rule 4 — Short Responses

Single words or brief acknowledgments that do not carry substantive new information are coded as their own thought unit under the **short response** code. Do not absorb them into adjacent units.

Short responses include: "Yes," "No," "Okay," "Right," "Sure," "I see," "Got it," "Sounds good," "Fair enough," "Alright."

**Example from sample transcript — User Turn 9:**
```
[User]: Thursday works for me. I'll hold off on anything 
        else until then.
```
→ "Thursday works for me." → short response  
→ "I'll hold off on anything else until then." → substantive commitment → positional commitment

Two thought units.

**Important:** Short responses that are followed immediately by substantive content in the same turn should still be separated from that content as their own unit.

---

### Rule 5 — Minimum Unit Length

If after applying all rules you produce a thought unit of fewer than four words that is not a short response (Rule 4), reconsider whether it should be absorbed into an adjacent unit. Very short fragments that express incomplete thoughts are not valid thought units on their own.

---

## Section 3 — The Code Set

The following 26 codes are retained from NegotiAct for use in this coding scheme. Codes are organized by category. Each code definition is followed by examples from both scenarios and a decision boundary to prevent common misclassification.

---

### Category 1 — Information Exchange

#### 1. Providing Priority-Related Information (PPRI)

**Definition:** The speaker states the relative importance of issues to them — what matters more or less, what their core concerns are, or what their underlying needs are behind their stated position.

**Salary example:** "What I care most about is the base salary, not the bonus structure — I need the certainty."

**Rent example:** "Honestly, staying in this neighborhood matters more to me than the price difference — my kids are in school nearby."

**What it is NOT:** Stating a specific number or demand (that is Single-Issue Activity). Explaining why costs have gone up (that is Facts/Additional Information from the AI side, or Substantiation from the user side).

**Decision boundary:** If the speaker is saying **what matters to them and why**, it is PPRI. If they are saying **what they want as a specific term**, it is Single-Issue Activity.

---

#### 2. Asking for Priority-Related Information (APRI)

**Definition:** The speaker asks the other party what their priorities, core concerns, or underlying needs are.

**Salary example:** "What's most important to you in filling this role — speed of hire, or finding someone with a specific background?"

**Rent example:** "Is the $2,400 number coming from your actual costs, or from where you think the market will bear? Because those are different problems."

**What it is NOT:** Asking for a specific number or offer (that is Requesting Action). Asking for justification of a position already stated (that is Asking for Substantiation).

**Decision boundary:** If the question is exploring **what the other party values or needs**, it is APRI. If it is asking **why they took a specific position they already stated**, it is Asking for Substantiation.

> **Note:** This is one of the most important positive indicators for the Interests Not Positions dimension. Flag every instance.

---

#### 3. Providing Preference-Related Information (PPFI)

**Definition:** The speaker states their preference between specific options or along a specific dimension, without framing it as a priority or need. More concrete than PPRI — about specific terms rather than underlying concerns.

**Salary example:** "I'd prefer a signing bonus over a higher base if the total comes out the same."

**Rent example:** "I'd rather do a two-year lease than a one-year if that gives us more flexibility on the rate."

**What it is NOT:** Stating an underlying need or core concern (that is PPRI). Making a specific offer (that is Single-Issue Activity or Multi-Issue Activity).

**Decision boundary:** PPRI is about **why** something matters. PPFI is about **which option** is preferred when options are already on the table.

> **Note (v1.1 addition):** PPFI is now also a supplementary positive indicator for Invent Options for Mutual Gain (D3) when the preference being expressed involves bundling or trading across multiple issues. See Section 4 GTY Lookup Table.

---

#### 4. Asking for Preference-Related Information (APFI)

**Definition:** The speaker asks the other party which of two or more specific options they prefer.

**Salary example:** "Would you prefer to structure this as a higher base with smaller bonus, or a lower base with performance upside?"

**Rent example:** "Would a longer lease term help you — like if I committed to two years, would that change things?"

**What it is NOT:** Asking what the other party cares about in general (that is APRI). Asking for their specific number (that is Requesting Action).

---

#### 5. Providing Positional Information (PPOS)

**Definition:** The speaker states their position — a specific number, term, or demand — without grounding it in interests, priorities, or objective criteria. Pure positional statement.

**Salary example:** "I need $95,000. That's my number."

**Rent example:** "I won't go above $2,100. That's my limit."

**What it is NOT:** A position accompanied by reasoning or justification (that would be PPOS + Substantiation as two separate units, or just Substantiation if the reasoning is the dominant act). A position that references market data (that leans toward Substantiation with objective criteria).

**Decision boundary:** If the statement is **just the number or demand with no support**, it is PPOS. If it comes with reasoning, the reasoning portion is a separate unit coded as Substantiation.

---

#### 6. Asking for Positional Information (APOS)

**Definition:** The speaker asks the other party to state their specific position, number, or demand.

**Salary example:** "What's the maximum you can offer for this role?"

**Rent example:** "Is there a floor you know you need to hit?"

**What it is NOT:** Asking about priorities or interests (that is APRI). Asking for justification (that is Asking for Substantiation).

---

#### 7. Facts and Additional Information (FACT)

**Definition:** The speaker provides factual information relevant to the negotiation that does not directly state their own position, priority, or preference. Background context, market data, or situational facts.

**Salary example:** "The average salary for this role in this city is around $88,000 according to Glassdoor."

**Rent example:** "Comparable units in this neighborhood are listed between $2,100 and $2,200."

**What it is NOT:** Using facts to justify a specific position (that is Substantiation). Providing facts about one's own needs (that is PPRI or PPFI).

**Decision boundary:** FACT is neutral information provision. Substantiation uses information to support a specific argument or position. If the speaker says "here's data" without tying it to a claim, it is FACT. If they say "here's data, therefore my position is X," it is Substantiation.

---

#### 8. Clarification (CLAR)

**Definition:** The speaker checks their understanding of something the other party said, or asks the other party to confirm or elaborate on a specific point already made.

**Salary example:** "Just to make sure I understand — when you say the budget is limited, do you mean for this role specifically or across the department?"

**Rent example:** "So when you say you'll get back to me Thursday — you mean with an actual number, not just to continue the conversation?"

**What it is NOT:** Asking for new information not yet discussed (that is APRI or APFI). Paraphrasing to show understanding (that is Active Listening).

---

#### 9. Extension Questions (EXTQ)

**Definition:** The speaker asks an open-ended question that invites the other party to elaborate or expand on something, without requesting a specific type of information.

**Salary example:** "Can you tell me more about how the compensation structure works here?"

**Rent example:** "What would help you feel comfortable coming down from $2,400?"

**What it is NOT:** A specific question about priorities (APRI) or preferences (APFI). A clarification of something already said (CLAR).

**Decision boundary:** If you can classify a question as APRI or APFI, do that instead. Use EXTQ only when the question is genuinely open-ended and doesn't fit a more specific information code.

> **Note (v1.1 addition):** EXTQ is now also a supplementary positive indicator for Invent Options for Mutual Gain (D3) when it is directed at exploring whether additional issues or creative packages are possible. See the D3 supplementary indicator rule in Section 4.

---

### Category 2 — Offers

#### 10. Single-Issue Activity (SIA)

**Definition:** The speaker makes, modifies, or counters an offer that addresses only one negotiable issue at a time.

**Salary example:** "I can do $91,000."

**Rent example:** "I could go to $2,200."

**What it is NOT:** An offer that bundles two or more issues (that is Multi-Issue Activity). A demand stated without offer framing (that is PPOS).

**Decision boundary:** SIA requires offer framing — it must be presented as a proposal the other party could accept. "I need $91,000" is PPOS. "I can do $91,000" is SIA.

---

#### 11. Multi-Issue Activity (MIA)

**Definition:** The speaker makes or proposes an offer that bundles two or more negotiable issues together in a single package.

**Salary example:** "What if we do $88,000 base but with a guaranteed $5,000 performance bonus at six months?"

**Rent example:** "Would you consider $2,150 if I commit to a two-year lease and handle my own minor repairs?"

**What it is NOT:** Two separate single-issue offers made in sequence (that is two SIA units). A discussion of possible options without a concrete proposal (that is generating creative options, coded as EXTQ or Substantiation).

> **Note:** MIA is the primary positive indicator for the Invent Options for Mutual Gain dimension. Research shows multi-issue offers trigger active listening and correlate with joint gains (Jäckel et al., 2024).

---

#### 12. Requesting Offer Modification (ROM)

**Definition:** The speaker asks the other party to revise or improve their current offer without making a counter-offer themselves.

**Salary example:** "Can you do any better than $85,000?"

**Rent example:** "Is there any room to move on that number?"

**What it is NOT:** Making a counter-offer (that is SIA or MIA). Asking for a specific number (that is APOS).

---

#### 13. Rejecting Offer (REJO)

**Definition:** The speaker explicitly declines the other party's offer or position.

**Salary example:** "I can't accept $82,000 — that doesn't work for me."

**Rent example:** "$2,400 is past the point where it makes sense for me to stay."

**What it is NOT:** Expressing dissatisfaction without explicitly rejecting (that may be Negative Affective Reaction). Stating a limit without rejecting a specific offer (that is PPOS).

---

#### 14. Accepting Offer (ACCO)

**Definition:** The speaker explicitly agrees to the other party's offer or a specific term.

**Salary example:** "Okay, $89,000 works for me."

**Rent example:** "Thursday works for me." *(when Thursday is a proposed meeting time)*

**What it is NOT:** A conditional acceptance (that is SIA or MIA with conditions attached). A short acknowledgment that isn't an agreement (that is Short Response).

---

### Category 3 — Persuasion

#### 15. Substantiation (SUBS)

**Definition:** The speaker provides reasoning, evidence, or argument to support a position, demand, or proposal. This is the primary vehicle for objective criteria use.

**Salary example:** "I've been benchmarking salaries for this role and the market rate in this city is between $87,000 and $95,000 for someone at my level. My ask is within that range."

**Rent example:** "When I look at comparable units nearby, I'm seeing them listed in the $2,100 to $2,200 range. So $2,400 seems above what the market is actually showing."

**What it is NOT:** Providing neutral facts without connecting them to a position (that is FACT). Stating a position without reasoning (that is PPOS or SIA).

**Decision boundary:** Substantiation requires both a **claim** and **support for that claim**. If only one is present, code appropriately (FACT for support alone, PPOS/SIA for claim alone).

---

#### 16. Asking for Substantiation (ASUB)

**Definition:** The speaker asks the other party to explain or justify their position, offer, or claim.

**Salary example:** "How did you arrive at that number?"

**Rent example:** "Is the $2,400 number coming from your cost increases, or from where you think you can get on the open market?"

**What it is NOT:** Asking about priorities or interests (that is APRI). Asking for clarification of something already explained (that is CLAR).

> **Note:** This is a strong positive indicator for Objective Criteria. A user who asks for substantiation is pushing the negotiation toward principled reasoning rather than positional haggling.

---

#### 17. Positional Commitment (PCOM)

**Definition:** The speaker explicitly commits to a position and signals they will not move from it, either by stating a hard limit or by making a take-it-or-leave-it declaration.

**Salary example:** "I won't accept anything below $90,000. That's a firm line for me."

**Rent example:** "If the number is still $2,400 on Thursday, I'm probably going to have to make a different call."

**What it is NOT:** Stating a preference without committing (that is PPFI or PPOS). Describing a BATNA option without framing it as a commitment (that is PPRI or FACT).

**Decision boundary:** PCOM is a **signal of rigidity**. It closes off movement. The language of limits ("won't go above," "firm line," "have to walk away") is a reliable signal.

> **Note:** PCOM is a **context-dependent code** — its dimension assignment depends on the surrounding transcript. See Section 4 annotation for full decision rules.

---

#### 18. Avoiding (AVOI)

**Definition:** The speaker deflects, changes the subject, gives a non-answer, or fails to engage with a direct question or proposal from the other party.

**Salary example:** AI asks "What's your current salary?" User responds "I'd rather focus on the value I'd bring to the role."

**Rent example:** AI asks for a specific number the user would accept; user responds with a general statement about fairness without giving a number.

**What it is NOT:** Legitimate redirection toward interests (that is PPRI). Strategic silence (coded as Short Response). Procedural delay that is acknowledged openly (that is Time Management).

---

#### 19. Encouragement (ENCO)

**Definition:** The speaker expresses positive reinforcement toward the other party's position, reasoning, or behavior — without agreeing to specific terms.

**Salary example:** "I appreciate that you're being transparent about the budget constraints."

**Rent example:** "I appreciate you being upfront about what's driving the increase."

**What it is NOT:** Positive relationship remarks about the relationship itself (that is Positive Relationship Remark). Accepting an offer (that is ACCO).

---

### Category 4 — Socio-Emotional

#### 20. Active Listening (ACLS)

**Definition:** The speaker paraphrases, reflects back, or summarizes what the other party just said to demonstrate understanding — or produces a brief paraverbal acknowledgment that signals attention and comprehension.

**Salary example:** "So what I'm hearing is that the budget is constrained right now but there might be flexibility on the bonus side — is that right?"

**Rent example:** "Okay, so it's a combination of tax increases, higher insurance, and market shift — that makes sense."

**What it is NOT:** Simply agreeing with the other party (that is ACCO or Short Response). Asking a follow-up question (that is APRI, APFI, or EXTQ). Expressing sympathy (that is Positive Affective Reaction).

**Decision boundary:** Active listening must contain a **reflection or paraphrase** of the other party's content. "I hear you" alone is a Short Response. "I hear you — so you're saying the cost increases are real but the $2,400 is also partly market positioning" is Active Listening.

---

#### 21. Positive Affective Reaction (POSA)

**Definition:** The speaker expresses positive emotion, satisfaction, or goodwill about the negotiation situation or the other party's behavior.

**Salary example:** "I'm really glad we're having this conversation openly."

**Rent example:** "I appreciate you being reasonable about this."

**What it is NOT:** Encouragement directed at a specific statement or argument (that is ENCO). Active Listening that reflects content (that is ACLS). Positive relationship remarks about the ongoing relationship (that is PREL).

---

#### 22. Negative Affective Reaction (NEGA)

**Definition:** The speaker expresses frustration, disappointment, or negative emotion about the negotiation or the other party's behavior.

**Salary example:** "Honestly, I'm frustrated that we're this far apart after everything we discussed."

**Rent example:** "I have to say, it's disappointing to see such a large jump after two years of being a good tenant."

**What it is NOT:** A firm positional statement (that is PCOM). Criticism of the other party's reasoning (that is Asking for Substantiation or REJO).

---

#### 23. Positive Relationship Remark (PREL)

**Definition:** The speaker says something positive about the ongoing relationship between the parties, their history together, or their shared interests as people.

**Salary example:** "I really do want to be here long-term — this isn't just about the number for me."

**Rent example:** "I've been here two years, never missed a payment, haven't caused you any headaches."

**What it is NOT:** Expressing positive emotion about the current conversation (that is POSA). Encouragement about a specific argument (that is ENCO).

> **Note:** PREL is a positive indicator for the Separate People from Problem dimension because it explicitly acknowledges the human relationship alongside the substantive issue.

---

#### 24. Negative Relationship Remark (NREL)

**Definition:** The speaker says something that damages or threatens the relationship, implies distrust, or frames the other party negatively as a person.

**Salary example:** "I feel like the company just doesn't value what I bring."

**Rent example:** "It feels like you're just trying to squeeze as much as you can out of me."

**What it is NOT:** Rejecting a specific offer (that is REJO). Expressing frustration about the situation (that is NEGA).

---

#### 25. Apologizing (APOL)

**Definition:** The speaker expresses regret or apology, either for their own behavior or for the difficulty of the situation.

**Salary example:** "I'm sorry if I'm pushing on this — I just need to be honest about where I stand."

**Rent example:** "I don't want to pressure you on this."

---

### Category 5 — Process

#### 26. Short Response (SHRT)

**Definition:** A brief utterance of fewer than approximately eight words that acknowledges receipt of information, confirms a procedural point, or expresses minimal reaction, without carrying substantive new content.

**Examples:** "Yes," "No," "Okay," "Right," "Sure," "I see," "Got it," "Sounds good," "Fair enough," "Thursday works for me," "That makes sense," "I'll hold off on anything else until then."

**What it is NOT:** A substantive statement that happens to be short. "I won't move from $2,100" is PCOM, not SHRT, even though it is brief.

**Decision boundary:** Ask: does this utterance add new information, make a commitment, or perform a communicative act beyond acknowledging? If yes, assign the appropriate substantive code. If no, assign SHRT.

---

## Section 4 — GTY Dimension Lookup Table

The following table maps every retained code to one of the five Getting to Yes dimensions and specifies whether it is a positive or negative indicator of that dimension.

Codes marked **Context** require interpretation of the surrounding transcript to determine indicator direction and are explained in the annotation below the table.

Codes marked **D3 Supplementary** are primarily assigned to another dimension but also carry a weaker secondary signal for Invent Options (D3) under specific conditions explained in the D3 Supplementary Indicator annotation below.

| Code | Full Name | GTY Dimension | Indicator |
|------|-----------|---------------|-----------|
| PPRI | Providing Priority-Related Information | Interests Not Positions | Positive |
| APRI | Asking for Priority-Related Information | Interests Not Positions | Positive |
| PPFI | Providing Preference-Related Information | Interests Not Positions | Positive; D3 Supplementary |
| APFI | Asking for Preference-Related Information | Interests Not Positions | Positive; D3 Supplementary |
| PPOS | Providing Positional Information | Interests Not Positions | Negative |
| APOS | Asking for Positional Information | Interests Not Positions | Negative |
| FACT | Facts and Additional Information | Objective Criteria | Positive |
| CLAR | Clarification | Separate People from Problem | Positive |
| EXTQ | Extension Questions | Interests Not Positions | Positive; D3 Supplementary |
| SIA | Single-Issue Activity | Invent Options for Mutual Gain | Negative |
| MIA | Multi-Issue Activity | Invent Options for Mutual Gain | Positive (Primary) |
| ROM | Requesting Offer Modification | Interests Not Positions | Negative |
| REJO | Rejecting Offer | N/A | Neutral |
| ACCO | Accepting Offer | Invent Options for Mutual Gain | Positive (conditional — see D3 note) |
| SUBS | Substantiation | Objective Criteria | Positive |
| ASUB | Asking for Substantiation | Objective Criteria | Positive |
| PCOM | Positional Commitment | BATNA Awareness | Context |
| AVOI | Avoiding | Interests Not Positions | Negative |
| ENCO | Encouragement | Separate People from Problem | Positive |
| ACLS | Active Listening | Separate People from Problem | Positive |
| POSA | Positive Affective Reaction | Separate People from Problem | Positive |
| NEGA | Negative Affective Reaction | Separate People from Problem | Negative |
| PREL | Positive Relationship Remark | Separate People from Problem | Positive |
| NREL | Negative Relationship Remark | Separate People from Problem | Negative |
| APOL | Apologizing | Separate People from Problem | Positive |
| SHRT | Short Response | N/A | Neutral |

---

### Annotation 1: PCOM as Context-Dependent Code

PCOM (Positional Commitment) requires special handling because it can indicate either **poor BATNA management** or **good BATNA management** depending on how it is used.

**PCOM as negative indicator — Interests Not Positions:**
When PCOM appears early in the negotiation without prior interest exploration, or when it is used aggressively as a pressure tactic without acknowledging the other party's constraints, it signals positional behavior.

**PCOM as positive indicator — BATNA Awareness:**
When PCOM appears after the user has already explored interests and offered alternatives, and when it is framed as a transparent statement of the user's genuine alternative rather than a threat, it signals healthy BATNA awareness.

**Coding rule for PCOM — apply in order:**

1. Count how many APRI, PPRI, APFI, PPFI, or EXTQ units appear **before** this PCOM unit in the transcript. Call this the **prior interest exploration count**.
2. If prior interest exploration count = 0 → assign to **Interests Not Positions, Negative**
3. If prior interest exploration count ≥ 1 AND PCOM contains explicit reference to an outside alternative (another job offer, another apartment, a specific price range elsewhere) → assign to **BATNA Awareness, Positive**
4. If prior interest exploration count ≥ 1 but PCOM contains NO explicit alternative reference → assign to **Interests Not Positions, Negative** (commitment without alternative is positional, not BATNA-aware)
5. If PCOM is phrased as a threat or ultimatum ("accept or I walk") with no prior interest exploration → assign to **BATNA Awareness, Negative**

**Sequencing is the key test.** A PCOM unit that follows meaningful interest exploration and references a specific alternative is BATNA Positive. The same PCOM unit appearing as the first user statement would be Interests Negative.

---

### Annotation 2: SHRT Units

SHRT units are excluded from all dimension frequency and ratio calculations. They represent procedural throughput rather than negotiation behavior. However, a proportion of SHRT units above 30% of total user units may indicate a passive negotiating style worth flagging in the debrief.

---

### Annotation 3: D3 Supplementary Indicators (v1.1)

Three codes carry a supplementary signal for Invent Options for Mutual Gain (D3) under specific conditions. These codes are not primary D3 indicators — they are **precursor behaviors** that show the user is beginning to think in multi-issue terms even before making a concrete MIA proposal.

**PPFI as D3 Supplementary:**
Count PPFI as a secondary D3 positive indicator only when the preference being stated involves trading across multiple issues. Example: "I'd prefer a lower base with a longer-term guarantee than a higher base with no security" — this is expressing a preference that involves two dimensions and shows multi-issue thinking.
Do NOT count PPFI as D3 supplementary when it expresses a preference along a single dimension (e.g., "I prefer evenings for the meeting").

**APFI as D3 Supplementary:**
Count APFI as a secondary D3 positive indicator only when the question explicitly probes whether a multi-issue package is possible. Example: "Would a longer lease commitment change what rent you'd accept?" — this is directly testing whether bundling is viable.
Do NOT count APFI as D3 supplementary when it is simply asking which of two single-issue options the counterpart prefers.

**EXTQ as D3 Supplementary:**
Count EXTQ as a secondary D3 positive indicator only when the question is directed at uncovering whether additional negotiable dimensions exist. Example: "What else might make this work for you, beyond just the number?" — this is an invitation to expand the issue space.
Do NOT count EXTQ as D3 supplementary when it is a general open-ended question about interests or preferences.

**Important:** D3 supplementary indicators are counted separately from primary MIA indicators. In the D3 scoring threshold table in Document 2, supplementary indicators are used only for the qualitative adjustment, not for the frequency calculation. The frequency calculation uses MIA units only.

---

## Section 5 — Output Format

After coding a transcript, produce a structured output in the following format. This output feeds directly into the Document 2 scoring step.

```
CODING OUTPUT

Total turns: [number]
User turns: [number]
Total thought units: [number]
User thought units: [number]
SHRT units (excluded from scoring): [number]
Scoreable user units: [number]
D3 supplementary indicator units (if any): [list unit numbers and codes]

THOUGHT UNIT LIST

Unit [N] | Speaker: [User/AI] | Code: [CODE] | 
Dimension: [dimension name or "N/A" for AI turns and SHRT] | 
Indicator: [Positive/Negative/Neutral/N/A] |
Text: "[exact text of thought unit]"

[repeat for all units]

DIMENSION UNIT COUNTS (User only, excluding SHRT)

Separate People from Problem:
  Positive units: [list unit numbers]
  Negative units: [list unit numbers]
  Total: [number]
  Frequency: [positive units / scoreable user units]
  Ratio: [positive units / (positive + negative units)]

Interests Not Positions:
  Positive units: [list unit numbers]
  Negative units: [list unit numbers]
  Total: [number]
  Frequency: [positive units / scoreable user units]
  Ratio: [positive units / (positive + negative units)]

Invent Options for Mutual Gain:
  Primary positive units (MIA): [list unit numbers]
  Negative units (SIA): [list unit numbers]
  D3 Supplementary positive units: [list unit numbers and codes]
  MIA Frequency: [MIA units / scoreable user units]
  MIA Ratio: [MIA / (MIA + SIA)]
  Supplementary indicator present: [Yes / No]

Objective Criteria:
  Positive units: [list unit numbers]
  Negative units: [list unit numbers]
  Total: [number]
  Frequency: [positive units / scoreable user units]
  Ratio: [positive units / (positive + negative units)]

BATNA Awareness:
  Positive units: [list unit numbers]
  Negative units: [list unit numbers]
  Total: [number]
  Frequency: [positive units / scoreable user units]
  Ratio: [positive units / (positive + negative units)]
```

---

## Section 6 — Worked Example

The following is the complete sample transcript coded from start to finish. Every coding decision is annotated. Your coding of similar exchanges should be consistent with the decisions shown here.

**Source:** Apartment rent negotiation sample transcript

---

### [AI] Turn 1

> *"Look, we need to talk about the lease renewal. I'm looking at two thousand four hundred a month going forward, which is really where the market is at right now for this unit."*

Segmentation: One thought unit. Two clauses but they form a single communicative act — opening a negotiation and stating an initial position.

| Field | Value |
|-------|-------|
| Unit | 1 |
| Speaker | AI |
| Code | SIA |
| Dimension | N/A |
| Indicator | N/A |
| Text | "Look, we need to talk about the lease renewal. I'm looking at $2,400 a month going forward, which is really where the market is at right now for this unit." |

---

### [User] Turn 2

> *"Yeah, I figured we'd be having this conversation. I appreciate you being upfront about it. But before we get into numbers — can I ask what's actually driving the increase? Like, is it taxes, maintenance costs, something else? I want to understand what you're working with here."*

Segmentation: Apply Rule 2. Three potential segments identified; third absorbed into second per absorption rule.

| Field | Value |
|-------|-------|
| Unit | 2 |
| Speaker | User |
| Code | POSA |
| Dimension | Separate People from Problem |
| Indicator | Positive |
| Text | "Yeah, I figured we'd be having this conversation. I appreciate you being upfront about it." |

| Field | Value |
|-------|-------|
| Unit | 3 |
| Speaker | User |
| Code | APRI |
| Dimension | Interests Not Positions |
| Indicator | Positive |
| Text | "But before we get into numbers — can I ask what's actually driving the increase? Like, is it taxes, maintenance costs, something else? I want to understand what you're working with here." |

> **Annotation:** Unit 3 is a strong early APRI. The user asks for the causes behind the AI's position before engaging with the number. This is textbook interest exploration — asking "why" before "what." The user's choice to ask this before making a counter-offer is a meaningful sequencing decision the rubric will recognize.

---

### [AI] Turn 3

> *"That's fair to ask. Honestly, it's a combination of things — property taxes went up, insurance is higher than it was two years ago, and just the general market rate for comparable units in the area has shifted. Things cost more now than they did when you signed your current lease."*

| Field | Value |
|-------|-------|
| Unit | 4 |
| Speaker | AI |
| Code | SUBS |
| Dimension | N/A |
| Indicator | N/A |

---

### [User] Turn 4

> *"Okay, that makes sense — costs do go up, I get that. But when I look at comparable units nearby, I'm seeing them listed in the $2,100 to $2,200 range, not $2,400. So I guess I'm trying to understand — is the $2,400 number coming from your cost increases, or from where you think you can get for this unit on the open market? Because those are kind of different problems."*

Segmentation: Three units.

| Field | Value |
|-------|-------|
| Unit | 5 |
| Speaker | User |
| Code | ACLS |
| Dimension | Separate People from Problem |
| Indicator | Positive |
| Text | "Okay, that makes sense — costs do go up, I get that." |

| Field | Value |
|-------|-------|
| Unit | 6 |
| Speaker | User |
| Code | FACT |
| Dimension | Objective Criteria |
| Indicator | Positive |
| Text | "But when I look at comparable units nearby, I'm seeing them listed in the $2,100 to $2,200 range, not $2,400." |

| Field | Value |
|-------|-------|
| Unit | 7 |
| Speaker | User |
| Code | ASUB |
| Dimension | Objective Criteria |
| Indicator | Positive |
| Text | "So I guess I'm trying to understand — is the $2,400 number coming from your cost increases, or from where you think you can get for this unit on the open market? Because those are kind of different problems." |

> **Annotation:** Unit 7 surfaces a conceptual distinction between cost-based pricing and market-based pricing. This challenges the AI to be precise about which standard they are applying — sophisticated objective criteria thinking that will score at the high end of that dimension.

---

### [AI] Turn 5

> *"Well, look, there's always a range when you're looking at comparables, right? Location matters, condition matters, lease terms matter. I'm basing it on what I think this unit is worth and what I need to make the numbers work on my end. But I hear what you're saying about what else is out there."*

| Field | Value |
|-------|-------|
| Unit | 8 |
| Speaker | AI |
| Code | SUBS |
| Dimension | N/A |
| Indicator | N/A |

---

### [User] Turn 5

> *"I hear you, and I'm not trying to be difficult here. But I want to be honest with you — $2,400 is past the point where it makes sense for me to stay. That's not me posturing, that's just where my actual limit is. And the thing is, I've been here two years, never missed a payment, haven't caused you any headaches. If you put this unit on the market, you're looking at vacancy time, showing costs, maybe some turnover wear. So I'm genuinely trying to figure out if there's a number that works for both of us — but I need to know what constraint we're actually solving for on your end before I can get there."*

Segmentation: Five units.

| Field | Value |
|-------|-------|
| Unit | 9 |
| Speaker | User |
| Code | ENCO |
| Dimension | Separate People from Problem |
| Indicator | Positive |
| Text | "I hear you, and I'm not trying to be difficult here." |

| Field | Value |
|-------|-------|
| Unit | 10 |
| Speaker | User |
| Code | PCOM |
| Dimension | BATNA Awareness |
| Indicator | Positive |
| Text | "But I want to be honest with you — $2,400 is past the point where it makes sense for me to stay. That's not me posturing, that's just where my actual limit is." |

> **Annotation:** PCOM coded as BATNA Awareness Positive. Applying Annotation 1 rule in order: prior interest exploration count = 2 (Units 3 and 7 both APRI). The PCOM contains an implicit alternative reference ("past the point where it makes sense to stay" implies the user has considered leaving). Framed as honest transparency, not as a threat. BATNA Awareness Positive confirmed.

| Field | Value |
|-------|-------|
| Unit | 11 |
| Speaker | User |
| Code | PREL |
| Dimension | Separate People from Problem |
| Indicator | Positive |
| Text | "And the thing is, I've been here two years, never missed a payment, haven't caused you any headaches." |

| Field | Value |
|-------|-------|
| Unit | 12 |
| Speaker | User |
| Code | SUBS |
| Dimension | Objective Criteria |
| Indicator | Positive |
| Text | "If you put this unit on the market, you're looking at vacancy time, showing costs, maybe some turnover wear." |

> **Annotation:** This substantiation uses the landlord's own interests (cost of vacancy) as an objective criterion — using standards both parties can accept rather than self-referential justification. High-quality Objective Criteria behavior.

| Field | Value |
|-------|-------|
| Unit | 13 |
| Speaker | User |
| Code | APRI |
| Dimension | Interests Not Positions |
| Indicator | Positive |
| Text | "So I'm genuinely trying to figure out if there's a number that works for both of us — but I need to know what constraint we're actually solving for on your end before I can get there." |

---

### [AI] Turn 6

> *"Yeah, I appreciate that you've been a solid tenant, I really do. That matters to me. But I can't just say yes to whatever number works for you — I've got to make sure the rent covers my actual expenses. Let me sit with this for a bit and run some numbers, and I'll get back to you in a few days on where we might be able to land."*

| Field | Value |
|-------|-------|
| Unit | 14 |
| Speaker | AI |
| Code | AVOI |
| Dimension | N/A |
| Indicator | N/A |

---

### [User] Turn 6

> *"I appreciate that, and I don't want to pressure you. But I do want to be transparent — I've already started looking at a couple of other places in the area, and a few of them are in that $2,100 to $2,200 range. So I'm not going to be able to hold off a decision indefinitely while I wait. Can we set a specific time to reconnect? And in the meantime, is there a ballpark you're thinking, or a floor you know you need to hit? That would help me know whether it's even worth both of us spending more time on this."*

Segmentation: Four units.

| Field | Value |
|-------|-------|
| Unit | 15 |
| Speaker | User |
| Code | ENCO |
| Dimension | Separate People from Problem |
| Indicator | Positive |
| Text | "I appreciate that, and I don't want to pressure you." |

| Field | Value |
|-------|-------|
| Unit | 16 |
| Speaker | User |
| Code | PCOM |
| Dimension | BATNA Awareness |
| Indicator | Positive |
| Text | "But I do want to be transparent — I've already started looking at a couple of other places in the area, and a few of them are in that $2,100 to $2,200 range. So I'm not going to be able to hold off a decision indefinitely while I wait." |

> **Annotation:** Most explicit BATNA signal in the transcript. Prior interest exploration count = 3 (Units 3, 7, 13). Contains explicit reference to an outside alternative with a specific price range. Framed with "I want to be transparent" — consistent with GTY honest BATNA communication. BATNA Awareness Positive confirmed.

| Field | Value |
|-------|-------|
| Unit | 17 |
| Speaker | User |
| Code | SHRT |
| Dimension | N/A |
| Indicator | Neutral |
| Text | "Can we set a specific time to reconnect?" |

| Field | Value |
|-------|-------|
| Unit | 18 |
| Speaker | User |
| Code | APOS |
| Dimension | Interests Not Positions |
| Indicator | Negative |
| Text | "And in the meantime, is there a ballpark you're thinking, or a floor you know you need to hit? That would help me know whether it's even worth both of us spending more time on this." |

> **Annotation:** APOS is a negative indicator for Interests Not Positions because asking for the other party's positional floor is positional behavior — negotiating around numbers rather than interests. However this is a mild negative signal that appears after extensive interest exploration; the rubric will account for this contextually.

---

### [AI] Turn 7

> *"I get it, and I don't want you to feel stuck. Look, let me crunch the numbers and I'll call you back by Thursday with something more concrete. As for a floor — I'm not ready to throw out a number right now because I need to see where I actually land on the costs first. But Thursday, we'll have a real conversation about what's possible."*

| Field | Value |
|-------|-------|
| Unit | 19 |
| Speaker | AI |
| Code | AVOI |
| Dimension | N/A |
| Indicator | N/A |

---

### [User] Turn 7

> *"Thursday works for me. I'll hold off on anything else until then. But I'll just say — if you come back and the number is still in the $2,400 range, I'm probably going to have to make a different call. I'd rather stay, but not at that price. So I'm hoping Thursday we can find something in between."*

Segmentation: Four units.

| Field | Value |
|-------|-------|
| Unit | 20 |
| Speaker | User |
| Code | SHRT |
| Dimension | N/A |
| Indicator | Neutral |
| Text | "Thursday works for me." |

| Field | Value |
|-------|-------|
| Unit | 21 |
| Speaker | User |
| Code | SHRT |
| Dimension | N/A |
| Indicator | Neutral |
| Text | "I'll hold off on anything else until then." |

| Field | Value |
|-------|-------|
| Unit | 22 |
| Speaker | User |
| Code | PCOM |
| Dimension | BATNA Awareness |
| Indicator | Positive |
| Text | "But I'll just say — if you come back and the number is still in the $2,400 range, I'm probably going to have to make a different call." |

| Field | Value |
|-------|-------|
| Unit | 23 |
| Speaker | User |
| Code | PPRI |
| Dimension | Interests Not Positions |
| Indicator | Positive |
| Text | "I'd rather stay, but not at that price. So I'm hoping Thursday we can find something in between." |

> **Annotation:** Unit 23 is PPRI because the user is expressing their genuine underlying preference — they want to stay, they value the stability, the price is the constraint not the relationship. This separates interests (stable housing in this location) from positions (not $2,400). Positive interest communication.

---

### [User] Turn 8

> *"Sounds good. I'll talk to you Thursday then."*

| Field | Value |
|-------|-------|
| Unit | 24 |
| Speaker | User |
| Code | SHRT |
| Dimension | N/A |
| Indicator | Neutral |
| Text | "Sounds good. I'll talk to you Thursday then." |

---

### Complete Dimension Counts for Sample Transcript

**Total user thought units: 19**
**SHRT units (excluded): 4** (Units 17, 20, 21, 24)
**Scoreable user units: 15**
**D3 Supplementary indicator units: None in this transcript**

---

#### Separate People from Problem
| | |
|---|---|
| Positive units | 2 (POSA), 5 (ACLS), 9 (ENCO), 11 (PREL), 15 (ENCO) = **5 units** |
| Negative units | **0 units** |
| Frequency | 5 / 15 = **0.33** |
| Ratio | 5 / (5+0) = **1.0** |

#### Interests Not Positions
| | |
|---|---|
| Positive units | 3 (APRI), 13 (APRI), 23 (PPRI) = **3 units** |
| Negative units | 18 (APOS) = **1 unit** |
| Frequency | 3 / 15 = **0.20** |
| Ratio | 3 / (3+1) = **0.75** |

#### Invent Options for Mutual Gain
| | |
|---|---|
| Primary positive units (MIA) | **0 units** |
| Negative units (SIA) | **0 units** |
| D3 Supplementary units | **0 units** |
| MIA Frequency | **0** |
| MIA Ratio | **N/A — no evidence** |
| Supplementary indicator present | **No** |

#### Objective Criteria
| | |
|---|---|
| Positive units | 6 (FACT), 7 (ASUB), 12 (SUBS) = **3 units** |
| Negative units | **0 units** |
| Frequency | 3 / 15 = **0.20** |
| Ratio | 3 / (3+0) = **1.0** |

#### BATNA Awareness
| | |
|---|---|
| Positive units | 10 (PCOM), 16 (PCOM), 22 (PCOM) = **3 units** |
| Negative units | **0 units** |
| Frequency | 3 / 15 = **0.20** |
| Ratio | 3 / (3+0) = **1.0** |

---

> **Note on Invent Options for Mutual Gain:** This user never proposed a multi-issue package or creative alternative, and no D3 supplementary indicators were present. This is realistic — many negotiators do not reach option generation, especially in early rounds. Document 2 (Scoring Rubric) contains specific rules for scoring dimensions with zero evidence.

---

*End of Document 1 — Version 1.2*
