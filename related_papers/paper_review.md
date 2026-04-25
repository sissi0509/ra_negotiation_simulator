# Paper Review: Related Papers

Summaries of all papers in `related_papers/`. Each entry has a **Summary** and a **Relevance to This Work** section.

---

## Categories

### Category A — AI / Technology + Negotiation Training
These papers cover systems that use AI or digital technology to support negotiation practice and training. Most directly relevant to motivating and positioning the simulator component of this project.

| # | Paper | Notes |
|---|-------|-------|
| 1 | Dinnar et al. (2021) | Landscape survey; motivates the practice→reflection→re-practice gap |
| 4 | Dannenmann et al. (2022) | AI beats role-play on performance + reduces nervousness |
| 7 | Shea et al. (2024) — ACE | Closest prior system; proves AI feedback works; gap = no DwGJ dialogue |
| 10 | Kwon et al. (2024) | GPT-4 comparable to humans; validates LLM as practice partner |
| 11 | Rottner (2024) — AdVentures | Two-round AI exercise; score report between rounds; gap = report not dialogue |
| 8 | Balle et al. (2025) | Style training via genetic algorithm agents; no textual communication |
| 15 | Kapráliková & Novák (2025) | Qualitative (N=20); AI simulation supports strategic awareness, emotional framing, and self-regulation; psychologically safe practice environment |
| 16 | Li Rong et al. (2025) | True experiment (N=90); GenAI coach outperforms traditional role-play on strategy and value creation; not on communication |
| 17 | Duddu et al. (2025) | Between-subjects (N=267); theory-driven AI reduces fear but Handbook outperforms AI on empowerment and usability |
| — | NegotiateSim (Gauthier, n.d.) | **Commercial product, no paper.** AI practice across 6 scenarios + automated post-session score/grade; no conversational debrief. Contrast case. |

---

### Category B — AI + Soft Skills Training
Papers on using AI to develop interpersonal and communication skills more broadly. Positions negotiation within the wider soft-skills training literature.

| # | Paper | Notes |
|---|-------|-------|
| 20 | Shaikh et al. (2024) — Rehearsal | **CHI 2024.** LLM role-play for conflict resolution training; IRP-grounded prompting; N=40; −67% competitive strategies, +2× cooperative strategies |
| 21 | Daryanto et al. (2025) — Conversate | **ACM GROUP 2025 (HCI).** LLM simulation + AI annotation + dialogic feedback for interview practice; N=19 qualitative; closest architectural parallel; gap = no behavioral theory, no RCT, no negotiation |
| 22 | Guevarra et al. (2025) — GLOSS | **AAAI 2025.** Instructor-in-loop LLM tutoring system for social skills; narrative graph + conversational simulator + feedback; system paper, no user study |
| 24 | Yang et al. (2024) — APAM | **arXiv, Stanford.** Perspective paper proposing AI Partner + AI Mentor framework for LLM social skill training; defines the architecture this project fully instantiates |
| 25 | Burgues, Goujet & Zaraik (2024) | **EDULEARN24.** Literature review (N=130 papers) on AI simulation role-play for soft skills; useful as reference mine — see [43] Liaw et al. and [22] Luo et al. for follow-up empirical papers |

---

### Category C — Debriefing Theory + AI-Facilitated Debriefing
Papers on why debriefing matters and how AI can support it. Most directly relevant to the theoretical design of Sage and the justification for the debrief condition in the RCT.

| # | Paper | Notes |
|---|-------|-------|
| 6 | Fanning & Gaba (2007) | Debriefing = "heart and soul" of simulation; Kolb's experiential learning |
| 2 | Rudolph et al. (2007) — DwGJ | Theoretical backbone of Sage's Phase C design — see **Category F** for full summary |
| 3 | Hong et al. (2025) | LLM as facilitator *assistant*; not autonomous; no control group |
| 9 | Gonzalez & Nagendran (2025) | AI debrief pilot in nursing; proprietary AI; no control condition |
| 26 | Evangelou et al. (2025) — GenAI-Chatbots as Debriefers | AI debrief in counseling/VR (non-medical); strong role conformity; sycophancy persists; students stay self-critical; no DwGJ |
| 27 | Evangelou, Mulders & Träg (2026) — Bot or Not? | RCT: human vs. chatbot debrief; no significant cognitive load difference; no learning outcomes measured; feasibility established |

---

### Category F — Debriefing with Good Judgment (DwGJ) — Core Papers
Deep reading of DwGJ theory and empirical evidence. Grounds Sage's design at the mechanism level.

| # | Paper | Notes |
|---|-------|-------|
| F1 | Rudolph et al. (2006) | Foundational theory — "no such thing as nonjudgmental"; frames → actions → results causal chain; advocacy-inquiry introduced |
| F2 | Rudolph et al. (2007) | Full method description — 3-phase structure, cognitive detective stance, ~2,000 debriefs |
| F3 | Kolbe et al. (2013) — TeamGAINS | Empirical study integrating A/I into team debriefing tool; psychological safety significantly increased |
| F4 | Shao et al. (2025) — Chinese RCT | RCT (N=70); DwGJ+CBL vs. CBL alone; significantly higher theory scores (p=0.02), skill scores (p<0.01), all three clinical reasoning dimensions |
| F5 | Tscholl et al. (2026) | AI generates observation reports for human DwGJ facilitator — AI has not yet conducted DwGJ debrief autonomously; this work fills that gap |

---

### Category D — Theoretical Foundation
Core theory that underpins the measurement and design framework.

| # | Paper | Notes |
|---|-------|-------|
| 13 | Fisher, Ury & Patton (1981) — GTY | GTY 4 principles form the BQS dimensional structure (D1–D4) |
| 14 | McKersie & Walton (2015) | Foundational negotiation theorists; "producing lasting behavioral change is a tall order" |

---

### Category G — Reflection-to-Action Systems
Systems that use structured reflection to drive behavior change, closing the gap between insight and action. Situates this project within a broader HCI movement beyond passive feedback.

| # | Paper | Notes |
|---|-------|-------|
| G1 | Kim et al. (2026) — Breaking Negative Cycles | CHI '26; 15-day in-the-wild RCT (N=20); structured Gross-guided reflection → 2× more action plans, larger planning output than free-form; empirically supports Group A > Group B hypothesis |

---

### Category E — LLM Negotiation Behavior (Parked — Background Only)
LLM-vs-LLM studies. Not used in the related work section — these evaluate AI capability, not human skill development. Kept here for reference (e.g., motivating counterpart design choices, methodology footnotes).

| # | Paper | Notes |
|---|-------|-------|
| 18 | Bianchi et al. (2024) — NegotiationArena | LLM vs. LLM benchmark (ICML); GPT-4 best; aggressive behaviors boost payoff ~20%; irrational behaviors documented |
| 19 | Noh & Chang (2024) — LLMs with Personalities | n=1,500 simulations; OCEAN personalities; low agreeableness exploits; LLMs default to fairness (guardrails) |
| 23 | Hua, Qu & Haffari (2024) — Assistive LLM Agents | LLM remediator rewrites social norm violations in negotiation dialogues (EMNLP 2024 Findings); agent-vs-agent; no human training component |

---

### How the categories connect to this project

```
Category A (AI + Negotiation)   →  motivates the simulator + positions ACE as prior work
Category B (AI + Soft Skills)   →  situates negotiation within broader soft-skills AI training
Category C (Debriefing)         →  justifies Sage and the debrief condition in the RCT
Category D (Theory)             →  grounds the BQS measurement system and diagnostic matrix
Category E (LLM Behavior)       →  background only; not cited in related work
Category F (DwGJ — Core)        →  deep reading of DwGJ theory + empirical evidence; grounds Sage's design
Category G (Reflection-to-Action) → empirical support that structured > free-form reflection; closes the insight→behavior gap; positions the debrief as a necessary component, not just an add-on
```

---

## Full Paper Summaries

---

# Category A — AI / Technology + Negotiation Training

## Dinnar et al. (2021)

**Reference:** Dinnar, S., Dede, C., Johnson, E., Straub, C., & Korjus, K. (2021). Artificial intelligence and technology in teaching negotiation. _Negotiation Journal, 37_(1), 65–82.

**Summary:**
A broad survey of how AI and digital technologies are being used to teach and practice negotiation. The paper organizes the landscape into five categories: (1) using digital images and branching simulations, (2) technology for coaching (journaling apps, post-negotiation assessments, real-time tools like Cogito), (3) extending best practices across organizations (Shamaym), (4) negotiation with AI-controlled bots (IAGO, Pactum), and (5) negotiation with human-driven avatars (Mursion). Key observation: students learn best when they can reflect on performance, receive personalized feedback, and integrate reflections into their learning. The paper explicitly calls for the convergence of AI with post-negotiation reporting and prenegotiation coaching. Describes a three-step "negotiation learning loop": (a) preparing, (b) negotiating, (c) reflecting via postaction review. Existing tools address parts of this loop but none closes all three steps together. Also notes that feedback from computer systems is generally accepted — sometimes preferred over human feedback. **Relevance to This Work:**
The primary landscape review citation for this area. Cited specifically for the claim that learners benefit most from a complete cycle of practice, reflection, and re-practice — directly supported by the paper's learning loop description and its statement that "students learn best when they can reflect on performance, receive personalized feedback, and integrate reflections into their learning." The follow-on claim that "existing systems address only parts of this loop" is our own observation, not attributed to Dinnar. Also cited as evidence that learners accept AI-delivered feedback, supporting the feasibility of an autonomous debrief coach.

---

## Dannenmann, Semenkin, Kracklauer & Rasche (2022)

**Reference:** Dannenmann, B., Semenkin, K., Kracklauer, A. H., & Rasche, C. (2022). Learning to negotiate: AI-driven applications versus conventional training. In _Proceedings of the XXXIII ISPIM Innovation Conference_, Copenhagen, Denmark.

**Summary:**
A between-subjects experiment (N = 27 undergraduate students) comparing an AI-driven negotiation desktop application (TriCAT, using Microsoft LUIS NLP) against traditional role-play. The AI application simulated buyer counterparts and classified the student's negotiation style (accommodating/integrating/avoiding/dominant) from speech patterns, providing a debrief after each session. Outcome measures: overall performance, nervousness, enjoyment, tactics, negotiation styles. Results: the AI condition showed significantly greater improvement in negotiation performance, use of appropriate tactics and styles; both groups reduced nervousness and increased enjoyment, but to a greater degree in the AI condition. Limitations: small sample; same evaluator for role-play and assessment creates potential bias; the AI used a keyword-matching NLP (not LLM).

**Relevance to This Work:**
Provides direct experimental evidence that AI-driven negotiation training produces greater improvement than conventional role-play across more performance categories. Both groups reduced nervousness and improved enjoyment — not unique to the AI condition. The AI group showed significant within-group improvement across all categories (including optimal performance and tactics), while the conventional group showed more limited improvement. Cited as: "AI-driven training produces greater improvement in negotiation performance than conventional role-play." Do NOT cite for "reducing anxiety" — both groups reduced it.

---

## Shea, Kallalla, Liu, Morris & Yu (2024) — ACE

**Reference:** Shea, R., Kallalla, A., Liu, X. L., Morris, M. W., & Yu, Z. (2024). ACE: A LLM-based negotiation coaching system. In _Proceedings of EMNLP 2024_, 12720–12749.

**Summary:**
Develops and evaluates ACE (Assistant for Coaching nEgotiation), a GPT-4-based system that (1) serves as a negotiation partner and (2) provides targeted error-based feedback. The system uses an 8-category annotation scheme (strategic walk-away, strategic target price, breaking the ice, giving the first offer, ambitious opening point, strong counteroffer, including rationale, strategic closing) developed from MBA student transcripts with expert consultation. ACE identifies errors per conversation turn, gives direct feedback, and provides a revised version of the user's utterance. Experiment (N = 374): three conditions (ACE feedback, alternative GPT-4 feedback, no feedback). Results: ACE condition showed significant improvement in deal price from Round 1 to Round 2 (t = 2.97, p = 0.003, d = 0.38); no other condition improved significantly. Importantly, GPT-4 zero-shot feedback (the "other-feedback" condition) did NOT help humans even though the same method improves LLM negotiators — suggesting that effective human feedback requires structured, targeted design.

**Negotiation Theory Used — Lewicki et al. (2021) Distributive Bargaining:**
ACE explicitly grounds its annotation scheme in Lewicki's distributive bargaining framework (single-issue price negotiation). The 8 annotation categories all correspond to distributive tactics: walk-away price, target price, anchoring (first offer / ambitious opening), strong counteroffer, giving rationale, and strategic closing. The mental model is a number line — both parties fight over where the final price lands. Fisher et al. (2011 / GTY) is cited once peripherally (for "don't use personal attacks" in holistic feedback) but is not the theoretical backbone. There is no interest-based reasoning, no options for mutual gain, and no objective criteria in the framework. ACE's theory of good negotiation is entirely about positional/distributive tactics.

**Relevance to This Work:**
The closest prior system. ACE is the most direct comparison point: it combines AI practice + AI feedback. Key distinction: ACE delivers brief, categorical error reports ("you made mistake X") rather than DwGJ-style dialogue. ACE does not implement structured reflective conversation, does not use advocacy-inquiry, and does not surface the learner's cognitive frames. This is the primary gap this project fills. Also: ACE's finding that generic GPT-4 feedback doesn't work for humans validates the need for structured, theory-grounded feedback design, which Sage provides. Critically, ACE's use of Lewicki distributive tactics means it evaluates *positional* negotiation performance — this project uses GTY principled negotiation as its theoretical basis, a fundamentally different and more pedagogically complete framework.

**Citation notes — structured vs. generic distinction:**
- ACE condition (annotation-scheme-based feedback): significant improvement, t = 2.97, p = 0.003, d = 0.38. ✅ Cite for "targeted, annotation-based feedback improved outcomes."
- Other-feedback condition (zero-shot GPT-4): no significant improvement, t = 0.30, p = 0.76. ✅ Cite for "generic AI feedback performed no better than no feedback." The paper explicitly states: "Other-feedback did not improve negotiation performance."
- No-feedback condition: no significant improvement, t = 1.03, p = 0.30.
- Do NOT say "Shea et al. shows AI feedback improves outcomes" without qualification — only the annotation-scheme condition showed improvement. Cite as: "Shea et al. found that only targeted, annotation-based feedback improved outcomes — generic AI feedback performed no better than no feedback."

---

## Kwon, Weiss, Kulshrestha, Chawla, Lucas & Gratch (2024)

**Reference:** Kwon, D., Weiss, E., Kulshrestha, T., Chawla, K., Lucas, G. M., & Gratch, J. (2024). Are LLMs effective negotiators? Systematic evaluation of the multifaceted capabilities of LLMs in negotiation dialogues. In _Findings of EMNLP 2024_, 5391–5413.

**Summary:**
A systematic evaluation of LLMs (GPT-4, GPT-3.5, Mistral-7B, Vicuna-13B/33B, Wizard-13B) across 35 tasks spanning the full negotiation lifecycle, organized by time stage (start/during/end), task type (comprehension, annotation, partner modeling, generation), and objectivity (objective/subjective). Datasets: four negotiation corpora (CRA, DND, CaSiNo, JI), all based on Multi-Issue Bargaining Task (MIBT) scenarios. Key findings: (1) GPT-4 outperforms all others across most tasks; (2) all models fail at subjective tasks (outcome satisfaction, partner likeness) — poor correlation with human judgments; (3) GPT-4 achieves comparable Coherence to humans in response generation but significantly lags on Strategy; (4) CoT prompting nearly achieves 100% on arithmetic reasoning tasks; (5) models suffer from recency bias; (6) generating contextually appropriate, strategically advantageous responses remains an open challenge.

**Negotiation Theory Used — MIBT (Multi-Issue Bargaining Task, Fershtman 1990):**
All four evaluation datasets (CRA, DND, CaSiNo, JI) are based on the Multi-Issue Bargaining Task framework. MIBT is a game-theoretic structure in which two parties negotiate over multiple issues simultaneously (e.g., price, delivery, quantities), each party holding a private utility table assigning point values to different outcomes. The goal is to maximize your own total utility score. Performance is measured objectively: given both parties' private utility tables, you can calculate exactly how well each agent did and whether outcomes reached the Pareto frontier. MIBT is designed for research measurement of computational agents, not for human pedagogy. There is no relationship management, no interest-based reasoning, no creative option generation — only mathematical optimization across predefined issue ranges. GTY principled negotiation is never referenced.

**Relevance to This Work:**
Cited for two claims: (1) "LLMs show promise for pedagogical applications in negotiation" — directly from conclusion: "LLMs can indeed be helpful... including scaling-up pedagogical practices... LLMs capable of partner modeling can help provide feedback to students." (2) "strategic response generation remains an open challenge" — directly from abstract. Do NOT cite for "comparable to humans across core tasks" — this is overstated; comparable Coherence only, significantly worse on Strategy. Do NOT cite as "validating LLMs as practice partners" — the paper explicitly says GPT-4 is "insufficient for downstream applications in pedagogy" (referring to replacing full conversational agents, not using LLMs as training tools). Project uses Claude, not GPT-4 — general LLM framing is appropriate.

---

## Rottner (2024) — AdVentures

**Reference:** Rottner, R. (2024). Iterative learning: Using AI-bots in negotiation training. _ASEE 2024 Annual Conference & Exposition_, Paper #41800.

**Summary:**
Develops and pilots _AdVentures_, a two-round ChatGPT-4-based negotiation exercise for engineering management master's students. Students play a job candidate negotiating with an AI-bot recruiter. After Round 1, the AI provides a score report (0–4 per dimension: active listening, negotiation techniques, collaboration, positive tone) plus written feedback. Students complete a structured reflection survey before entering Round 2, which resets the AI to a "fresh start" (no memory of Round 1). Pilot (N = 53 STEM master's students): average 10% improvement in integrative potential score from Round 1 to Round 2. Most students achieved deals closer to the Pareto frontier in Round 2. Qualitative feedback was strongly positive. Limitation: no control group; provisional conclusions.

**Relevance to This Work:**
The paper that inspired the two-round RCT design of this project. AdVentures demonstrates that AI practice + AI-generated feedback between rounds produces ~10% improvement. The feedback consists of numerical scores (0–4 per dimension) plus written personalized feedback — do NOT describe as just "score reports." However, AdVentures uses automated AI feedback, not a DwGJ-based reflective dialogue. This is the key gap this project fills: replacing the automated feedback with structured conversational debrief (Sage). Caveat: pilot study (N=53), no control group — improvement is measurable but causality is not established.

---

## Balle, Meyer & Schoop (2025)

**Reference:** Balle, M., Meyer, M., & Schoop, M. (2025). AI-based negotiation style training. In J. M. Moreno-Jiménez et al. (Eds.), _GDN 2025_, LNBIP 553, 3–17.

**Summary:**
Designs and evaluates AI negotiation agents that embody five negotiation styles (accommodating, collaborating, compromising, avoiding, competing) for training purposes, without requiring large datasets. The approach uses a genetic algorithm applied to recurrent neural networks (GRU layers), with style-specific fitness functions. Agents train by negotiating with each other in simulation. Experiment (N = 27 participants, 52 data points): participants negotiated with unknown-style agents and tried to identify the style. Correct identification: 26.9% overall (above 20% chance); competing (54.6%) and avoiding (41.7%) were identified best; collaborating and compromising were at 0%. Limitation: agents currently handle only decision-making (offer values), not textual language.

**Negotiation Theory Used — Lewicki et al. (2007) Dual-Concern Model:**
Balle explicitly adopts Lewicki's dual-concern model as the theoretical foundation. The five negotiation styles (accommodating, collaborating, compromising, avoiding, competing) are mapped to positions on two axes: concern for self and concern for other. These five styles are operationalized as style-specific fitness functions used to train the genetic algorithm agents — each style defines what "winning" looks like for that agent's behavior. This is a style-classification framework, not a principled negotiation framework. There is no concept of interests vs. positions, no options for mutual gain, and no objective criteria. GTY is not cited.

**Relevance to This Work:**
A more distant related work in the negotiation-agent training space. Focused on style identification rather than skill improvement. Notable: its limitation — no textual communication — is exactly what this project addresses (text-based, free-form dialogue with LLM). Balle's use of the dual-concern style model (Lewicki) further confirms that no Category A paper uses GTY principled negotiation as its theoretical framework. Supplementary background citation.

---

## Kapráliková & Novák (2025)

**Reference:** Kapráliková, I., & Novák, D. (2025). AI-powered simulations for business negotiations: Enhancing skill development through technology. *CASALC Review, 15*(2), 44–71. https://doi.org/10.5817/CASALC2025-2-3

**Summary:**
A qualitative study (N = 20 undergraduate business students, Bratislava University of Economics and Business, Slovakia) examining how AI-powered negotiation simulations support skill development over four weeks. Students used Microsoft Copilot as a negotiation counterpart across four escalating scenarios (supplier pricing, internal budget, service contract renegotiation, cross-cultural joint venture). Three primary data sources: reflective journals, recorded simulation transcripts, and semi-structured interviews. Findings organized into four themes: (1) **Strategic awareness and language precision** — students shifted from hedging/vague language to structured, goal-oriented discourse with evidence-based reasoning and conditional framing; (2) **Emotional framing and confidence building** — students evolved from formulaic politeness markers to purposeful empathy and rapport-building as strategic tools; (3) **Adaptive learning and self-regulation** — AI feedback prompted metacognitive monitoring: students evaluated their own performance and adjusted strategies proactively across rounds; (4) **Perceived realism and transferability** — students perceived simulations as realistic preparation for professional contexts, citing the psychologically safe environment as enabling experimentation without social risk. Limitations: no control condition; small sample; no non-verbal cues or spontaneous emotional reactions in text-based AI; assertiveness gains remained fragile under unexpected responses.

**Negotiation Theory Used:**
No single named framework (GTY, Lewicki, etc.) is adopted. The paper draws on constructivist and experiential learning theory (Kolb), reflective practice, and discourse analysis as the analytical lens. Strategic and emotional competencies are framed as communication skills, not as principled negotiation principles.

**Relevance to This Work:**
Provides qualitative evidence that AI simulation training produces strategic awareness, self-regulation, and emotional intelligence gains in negotiation — outcomes this project also targets. The "psychologically safe environment for experimentation" framing directly supports the justification for AI practice as a risk-free rehearsal space. The paper also establishes reflective journaling + AI simulation as a productive pairing, reinforcing the logic of combining practice (simulator) with structured reflection (Sage). Cite alongside Li Rong et al. (2025) and Dannenmann et al. (2022) for the "emerging area" trend claim.

**Direct quotes:**
- *"AI-assisted negotiation training offers a promising pathway for innovation in business communication education, but its success depends on systemic adaptation rather than technological enthusiasm alone."* (p. 69, Conclusion)
- *"AI-powered simulations represent a promising pathway for innovation in negotiation pedagogy."* (p. 68, Pedagogical Implications)
- *"Their adaptive feedback creates a psychologically safe environment for experimentation, enabling learners to rehearse strategic discourse without fear of social judgment."* (p. 67, Pedagogical Implications)
- *"Another key implication is the promotion of learner autonomy and self-regulation. Adaptive feedback encouraged metacognitive skills, prompting students to monitor performance, evaluate outcomes, and adjust strategies proactively."* (p. 67, Pedagogical Implications)

**Citation notes:**
- ✅ Cite for: "has emerged as a promising target for AI-based simulation training" — direct quote: "offers a promising pathway for innovation in negotiation pedagogy."
- ✅ Cite for: AI simulation provides a safe environment for strategic practice without social risk.
- ✅ Cite for: AI simulation supports self-regulation and metacognitive skill development.
- ⚠️ Do NOT cite for quantitative effect sizes — qualitative study only, no control condition.
- ⚠️ Do NOT cite as showing AI outperforms traditional methods — no comparison condition.

---

## Li Rong, Peng Hui, Peng Jingyu & Luo Tianchan (2025)

**Reference:** Li Rong, Peng Hui, Peng Jingyu, & Luo Tianchan. (2025). The AI negotiation coach: Using generative AI to specifically enhance strategic preparation, strategy and value-creation in business negotiation education. In _Proceedings of the 2025 International Conference on Educational Technology Management (ICETM)_, 304–308. IEEE. https://doi.org/10.1109/ICETM67477.2025.11413592

**Summary:**
A true experimental study (N = 90 Chinese business management students: 45 experimental, 45 control) comparing a generative AI negotiation coach against traditional role-play. The AI coach simulated a negotiation counterpart, provided immediate feedback, and adapted to student responses. Outcome measures (pre/post): Preparation, Strategy, Communication, Adaptability, Value Creation, and an overall Outcome composite. Results: The experimental (AI) group showed significantly greater improvement in **Preparation** (p < .001), **Strategy** (p < .001), and **Value Creation** (p < .001) compared to the control group; no significant difference in Adaptability. Critically, the **control group showed stronger development in Communication** — the AI group did not improve significantly on communication, and the traditional role-play condition outperformed AI on this dimension. Discussion: AI is effective for cognitive/strategic competencies (preparation, strategic thinking, deal design) but less effective for interpersonal communication, which requires human interaction and nonverbal cues. Limitation: single Chinese institution; one semester duration; generalizability uncertain.

**Negotiation Theory Used:**
The paper situates its competency framework within integrative/value-creating negotiation concepts — preparation, strategy, value creation — but does not explicitly name a single theoretical framework (GTY is not cited). The emphasis on "value creation" and "integrative negotiation" is consistent with interest-based framing, though the study measures these as skill dimensions rather than grounding in GTY principles.

**Relevance to This Work:**
The strongest new experimental evidence that GenAI negotiation coaching outperforms traditional role-play on strategic and integrative competencies. The finding that AI outperforms role-play on **strategy** and **value creation** directly motivates this project's AI simulator design. Equally important: the finding that **communication skills require human interaction** supports the rationale for adding a structured conversational debrief (Sage) — pure AI practice is insufficient for the interpersonal/reflective dimension. Also usable as a citation for: "GenAI has emerged as a promising target for negotiation training."

**Citation notes:**
- ✅ Cite for: "AI negotiation coaching produces significantly greater improvement than traditional role-play in strategic preparation, strategy, and value creation" (Li Rong et al., 2025, p < .001 across all three).
- ✅ Cite for: "AI simulation has emerged as a promising target for AI-based negotiation training" — strong experimental evidence.
- ⚠️ Do NOT cite for communication skills improvement — AI group did NOT show significant improvement on communication; control group was stronger on this dimension.
- Note: Chinese institutional context; N = 90; results may not generalize directly, but the direction (AI > role-play on strategy/value creation) is consistent with Dannenmann et al. (2022).

---

## Duddu, Parekh, Mao, Min, Xiao, Das Swain & Saha (2025)

**Reference:** Duddu, V., Parekh, J. R., Mao, A., Min, H., Xiao, Z., Das Swain, V., & Saha, K. (2025). Does AI coaching prepare us for workplace negotiations? _arXiv preprint arXiv:2509.22545._

**Summary:**
A pre-registered between-subjects experiment (N = 267 U.S. workers recruited via Prolific) examining the effectiveness of AI coaching for **workplace negotiation** (salary raise, promotion, time off — psychologically fraught, power-imbalanced negotiations). Three conditions: (1) **Trucey** (N = 134) — a theory-driven AI coach built on Brett & Thompson's negotiation model, using few-shot fine-tuned GPT-4.1; (2) **ChatGPT** (N = 66) — generic AI without theory-driven scaffolding; (3) **Handbook** (N = 67) — static written negotiation resource grounded in theory but non-interactive. Outcomes measured: psychological empowerment (PEU), occupational self-efficacy (OSS-6), negotiation fear, willingness to initiate negotiation, usability (UMUX), appropriateness (IAM). Results: **Trucey showed the strongest reduction in negotiation fear** relative to both other conditions. However, **the Handbook outperformed both AI conditions on usability and psychological empowerment**. Qualitative interviews (N = 15): Handbook's comprehensive, reviewable content was critical for participants' confidence; AI guidance felt "verbose and fragmented — delivered in bits and pieces," leaving users uncertain or overwhelmed. Conclusion: challenges assumptions of AI superiority; motivates hybrid designs integrating structured, theory-driven content with targeted AI rehearsal.

**Negotiation Theory Used — Brett & Thompson (workplace/organizational):**
Trucey is grounded in Brett and Thompson's negotiation framework, which focuses on workplace power dynamics, psychological barriers, and self-efficacy in upward negotiation (asking for promotions, raises, etc.). This is an organizational psychology / I-O psychology framework — distinct from GTY (integrative/interest-based), Lewicki (distributive/dual-concern), or MIBT (game-theoretic). The focus is on reducing fear and building confidence to *initiate* negotiation, not on principled negotiation technique.

**Relevance to This Work:**
Provides important nuance about AI coaching for *workplace* negotiations: theory-grounded AI (Trucey) outperforms generic AI on fear reduction, but a structured handbook outperforms AI on empowerment and usability. Directly relevant to this project's motivation: the finding that AI feels "verbose and fragmented" to users supports the design decision to use structured, DwGJ-based dialogue (Sage) rather than open-ended AI chat — structured conversation design is essential. The comparison between theory-driven AI (Trucey) vs. generic AI (ChatGPT) also supports the claim that grounding an AI in a specific framework (this project uses GTY + DwGJ) produces better outcomes than generic LLM use. Limitation: workplace negotiation context is psychologically different from business practice training; participants were preparing for real negotiations, not doing simulation training.

**Citation notes:**
- ✅ Cite for: "theory-driven AI coaching reduces negotiation fear more than generic AI" — directly from results.
- ✅ Cite for: the design rationale that AI coaching grounded in a specific negotiation theory outperforms unstructured AI.
- ⚠️ Do NOT cite as "AI outperforms traditional methods" — the Handbook outperformed both AI conditions on usability and empowerment; AI did not uniformly win.
- ⚠️ Do NOT overstate this as a close prior system — Trucey is a coaching tool for pre-negotiation *preparation* (for a real negotiation), not simulation-based practice training.
- Workplace negotiation context (power imbalance, fear, upward negotiation) is somewhat different from business negotiation simulation; cite with appropriate framing.

---

## NegotiateSim (Gauthier, n.d.) — Commercial Product

**Reference:** Gauthier, S. (n.d.). *NegotiateSim* [Web application]. Panda Projet. https://negotiatesim.com

> ⚠️ No peer-reviewed paper. Commercial product only. Cited as a contrast case, not as academic evidence.

**Summary:**
A commercial AI-powered negotiation training platform offering six scenario types: salary negotiation, vendor negotiation, partnership discussions, real estate transactions, cross-cultural negotiations, and team conflict resolution. The platform uses an AI coach named "Louis" which provides pre-session briefing, real-time analysis during the negotiation, and a post-round coaching debrief. After each session, users receive a numerical score and letter grade displayed in a dashboard alongside session history. Freemium model: one free trial session; paid plans unlock all scenarios. Created by Sylvain Gauthier (PMP, ACP — Panda Projet). No published methodology, no academic affiliation, no peer-reviewed evaluation.

**How it compares to this project:**

| Feature | NegotiateSim | This project |
|---------|-------------|--------------|
| AI practice counterpart | ✅ Yes | ✅ Yes |
| Multiple scenarios | ✅ Yes (6) | ✅ Yes (2, experiment-controlled) |
| Post-session feedback | ✅ Score + grade | ✅ Conversational debrief (Sage) |
| Debrief method | Static automated assessment | DwGJ structured dialogue (advocacy + inquiry) |
| Theoretical framework | Not disclosed | GTY (Fisher et al., 1981) + DwGJ (Rudolph et al., 2007) |
| Behavioral measurement | Score/grade only | BQS (5-dimension behavioral coding) |
| Controlled evaluation | None published | RCT (3-group) |

**Relevance to This Work:**
NegotiateSim represents the current state of commercial AI negotiation training products: AI-driven practice + automated score-based assessment. This project's key distinction is replacing the static score report with a structured conversational debrief grounded in DwGJ — moving from "what score did I get" to "why did I behave that way and what would I do differently." NegotiateSim confirms that the practice + assessment loop is commercially viable; this project advances the feedback component to a theoretically grounded reflective dialogue.

**Citation notes:**
- Cite as a URL with access date if used in the paper (not a journal citation).
- Best used as a footnote or a single contrast sentence — not as a primary academic citation.
- Some reviewers prefer related work to include only peer-reviewed work; check with professor before including.
- Do NOT use as evidence of anything empirical — no published results exist.

---

# Category B — AI + Soft Skills Training

## Shaikh, Chai, Gelfand, Yang & Bernstein (2024) — Rehearsal

**Reference:** Shaikh, O., Chai, V., Gelfand, M. J., Yang, D., & Bernstein, M. S. (2024). Rehearsal: Simulating conflict to teach conflict resolution. In *Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI '24)*, Article 642. https://doi.org/10.1145/3613904.3642159

**Summary:**
Introduces Rehearsal, an LLM-based interactive system for practicing conflict resolution with a simulated interlocutor. The core technical contribution is **IRP Prompting**: rather than directly generating conflict dialogue (which produces sycophantic, unhelpful LLM outputs), the system first classifies which conflict resolution strategy the simulated interlocutor should use next (from the Interests-Rights-Power framework: Interests, Rights, Power, Proposal, Concession, Facts, Procedural), then generates a message conditioned on that strategy. This two-step pipeline keeps simulations faithful to expert roleplay. The Feedback View shows users their message's classified strategy, scores alternative messages using different strategies, and enables "what-if" counterfactual exploration. Between-subjects evaluation (N = 40 participants): Rehearsal group vs. control group (lecture covering the same IRP theory). After training, participants engaged in a real conflict with a confederate. **Results: Rehearsal participants reduced use of competitive strategies by 67% on average and doubled their use of cooperative strategies**, despite not showing differences on knowledge recall. The paper identifies two key failure modes of naive LLM conflict simulation: (1) LLMs are sycophantic, agreeing too quickly; (2) open-ended generation produces messages unhelpful for targeted skill teaching.

**Negotiation Theory / Framework Used — IRP (Interests-Rights-Power):**
Draws on the Interests-Rights-Power conflict resolution framework (Ury, Brett & Goldberg; extended by Brett et al.). Interests-based strategies focus on underlying needs and goals. Rights-based strategies appeal to norms and standards. Power-based strategies use threats or coercion. This overlaps significantly with GTY (both center on Interests over positional bargaining), but IRP is a conflict resolution framework rather than a negotiation framework, and includes Rights/Power as explicit strategy categories rather than behaviors to avoid.

**Relevance to This Work:**
**The closest prior paper in terms of system architecture and venue (CHI 2024).** Rehearsal and this project share the same core design: (1) LLM as simulated counterpart, (2) theory-grounded generation pipeline, (3) between-subjects RCT, (4) target skill = interpersonal communication under conflict. Key distinctions: (a) Rehearsal targets conflict resolution; this project targets principled negotiation (GTY). (b) Rehearsal provides turn-level feedback inline during practice; this project separates practice (simulator) from structured debrief (Sage) — a complete practice + debrief loop. (c) Rehearsal's feedback is strategy-classification-based; Sage's debrief uses DwGJ advocacy-inquiry to surface cognitive frames. The behavioral result (−67% competitive, ×2 cooperative) is a useful benchmark for what LLM-based practice can achieve in a related interpersonal domain.

**Citation notes:**
- ✅ Cite for: LLM-based role-play with theory-grounded prompting produces significant behavioral change (−67% competitive strategies, doubled cooperative strategies) — CHI 2024 experimental evidence.
- ✅ Cite for: naive LLM generation is sycophantic and unhelpful for skill teaching — motivates the structured design of both the simulator and Sage.
- ✅ Cite for: theory-grounded LLM prompting (IRP Prompting analog → this project's GTY + DwGJ grounding) is essential for effective simulation.
- ⚠️ Do NOT conflate with negotiation training — Rehearsal targets conflict resolution, not business negotiation skill; framing should be "related interpersonal skill training domain."
- Note: Rehearsal focuses on practice-time feedback; this project's debrief (Sage) is a post-practice structured reflection — complementary designs addressing different points in the learning loop.

## Daryanto, Ding, Wilhelm, Stil, Knutsen & Rho (2025) — Conversate

**Reference:** Daryanto, T., Ding, X., Wilhelm, L. T., Stil, S., Knutsen, K. M., & Rho, E. H. (2025). Conversate: Supporting reflective learning in interview practice through interactive simulation and dialogic feedback. *Proc. ACM Hum.-Comput. Interact., 9*(GROUP), Article 009. https://doi.org/10.1145/3701188

**Summary:**
Introduces Conversate, a web-based LLM system for job interview practice built around three steps: (1) **Interview Simulation** — GPT-3.5-Turbo conducts an interactive mock interview with dynamically generated follow-up questions based on the user's responses; (2) **AI-Assisted Annotation** — after the session, the system evaluates the user's answers against 5 communication principles (effectiveness, appropriateness, efficiency, clarity, competence) and highlights weak responses as orange timestamps on a playback bar; (3) **Dialogic Feedback** — the user engages in a back-and-forth conversation with GPT-4 about the annotated moments, asking questions and iteratively refining their answers. The dialogic feedback design is grounded in Steen et al.'s 4 dimensions of dialogic feedback and uses the STAR method (Situation, Task, Action, Result) to structure guidance on good responses. User study: N=19 participants, qualitative perception study. Key findings: participants valued adaptive follow-up questions, AI annotation reduced cognitive burden and excessive self-criticism, dialogic feedback promoted personalized learning while reducing judgment. Critical limitation: LLMs are sycophantic — when users expressed disagreement, the LLM too easily agreed with them, undermining the reflection quality.

**Negotiation / Skill Theory Used:**
No domain-specific theory equivalent to GTY or DwGJ. Annotation criteria are 5 generic communication principles developed with career counselors. Dialogic feedback grounded in Steen et al.'s 4 dialogic feedback dimensions — a learning science framework, not a domain theory.

**Relevance to This Work:**
The closest architectural parallel to this project across all reviewed literature. The three-step structure maps directly: Interview Simulation → Negotiation Simulator; AI-Assisted Annotation → Stage 1 DebriefPlan; Dialogic Feedback → Sage (Stage 2). Key gaps vs. this project: (a) job interview not negotiation; (b) no behavioral theory grounding — annotation uses generic communication criteria, not GTY; (c) dialogic feedback is open-ended LLM chat, not DwGJ-structured advocacy-inquiry designed to surface cognitive frames; (d) qualitative study only — no RCT, no evidence of skill improvement; (e) the sycophancy problem they identify is exactly what Sage's pushback handling protocol addresses. Cite as the closest HCI prior work; use to motivate why theory-grounded debrief dialogue is necessary beyond generic LLM feedback.

**Direct quotes:**
- *"Prior work that provides AI feedback for reflective learning typically offers one-way feedback, limiting the ability for users to engage in dialogue and seek clarification or additional guidance."* (p. 6)
- *"[Dialogic feedback] promotes personalized and continuous learning, reduced feelings of judgment, and allowed them to express disagreement."* (p. 2)
- *"When users express disagreement during the dialogic feedback, the LLM easily agrees with users' disagreement, which is related to the sycophantic behavior of LLMs."* (p. 4)

**Citation notes:**
- ✅ Cite for: prior HCI work combining simulation + dialogic feedback for skill practice — closest architectural parallel.
- ✅ Cite for: sycophancy as an open challenge in LLM-based dialogic feedback — motivates Sage's structured pushback handling.
- ✅ Cite for: AI practice reduces fear of judgment and supports repeated low-stakes practice.
- ⚠️ Do NOT cite as evidence of skill improvement — no control group, no pre/post behavioral measure.
- ⚠️ Do NOT conflate with negotiation training — job interview context, different skill domain.

## Yang, Ziems, Held, Shaikh, Bernstein & Mitchell (2024) — APAM

**Reference:** Yang, D., Ziems, C., Held, W., Shaikh, O., Bernstein, M. S., & Mitchell, J. (2024). Social skill training with large language models. arXiv:2404.04204.

**Summary:**
A perspective paper proposing **APAM** (AI Partner + AI Mentor), a generic framework for LLM-based social skill training. The AI Partner handles practice simulation; the AI Mentor handles feedback and coaching. Each operates along a capability continuum. **AI Partner modes:** (1) *Rubber Duck* — passive practice (talking out loud); (2) *Peer Roleplay* — simulated peer, like Rehearsal; (3) *Standardized Partner* — high-fidelity, reproducible, like standardized patients in medical training. **AI Mentor modes:** (1) *Conversational Content* — rephrases theory in accessible language; (2) *Theory-Grounded Suggestions* — suggests moves grounded in expert frameworks; (3) *Structured Feedback* — actionable, personalized, multi-turn feedback grounded in domain theory and full session context. The paper proposes a 4-step methodology: (i) understand the target social process; (ii) design an AI Partner; (iii) create an AI Mentor; (iv) run comparative user studies. Table 1 maps the framework across 5 skill clusters (active listening, conflict avoidance, conflict resolution, empathy, rhetoric) with domain-specific frameworks and roles — **negotiation is not included**. Three existing systems are positioned as APAM examples: CARE (peer counseling, AI Mentor), Rehearsal (conflict resolution, AI Partner), GPTeach (teaching assistant, AI Partner). No experiments; position/perspective paper only.

**Relevance to This Work:**
This paper provides the theoretical architecture that this project fully instantiates — applied to negotiation, a domain not covered in their framework. The Negotiation Simulator = AI Partner at Standardized Partner mode (consistent, scenario-controlled, personality-varied counterpart). Sage = AI Mentor at Structured Feedback mode (multi-turn, DwGJ-grounded, full-transcript-aware debrief). This project advances beyond prior APAM instantiations in two ways: (1) the AI Mentor is grounded in a domain-specific theory (DwGJ) rather than generic feedback principles; (2) behavioral measurement (BQS) is added as a fourth step beyond Yang et al.'s three-step loop. Conversate (Daryanto et al., 2025) is also an APAM system for job interviews, but its AI Mentor operates only at Mode 1–2 (STAR method + communication principles) rather than Mode 3 structured feedback. The paper explicitly flags that Structured Feedback mode requires reasoning over long multi-turn conversations as a technical challenge — which this project addresses via Stage 1 (Sonnet, full transcript → DebriefPlan JSON).

**Direct quotes:**
- *"The AI Partner will reduce the socioeconomic barrier to enter specialized fields. Our complementary vision is the AI Mentor, which will offer personalized feedback based on domain expertise and factual knowledge."* (p. 1)
- *"[Structured Feedback] would require reasoning over long, multi-turn conversations to an extent not possible with the attention mechanisms and context length limitations of current LLMs."* (p. 5)
- *"APAM focuses on empowering users to become more aware of where they struggle."* (p. 5)

**Citation notes:**
- ✅ Cite for: the APAM framework as the theoretical architecture this project instantiates — AI Partner (simulator) + AI Mentor (Sage).
- ✅ Cite for: negotiation as an unaddressed domain in the APAM framework — motivates this project's contribution.
- ✅ Cite for: Structured Feedback mode requiring long-context reasoning — validates the Stage 1 architecture (Sonnet plan generation).
- ✅ Cite for: the 4-step methodology (understand process → AI Partner → AI Mentor → comparative study) as the design rationale for the RCT.
- ⚠️ No empirical claims — perspective paper only; do NOT cite for evidence of effectiveness.

---

## Burgues, Goujet & Zaraik (2024)

**Reference:** Burgues, M., Goujet, R., & Zaraik, J. (2024). Learning soft skills with an AI-based simulation role-play: A literature review. *EDULEARN24 Proceedings*, 6285–6293.

**Summary:**
A literature review of 130 papers (post-2020 for AI/soft skills content) surveying the intersection of AI-based simulation and soft skills development. Background research for the Erasmus+ ROLEPL-AI project (tourism/VET sector). Organized into three sections: (1) *Cognitive science* — AI positively influences problem-solving, logical reasoning, and collaboration; supports metacognition and self-assessment; cognitive overload is a real risk that must be managed via multimedia design guidelines. (2) *Soft skills training* — role-playing is the dominant training method; AI simulation is well-documented as effective in healthcare and hospitality; Liaw et al. [43] demonstrated significant communication skill improvements from AI simulation in VR; simulation provides a safe practice environment for skill refinement. (3) *Learning with AI simulations* — Human-AI interaction design guidelines (Amershi et al. 18-guideline framework); perceived social presence and engagement matter for learning persistence. Conclusion: AI simulation role-play is a good fit for soft skills training, but most evidence is from pre-generative-AI systems; more studies on LLM-based simulation are needed.

**Relevance to This Work:**
Not cited in related work. Kept as a reference mine. Key follow-up papers from its reference list:
- **[43] Liaw et al. (2023)** — *"Artificial intelligence in virtual reality simulation for interprofessional communication training: Mixed method study."* Nurse Education Today, 122, 105718. → Empirical evidence for AI simulation improving communication skills in healthcare; potentially citable for "AI simulation changes behavior."
- **[22] Luo et al. (2021)** — *"Artificial Intelligence Coaches for Sales Agents: Caveats and Solutions."* Journal of Marketing, 85(2), 14–32. → AI coaching for professional skill development; adjacent domain (sales negotiation).
- **[41] Schutt et al. (2017)** — Simulated digital role plays to teach healthcare soft skills. IEEE SeGAH. → Early empirical evidence for simulation-based soft skill training.
- **[37] Dai (2021)** — AI Virtual Humans for Simulation-Based Training with Graduate Teaching Assistants. ICLS 2021. → AI virtual humans as simulation counterparts.

**Citation notes:**
- ⚠️ Do NOT cite in related work — it's a background literature review with no original empirical findings.
- ✅ Use its reference list to find empirical papers on AI simulation for soft skill training if more evidence is needed.

---

## Guevarra, Bhattacharjee, Das, Wayllace, Demmans Epp, Taylor & Tay (2025) — GLOSS

**Reference:** Guevarra, M., Bhattacharjee, I., Das, S., Wayllace, C., Demmans Epp, C., Taylor, M. E., & Tay, A. (2025). An LLM-guided tutoring system for social skills training. *Proceedings of the AAAI Conference on Artificial Intelligence, 39*(28), 29643–29645.

**Summary:**
Introduces GLOSS (Guided Learning for Optimizing Soft Skills), a framework in which instructors collaborate with an LLM to design training scenarios, and students practice social skills through a conversational simulator. Four components: (1) **Front-end builder** — instructors create scenarios (e.g., handling an angry customer) using templates, freeform prompts, or LLM generation, without requiring technical skills; (2) **Narrative graph** — a branching tree of all possible interactions; the LLM also generates new branches in real time when the student's response doesn't fit existing paths; (3) **Conversational simulator** — student practices with a GPT-4-powered avatar that reacts according to the narrative graph; immediate feedback is provided after each response; (4) **Analysis tool** — visualizes the student's path through the narrative graph for delayed instructor feedback and student self-reflection. System/demo paper only — no user study, no experimental results.

**Relevance to This Work:**
Represents emerging work at an AI conference (AAAI 2025) on LLM-based social skills tutoring systems. Relevant as a venue citation and to position this project within the broader space. Key gaps vs. this project: instructor must manually build each scenario (not autonomous); no domain-specific theoretical framework (no GTY or DwGJ equivalent); feedback is immediate per-turn response, not a structured post-practice debrief; no empirical evaluation. Cite lightly — useful for one sentence positioning LLM social skills training at AI venues, not as a primary comparison.

**Citation notes:**
- ✅ Cite for: LLM-guided tutoring for social skills training as an emerging area at AI conferences.
- ⚠️ Do NOT cite for empirical claims — system paper only, no user study results.

---

# Category C — Debriefing Theory + AI-Facilitated Debriefing

## Fanning & Gaba (2007)

**Reference:** Fanning, R. M., & Gaba, D. M. (2007). The role of debriefing in simulation-based learning. _Simulation in Healthcare, 2_(2), 115–125.

**Summary:**
A comprehensive review of debriefing theory and practice in simulation-based medical education. Key findings: (1) debriefing is described as "the heart and soul" of simulation — more important than the simulation itself; (2) a systematic review identified feedback as the _most important feature_ of high-fidelity simulation education; (3) adults learn best through Kolb's experiential learning cycle (experience → reflective observation → abstract conceptualization → active experimentation), and debriefing is the structured facilitation of the reflection phase; (4) three structural elements common across models: description, analysis, application; (5) the DwGJ approach by Rudolph et al. is cited as superior to both purely judgmental and purely nonjudgmental styles.

**Relevance to This Work:**
Primary citation for why debriefing matters. Provides the empirical basis for the claim that "debriefing is the single most important component of simulation-based education." Central justification for why adding AI debriefing to AI practice is predicted to improve outcomes beyond practice alone. The grounding in Kolb's experiential learning theory supports the theoretical framing of the RCT: the _reflection phase_ is where practice-to-learning conversion happens.

---

## Rudolph, Simon, Rivard, Dufresne & Raemer (2007) — DwGJ

**Reference:** Rudolph, J. W., Simon, R., Rivard, P., Dufresne, R. L., & Raemer, D. B. (2007). Debriefing with Good Judgment: Combining rigorous feedback with genuine inquiry. _Anesthesiology Clinics, 25_(2), 361–376.

**Summary:**
The foundational paper for the Debriefing with Good Judgment (DwGJ) framework. The paper argues against two inadequate extremes: (1) _judgmental_ debriefing, which places blame and humiliates, and (2) _nonjudgmental_ debriefing, which avoids critique and leaves the instructor's views hidden. DwGJ occupies a third position: the instructor states their observation as a hypothesis (advocacy), then invites the learner's perspective (inquiry), creating a collaborative dialogue rather than a one-way correction. The theoretical basis is _reflective practice_ (Schön/Argyris): people act from invisible cognitive frames, and durable behavioral change requires surfacing and testing those frames. The method has been validated across ~2,000 debriefs at the Center for Medical Simulation. The signature move is advocacy-inquiry: "I noticed X [observation]. I was thinking Y [hypothesis]. How were you seeing it? [genuine question]."

**Relevance to This Work:**
DwGJ is the explicit theoretical backbone of Sage. The entire design of Phase C (hypothesis presentation → pushback handling → takeaway question) is grounded in this framework. Sage's `diagnostic_insight` is hypothesis-framed ("It appears…"), not a verdict — direct implementation of DwGJ's advocacy move. The decision NOT to use Socratic questioning (which the paper critiques as "easing in" that backfires) also comes from this source. The single most important design citation for the debrief pipeline.

---

## Hong, Kazmir, Dylik et al. (2025)

**Reference:** Hong, E., Kazmir, S., Dylik, B., Auerbach, M., Rosati, M., Athanasopoulou, S., … Gross, I. T. (2025). Exploring the use of a large language model in simulation debriefing: An observational simulation-based pilot study. _Simulation in Healthcare, 20_(6), 366–371.

**Summary:**
A prospective observational pilot study (N = 4 facilitators, 25 learners) at Yale School of Medicine. GPT-4o was used to generate debrief scripts from real-time transcription of pediatric simulations; the scripts were displayed on a large screen for the facilitator to use. Results: strong enthusiasm for AI integration (4.75/5 facilitators, 4.0/5 learners); facilitator workload remained moderate despite AI support; AI was rated highly for maintaining debrief focus and supporting learning objectives. Importantly, the study was observational with no control group and the AI served as an assistant to a human facilitator — not as an autonomous debrief agent.

**Relevance to This Work:**
The closest prior work in the LLM-for-debriefing space but differs critically: the AI was a _support tool for a human facilitator_, not an autonomous agent. Sage operates without a human facilitator, closing the gap this paper leaves open. The paper confirms LLM debriefing is feasible and reduces facilitator burden — supporting the claim that autonomous agents are the logical next step.

---

## Gonzalez & Nagendran (2025)

**Reference:** Gonzalez, L., & Nagendran, A. (2025). Artificial intelligence (AI)-facilitated debriefing: A pilot study. _Clinical Simulation in Nursing, 105_, 101782.

**Summary:**
A mixed-methods pilot study (N = 52 nursing students) using an AI-facilitated debrief (Relativ.ai + the EMPOWER® debriefing framework) following a virtual medical-surgical simulation. The AI guided students through structured verbal reflections, then analyzed conversations on five dimensions: confidence, fluency, authority, critical thinking, clarity. Key findings: (1) No significant correlation between time in debrief and simulation scores; (2) Students meeting more dimensions (3-4) spent significantly _less_ time in debrief — interpreted as cognitive efficiency; (3) Meeting more dimensions did not predict higher simulation scores. Conclusion: AI debriefing shows potential for scalable reflective practice but should not replace human-led sessions.

**Relevance to This Work:**
Second key prior work in the AI-for-debriefing space. Same gap applies: no control condition, uses proprietary commercial AI (not a dialogue LLM), clinical context rather than negotiation. Cited to establish that AI debriefing research in non-negotiation domains is emerging but lacks controlled evaluation.

---

## Evangelou, Klar, Träg, Mulders, Marnitz & Rahner (2025) — GenAI-Chatbots as Debriefers

**Reference:** Evangelou, D., Klar, M., Träg, K., Mulders, M., Marnitz, M., & Rahner, L. (2025). GenAI-chatbots as debriefers: Investigating the role conformity and learner interaction in counseling training. *DELFI 2025, Lecture Notes in Informatics.* Gesellschaft für Informatik. https://doi.org/10.18420/delfi2025_05

**Summary:**
A qualitative study (N=22 chatbot condition) examining whether a GenAI chatbot can serve as a debriefer following VR-based counseling simulation training. University students in Germany practiced counseling with a virtual avatar client for 20 minutes in VR, then debriefed with a chatbot (Meta Llama 3.1 8B Instruct) following a pre-coded three-phase debriefing protocol (reaction → understanding → summary). The chatbot introduced itself, guided students through the phases in fixed sequence, asked about emotions, facilitated transfer to real-world practice, and closed with a takeaway question. Two research questions: (1) Does the chatbot maintain its debriefer role? (2) How do students interact with it? Chatlogs analyzed via qualitative content analysis (κ = .82). Key findings: strong role conformity in 21/22 cases; recurring sycophancy — overly enthusiastic responses ("interesting/awesome/fantastic/important" appeared 156 times across 21 debriefs), occasional "fourth wall" breaks with stage directions; but students maintained self-critical attitudes and were not misled by the chatbot's over-praise. Guidance satisfaction: M = 4.33/5.0. No control group; no performance outcome measurement.

**Key distinction from DwGJ:** The protocol is a fixed sequence of pre-scripted question types — it does not form hypotheses about the learner's cognitive frames, does not combine advocacy with inquiry, and does not adapt based on what the student reveals. The AI value lies in conversational delivery of open-ended questions and analysis of responses.

**Relevance to This Work:**
Two direct contributions to the related work: (1) extends AI-facilitated debriefing beyond medical education into interpersonal skills training (counseling), demonstrating the field is expanding; (2) sycophancy resurfaces as a core limitation — consistent with Daryanto et al.'s finding in Conversate — reinforcing that robustness of the reflection mechanism remains an open challenge. Neither DwGJ nor any validated reflective methodology is applied. Gap holds.

**Direct quotes:**
- "notwithstanding occasional role deviations, sycophantic tendencies, and repetitive output, GenAI chatbots demonstrate potential as debriefing facilitators" (p. 51)
- "students appeared unaffected by this bias, maintaining critical self-reflection" (p. 51)
- "AI-supported debriefings may serve as a resource-efficient complement to moderated debriefing in (higher) education" (p. 52)

---

## Evangelou, Mulders & Träg (2026) — Bot or Not?

**Reference:** Evangelou, D., Mulders, M., & Träg, K. H. (2026). Bot or not? Differences in cognitive load between human- and chatbot-led post-simulation debriefings. *Education Sciences, 16*(2), 255. https://doi.org/10.3390/educsci16020255

**Summary:**
A controlled study (N=45) directly comparing human-moderated vs. chatbot-guided post-simulation debriefing in VR-based counselor training (same VR-Hybrid project as Evangelou et al. 2025). Participants randomly assigned to human-moderated (n=23) or chatbot-guided (n=22) condition. Both conditions followed the identical three-phase Structured Debriefing framework (Palaganas et al. 2016): reaction → understanding → summary. Same Llama 3.1 8B chatbot; sessions averaged ~14.5 min in both conditions. Outcome: cognitive load only — intrinsic (ICL), extraneous (ECL), germane (GCL) measured via Klepsch et al. (2017) questionnaire on 7-point Likert scale. Results: no statistically significant differences on any dimension — ICL (p=0.557, d=0.18), ECL (p=0.267, r=0.17), GCL (p=0.169, d=0.42). No learning outcome measurement. Limitations: small/homogeneous sample, short-term, cognitive load only. Conclusion: chatbot-led debriefings do not impose additional cognitive burden compared to human-led sessions, supporting feasibility of AI debriefing in higher education.

**Key distinction from DwGJ:** Same fixed three-phase protocol as Evangelou et al. (2025) — chatbot progresses through phases in fixed sequence ("a consistent progression through the reflection phases across participants"), does not form hypotheses about learner cognitive frames, does not combine advocacy with inquiry.

**Relevance to This Work:**
The most methodologically rigorous AI debriefing study found: random assignment, direct human vs. AI comparison, non-medical domain (counseling/interpersonal skills). But the outcome is cognitive load, not skill development — it establishes *feasibility without extra burden*, not *superior learning outcomes*. Useful for Para 4 to show the field is progressing toward controlled evaluation while noting that no study yet tests whether a theoretically grounded AI debrief methodology (DwGJ) improves domain-specific outcomes. Gap holds.

**Direct quotes:**
- "chatbot-led debriefings do not significantly differ from human-led debriefings in ICL, ECL and GCL" (p. 10)
- "AI-driven facilitation can serve as a practical complement to human instructors, helping to address resource constraints while maintaining instructional effectiveness" (p. 10)
- "Long-term effects on learning outcomes were not assessed" (p. 9)

---

# Category D — Theoretical Foundation

## Fisher, Ury & Patton (1981) — _Getting to Yes_

**Reference:** Fisher, R., Ury, W., & Patton, B. (1981). _Getting to Yes: Negotiating Agreement Without Giving In._ Penguin Books.

**Summary:**
The foundational text of principled negotiation, developed out of the Harvard Negotiation Project. The book argues against _positional bargaining_ (trading positions back and forth) and proposes four principles: (1) _Separate the people from the problem_ — don't conflate relationship issues with substantive disagreement; (2) _Focus on interests, not positions_ — understand the underlying why behind stated demands; (3) _Invent options for mutual gain_ — generate creative solutions before evaluating them; (4) _Insist on objective criteria_ — use external standards (market value, expert opinion, precedent) to evaluate proposals rather than will-power. BATNA (Best Alternative To a Negotiated Agreement) is introduced as the foundational concept of negotiating power: know your walkaway, protect it, and try to improve it.

**How GTY differs from frameworks used in Category A papers:**

| Framework | Pie assumption | Goal | Key move | Designed for |
|---|---|---|---|---|
| Lewicki distributive | Fixed | Maximize your slice | Anchor + concede on price | Practitioners haggling (single issue) |
| Lewicki dual-concern | Fixed | Win according to style | Choose style based on self/other concern | Style classification |
| MIBT (Fershtman 1990) | Fixed (predefined issues) | Maximize utility score | Trade across issues | Research measurement of computational agents |
| GTY principled negotiation | Expandable | Mutual gain | Reveal interests, invent options, use objective criteria | Teaching humans to negotiate well |

No Category A paper (Dinnar, Dannenmann, ACE, Kwon, Rottner, Balle) uses GTY as its theoretical basis. The gap is structural: NLP researchers favor quantitatively tractable frameworks (Lewicki, MIBT) whose outcomes can be measured computationally. GTY's interest-based, relationship-aware principles are harder to operationalize as loss functions. This project is the first AI negotiation training system to ground both its measurement framework and its debrief agent in GTY principled negotiation.

**Relevance to This Work:**
GTY's four principles (+ BATNA) form the dimensional structure of the BQS scoring rubric (D1–D4 + D5). The negotiation diagnostic matrix used in Sage's Stage 1 maps transcript evidence to these same principles. The measurement system adapts NegotiAct behavioral codes to GTY dimensions — so every coded behavior in the transcript is ultimately anchored in this theoretical framework. GTY is the theoretical throughline connecting measurement → debrief → improvement.

## McKersie & Walton (2015)

**Reference:** McKersie, R. B., & Walton, R. E. (2015). Reflections on negotiation theory, practice, and education: A robust record and new opportunities. _Negotiation Journal, 31_(4), 491–500.

**Summary:**
A reflective essay by the original authors of _A Behavioral Theory of Labor Negotiations_ (1965), written for the 50th anniversary of that foundational work. McKersie and Walton survey five decades of negotiation research and education, acknowledging key contributions that built on their integrative/distributive bargaining framework — including Fisher and Ury's _Getting to Yes_ (1983), which they credit with expanding the field's horizons and bringing interest-based bargaining into practical application. Two observations are central: (1) the field of negotiation research and education has grown enormously (thousands of executive education courses, law and business school programs, dedicated journals and professional associations); and (2) despite this growth, "producing lasting behavioral change is a tall order" — the authors note that "insufficient attention has been given to conducting follow-up studies that document how this knowledge actually gets deployed and what difference it makes in practice." They also identify understudied phases of the negotiation "value chain": the pre-table preparation phase and the post-agreement implementation phase.

**Relevance to This Work:**
Provides authoritative support for the motivation behind structured debrief. McKersie and Walton — the field's foundational theorists — explicitly acknowledge that negotiation training does not reliably produce lasting behavioral change and that follow-up research is insufficient. This directly motivates the design choice to add structured AI debriefing (Sage) to AI practice: the practice alone is unlikely to produce durable skill improvement without a mechanism to consolidate and reflect on the experience. Also confirms Fisher & Ury's GTY as a central and widely recognized contribution to the field, lending weight to GTY as the theoretical basis for this project's measurement and debrief frameworks.

---

# Category F — Debriefing with Good Judgment (DwGJ) — Core Papers

> These five papers form the theoretical and empirical foundation for Sage's design. Read together, they establish: (1) why DwGJ is theoretically superior to other debriefing approaches, (2) how its core technique works in practice, (3) empirical evidence that it improves outcomes, and (4) where AI fits into the picture. None of these papers is in a negotiation context — this project is the first application of DwGJ outside clinical/counseling simulation.

---

## Rudolph, Simon, Dufresne & Raemer (2006) — "No Such Thing as Nonjudgmental"

**Reference:** Rudolph, J. W., Simon, R., Dufresne, R. L., & Raemer, D. B. (2006). There's no such thing as "nonjudgmental" debriefing: A theory and method for debriefing with good judgment. *Simulation in Healthcare, 1*(1), 49–55.

**Summary:**
The companion theory paper to Rudolph et al. (2007) — establishes the conceptual argument that DwGJ is built on. The central claim: instructors who claim to be "nonjudgmental" are not actually withholding judgment — they are hiding it. The judgment is always present; the only choice is whether it is disclosed or concealed from the learner. Hidden judgment is harmful: it prevents the learner from understanding what the expert actually observed and thought, while covert critique can come through in tone and body language anyway. The paper introduces the three-element model that became DwGJ's structural backbone: (1) a **conceptual model of frames** — behavior is driven by mental frames (composed of knowledge, assumptions, and feelings) that are largely invisible to the actor; (2) a **stance of curiosity** — the instructor approaches errors as puzzles ("I wonder what they were thinking") rather than failures ("they got it wrong"); (3) the **advocacy-inquiry conversational technique** — the instructor states an explicit observation plus a clinical judgment (advocacy), then asks a genuinely open question to reveal the learner's frame (inquiry). Together these three elements produce honest, expert feedback delivered in a psychologically safe way. The **"frames → actions → results"** causal chain is introduced here: the frame is upstream of the action, and the action is upstream of the result; changing behavior durably requires intervening at the frame level, not just correcting the action.

**Key distinction from other debriefing methods:**
- *Judgmental*: "You did X wrong. Do Y instead." — honest but damages psychological safety; learner becomes defensive, frame remains unchanged.
- *Nonjudgmental*: "What did you think about that?" — psychologically safe but expert judgment is hidden; learner receives no diagnostic information; frame remains unchanged.
- *DwGJ*: "I noticed X. I was thinking Y [advocacy]. What was going through your mind? [inquiry]" — honest AND psychologically safe; learner's frame is surfaced and can be examined.

**Theoretical roots:** Argyris & Schön's reflective practice theory; organizational learning literature on "single-loop" vs. "double-loop" learning. Double-loop learning (changing the underlying assumption, not just the action) is exactly what DwGJ is designed to produce.

**Relevance to This Work:**
This paper is the theoretical justification for *why* Sage uses advocacy-inquiry rather than open-ended Socratic questioning. Sage's `diagnostic_insight` field ("It appears…") is the advocacy move; Sage's follow-up question is the inquiry move. The frames → actions → results chain is the reason behavioral coding (BQS) at the dimension level is the right measure — if DwGJ works at the frame level, behavioral patterns should shift across rounds, not just outcomes.

**Citation notes:**
- ✅ Cite for: the advocacy-inquiry technique as the specific mechanism Sage implements.
- ✅ Cite for: the theoretical argument that nonjudgmental debriefing is a myth — motivates why Sage states a hypothesis rather than asking open questions.
- ✅ Cite for: frames → actions → results as the causal model behind why behavioral coding (not just outcome score) is the right measure.

---

## Rudolph, Simon, Rivard, Dufresne & Raemer (2007) — DwGJ Foundational

**Reference:** Rudolph, J. W., Simon, R., Rivard, P., Dufresne, R. L., & Raemer, D. B. (2007). Debriefing with Good Judgment: Combining rigorous feedback with genuine inquiry. *Anesthesiology Clinics, 25*(2), 361–376.

> Also summarized in **Category C**. This entry focuses on details most relevant to Sage's design.

**Summary:**
The primary published description of DwGJ as a complete method, drawing on approximately 2,000 debriefings conducted at the Center for Medical Simulation (Harvard / MGH). Extends the 2006 paper by providing the full three-phase structure and detailed examples of advocacy-inquiry in practice.

**Three-phase structure:**
1. **Reactions** — open with emotional decompression ("How did that feel?"); allow participants to release tension before analysis begins; instructor listens without judging.
2. **Analysis** — the core DwGJ phase; instructor acts as a "cognitive detective," identifying which behaviors matter most, forming a hypothesis about the frame driving each behavior, and using advocacy-inquiry to surface and examine those frames with the learner.
3. **Summary** — learner articulates takeaways; instructor confirms and closes; frames the learning as transferable to future practice.

**The "cognitive detective" stance:**
The instructor's job is not to dispense verdicts but to form and test hypotheses. The instructor observes a behavior, hypothesizes a frame behind it ("it looks like they were treating this as zero-sum"), and then inquires genuinely — not rhetorically — to test that hypothesis. If the learner's explanation reveals a different frame, the instructor updates. This is fundamentally different from Socratic questioning, which guides toward a predetermined answer. DwGJ inquiry is genuinely open.

**What makes it "good judgment":**
The paper argues that expert judgment is not the problem — it is essential. The problem is *how* it is delivered. DwGJ makes the judgment explicit and transparent ("I thought X") rather than concealed or coercive, which allows the learner to engage with it intellectually rather than defensively.

**Empirical basis:** 2,000+ debriefs; no controlled experiment in this paper — it is a method description and theoretical paper.

**Relevance to This Work:**
The three-phase structure maps directly onto Sage's pipeline: Phase A (Reactions) = Sage's opening; Phase B (Analysis) = the key moments discussion using advocacy-inquiry; Phase C (Summary) = the takeaway elicitation. The "cognitive detective" framing is the conceptual basis for Stage 1 (Sonnet generating a DebriefPlan: analyzing the transcript to identify the two most diagnostic moments and forming a hypothesis about the cognitive frame behind each).

---

## Kolbe, Weiss, Grote, Knauth, Dambach, Spahn & Grande (2013) — TeamGAINS

**Reference:** Kolbe, M., Weiss, M., Grote, G., Knauth, A., Dambach, M., Spahn, D. R., & Grande, B. (2013). TeamGAINS: A tool for structured debriefings for simulation-based team trainings. *BMJ Quality & Safety, 22*(7), 541–553. https://doi.org/10.1136/bmjqs-2012-000917

**Summary:**
Introduces TeamGAINS, a structured debriefing tool designed for interprofessional simulation-based team training. The name encodes its three integrated approaches: **G**uided team self-correction, **A**dvocacy-**I**nquiry (drawn directly from DwGJ), and **S**ystemic-constructivist techniques. The tool operates across six sequential phases and is designed to move between individual-level and team-level reflection, making it richer than a one-on-one debrief. Developed and validated by the research group at ETH Zurich (Kolbe, Grande) — the same group that later produced Tscholl et al. (2026).

**The three integrated approaches:**
- **Guided team self-correction:** learners identify their own performance gaps before the facilitator intervenes; reduces defensiveness; leverages the team's internal knowledge.
- **Advocacy-inquiry (from DwGJ):** directly adopts Rudolph et al.'s technique. Facilitator states observation + hypothesis, then asks genuinely. Used when self-correction does not surface the relevant frame, or when the facilitator has a specific clinical concern.
- **Systemic-constructivist techniques:** zooms out from individual behavior to team dynamics, communication structures, and role relationships; uses circular questions ("How do you think your colleague experienced that moment?") to surface interpersonal frames.

**Why three approaches?** Each approach has limits: self-correction misses blind spots; advocacy-inquiry is facilitator-intensive; systemic questions are time-consuming. The hybrid structure deploys each technique at the right moment.

**Methods and results:**
- Setting: University Hospital Zurich; anesthesia simulation center
- Participants: 61 anesthesia staff (senior anesthesiologists, residents, nurses) across 40 debriefing sessions; 235 individual evaluations
- Outcomes: Debriefing utility rated highly positive; **psychological safety** significantly increased post-training; **leader inclusiveness** significantly increased post-training (both p < .05)
- Note: No control group; pre-post design; outcome = team climate measures, not clinical skill

**Relevance to This Work:**
TeamGAINS is the most rigorous empirical study directly testing DwGJ's advocacy-inquiry technique in practice. Its finding that psychological safety and leader inclusiveness increase post-debrief is relevant because psychological safety is a prerequisite for honest self-disclosure — if participants don't feel safe, they won't reveal their real cognitive frames. This supports the design rationale for Sage's "stance of curiosity" opening and its non-judgmental framing of hypotheses ("It appears…" rather than "You should have…"). Also: the integration of advocacy-inquiry with other techniques in TeamGAINS suggests that DwGJ does not need to be applied in isolation — it is a modular technique that can combine with other approaches.

**Citation notes:**
- ✅ Cite for: empirical evidence that the advocacy-inquiry technique (DwGJ's core move) increases psychological safety and leader inclusiveness in team simulation debriefs.
- ✅ Cite for: DwGJ as a modular technique that can be integrated into broader structured debriefing tools.
- ⚠️ No control group — cannot claim "DwGJ outperforms other methods"; cite as "DwGJ-based debriefing produced significant improvements in psychological safety."
- ⚠️ Full text behind BMJ paywall — verify specific statistical values before citing.

---

## Shao, Cheng, Gu, Yan, Liu, Zhang, Zhang, Yin & Zhang (2025) — Chinese RCT

**Reference:** Shao, W., Cheng, X., Gu, W., Yan, Y., Liu, H., Zhang, J., Zhang, L., Yin, H., & Zhang, M. (2025). A combined approach of simulation-based "debriefing with good judgment" and case-based learning to enhance clinical thinking in Chinese residents. *Frontiers in Public Health.* https://doi.org/10.3389/fpubh.2025.1718961 — PMID: 41716213

**Summary:**
The most rigorous controlled experiment to date specifically testing DwGJ as a debriefing method. A randomized controlled educational trial (N = 70 residents from six specialties — Internal Medicine, Surgery, OB/GYN, Pediatrics, Emergency Medicine, ICU — at the First Affiliated Hospital of Jinan University, Guangzhou, China, 2023–2024 academic year). Participants were randomly assigned to DwGJ+CBL (n=35) or CBL alone (n=35).

**Intervention design:**
- **Control group (CBL only):** 40 minutes of supervised hands-on skill practice within clinical case scenarios.
- **DwGJ group (DwGJ+CBL):** 20 minutes of hands-on practice (same CBL scenarios) followed by a structured DwGJ debriefing session. DwGJ was implemented using the standard three-phase structure: (1) instructor established psychological safety and a "relaxing ambiance"; (2) advocacy-inquiry technique applied to key moments from the simulation; (3) instructor explicitly avoided trying to "fix" learners — genuinely curious inquiry used instead.

**Results:**

| Outcome | CBL Control (n=35) | DwGJ+CBL (n=35) | Significance |
|---|---|---|---|
| Theoretical knowledge score | 52.34 ± 18.42 | 64.40 ± 13.22 | p = 0.02 |
| Practical skill score | 72.32 ± 7.6 | 80.54 ± 7.4 | p < 0.01 |
| Critical thinking | Lower | Significantly higher | p < .05 |
| Systematic thinking | Lower | Significantly higher | p < .05 |
| Evidence-based thinking | Lower | Significantly higher | p < .05 |
| Course satisfaction | Lower | Significantly higher | p < .05 |
| Instructor evaluation | No significant difference | — | n.s. |

**Key findings:**
- DwGJ+CBL produced significantly better performance on both theoretical knowledge (+12 points) and practical skills (+8 points).
- All three clinical reasoning dimensions (critical, systematic, evidence-based thinking) were significantly higher in the DwGJ group — these are the cognitive competencies DwGJ is designed to develop by surfacing frames.
- The one non-significant outcome (instructor evaluation) suggests that DwGJ's gains appear in learner performance and reasoning, not in how instructors rate the overall interaction quality.

**Relevance to This Work:**
The single most important empirical citation for the claim that DwGJ works. Provides RCT-level evidence in a controlled educational setting, with effect sizes large enough to be educationally meaningful. The finding that DwGJ improves all three clinical reasoning dimensions — not just test scores — directly supports the theoretical claim that DwGJ operates at the cognitive frame level: it changes how learners think, not just what they know. The parallel to negotiation is clear: negotiation errors also stem from faulty cognitive frames (zero-sum thinking, positional anchoring, failure to explore interests) — DwGJ is designed to surface and correct exactly these.

**Citation notes:**
- ✅ Cite for: RCT evidence that DwGJ significantly outperforms standard case-based learning on both knowledge (p=0.02) and practical skill (p<0.01).
- ✅ Cite for: DwGJ's effect on clinical reasoning dimensions — supports the claim that DwGJ changes cognitive frames, not just surface behavior.
- ⚠️ Context is clinical residency training, not negotiation — cite with appropriate framing ("DwGJ has demonstrated significant gains in skill-focused simulation training contexts").
- Full text open access on Frontiers: https://www.frontiersin.org/articles/10.3389/fpubh.2025.1718961/full

---

## Tscholl, Ebensperger, Rahrisch et al. (2026) — Generative AI + TeamGAINS/DwGJ

**Reference:** Tscholl, D. W., Ebensperger, M., Rahrisch, A., Wang, H., Heckel, H., Thomasius, M., Kaserer, A., Grande, B., Seelandt, J. C., & Kolbe, M. (2026). Generative AI in simulation debriefings: An exploratory study using the Team-FIRST framework and qualitative feedback from simulation experts and learners. *Advances in Simulation, 11*, 14. https://doi.org/10.1186/s41077-026-00407-0 — PMC12924402

**Summary:**
From the same ETH Zurich group that developed TeamGAINS (Kolbe et al., 2013), this is their most recent study exploring how generative AI can support simulation debriefing. 41 anesthesia professionals participated in immersive simulation scenarios at University Hospital Zurich; verbal interactions were transcribed in real time using Isaac AI software, then analyzed by two LLM systems (Isaac + ChatGPT-4o) using the Team-FIRST teamwork framework (10 competencies: leadership, mutual performance monitoring, backup behavior, adaptability, team orientation, shared mental model, mutual trust, closed-loop communication, situation awareness, communication). The AI generated structured teamwork observation reports which were reviewed by 4 simulation experts (26 reports evaluated) and 27 learners were interviewed post-scenario.

**Critical detail — how DwGJ and AI related:**
The paper explicitly states that all debriefings were conducted "with adherence to the Debriefing with Good Judgment and TeamGAINS approaches" — by **human facilitators**. The AI's role was limited to **transcript analysis and observation report generation**. The AI never conducted the debrief itself. The human facilitator received an AI-generated report and used it as an input to their own DwGJ/TeamGAINS-guided debrief.

**Expert feedback on AI-generated reports:**
- Valued: broader observation capture (AI caught things humans missed during scenario management); accurate quote selection from transcripts.
- Flagged: categorization inaccuracies (Team-FIRST codes applied incorrectly); speaker misidentification; lack of nonverbal context (AI only sees speech); reports sometimes felt generic.
- Both experts and learners emphasized that **human oversight is essential** — AI cannot replace the facilitator's clinical judgment or relational sensitivity.

**Learner feedback:**
- Optimistic about efficiency and objectivity of AI observation.
- Raised concerns about transparency (what is the AI doing?), data protection (recording and transcribing everything), and skill erosion (will facilitators lose debriefing skills if they rely on AI reports?).

**Relevance to This Work:**
This paper represents the current frontier of AI + DwGJ research — and it shows exactly where the gap is. The most sophisticated AI integration in DwGJ debriefing to date still has AI in a supporting role: generating reports for a human facilitator. **Sage takes the next step: AI conducts the debrief directly, using DwGJ's advocacy-inquiry structure autonomously.** This paper also frames the key open question your study addresses: can AI facilitate DwGJ-based reflection without a human facilitator, and if so, does it produce measurable learning gains?

The experts' concern about "categorization inaccuracies" is also relevant: your Stage 1 (Sonnet generating a DebriefPlan) is designed to avoid generic classification by producing a hypothesis-framed `diagnostic_insight` grounded in Getting to Yes principles — a more contextually specific output than a Team-FIRST category code.

**Citation notes:**
- ✅ Cite for: the most recent AI + DwGJ work — AI-generated observation reports used by human DwGJ facilitators; AI has not yet conducted the debrief itself.
- ✅ Cite for: experts and learners both noted human oversight as essential — your study tests whether structured DwGJ design (Sage) can substitute for that oversight.
- ✅ Cite as: establishing that the DwGJ research group (Kolbe et al.) has engaged with AI, but has not yet crossed from AI-assisted to AI-led debriefing.
- ⚠️ Qualitative/exploratory study — no controlled comparison, no performance outcomes.
- Full text open access on PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC12924402/

---

# Category G — Reflection-to-Action Systems

## Kim, Low, Lafond, Shim, Han, Kandil, Zhang, Kitsberg, Boccagno, Liang & Maes (2026) — Breaking Negative Cycles

**Reference:** Kim, M. M., Low, D. M., Lafond, D., Shim, E., Han, M., Kandil, M., Zhang, C., Kitsberg, T., Boccagno, C., Liang, P. P., & Maes, P. (2026). Breaking negative cycles: A reflection-to-action system for adaptive change. In *Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems (CHI '26)*. ACM. https://doi.org/10.1145/3772318.3791615

**Summary:**
Addresses the gap between reflective awareness and behavior change: most digital well-being tools help people log experiences but not act on them, leaving reflection as rumination rather than growth. The paper designs and evaluates **WhatIf-Planning**, a two-component Reflection-to-Action system grounded in three theoretical frameworks: (1) the **Transtheoretical Model (TTM)**, which targets the *Preparation* stage — the bridge between contemplating change and taking action; (2) **Gross's Emotion Regulation (ER) Process Model** (five regulatory strategies: situation selection, situation modification, attentional deployment, cognitive change, response modulation); and (3) **MCII** (Mental Contrasting + Implementation Intentions), which converts "what-if" reframing into concrete "if-then" action plans.

**System architecture:**
- **Voice Journaling (mobile):** participants record in-the-moment spoken entries whenever a recurring regret or wish occurs; automatically transcribed and stored
- **WhatIf-Planning (web):** weekly facilitated sessions in which participants review transcribed entries, generate counterfactual "what-if" alternatives, and convert insights into concrete "if-then" action plans

**Experiment setting:**
- 15-day in-the-wild study; N = 20 participants (students, staff, and affiliates at Massachusetts institutions); recruited via departmental and dormitory mailing lists; 2-stage screening (general eligibility + pre-survey identifying recurring regrets)
- 2 conditions: **Free-form** (N=10, single open-ended prompt) vs. **Gross-guided** (N=10, structured prompts aligned to Gross's 5 regulatory strategy families)
- Both conditions completed identical journaling and WhatIf-Planning tasks — only the prompts differed
- Timeline: Day 0 onboarding → daily voice journaling (Days 1–15) → weekly WhatIf-Planning sessions via Zoom with trained facilitator (Days 5, 10, 15) → post-study exit interview Day 15
- Measures: CFS-R (Coping Flexibility Scale–Revised), DERS-SF (Difficulties in Emotion Regulation Scale–Short Form), weekly self-reports, system interaction logs (what-if alternatives and if-then plans generated), semi-structured exit interviews, SUS usability scores

**Key results:**
1. **Both conditions improved** in overall coping flexibility — significant main Phase effect (*F* = 6.64, *p* = .020, η² = .28); Meta-Coping (metacognitive monitoring and adaptive strategy adjustment) showed the strongest Phase effect (*F* = 7.65, *p* = .013, surviving Holm correction)
2. **Gross-guided produced substantially more planning output** — generated ~2× more weekly action plans (M = 6.53 vs. 3.33; *g* = 1.62), identified significantly more obstacles (*g* = 1.71), produced more counterfactual what-if alternatives (*g* = 0.99); all *p* < 10⁻⁹ — large effect sizes
3. **Gross-guided: medium-to-large trends** on Nonacceptance (*g* = 0.73) and Goals (*g* = 0.60) DERS subscales — reduced self-critical responses and goal-disrupting regulatory barriers
4. **Free-form: medium trend** on Emotional Awareness (*g* = −0.54) — open-ended reflection supports emotional attunement; structured prompts support metacognition and strategy generation
5. **No significant between-condition differences** on primary outcomes — underpowered pilot (N=20); effect sizes medium-large but CIs overlap; between-condition Holm-corrected *p* > .12 for all CFS-R outcomes
6. **SUS = 74.8** (above the 68 acceptable benchmark); no usability difference between conditions — structured prompts added no cognitive friction
7. Qualitative: Gross-guided participants described systematic reasoning and perspective-taking ("It forced me to stop blaming myself and think about other ways I could've handled it"); Free-form participants reported stagnation ("I often repeated myself... I wasn't moving forward")

**Conclusion:** Structured (theory-grounded) reflection shapes *how* people regulate — favoring metacognitive appraisal and strategy generation — while free-form reflection favors emotional attunement and disclosure. Structured guidance increases plan enactment without increasing reflection time or user burden. The paper explicitly calls for an **AI-augmented condition** in future work: *"we are planning a larger-scale study incorporating an AI-augmented condition to examine whether AI support can help users expand alternatives, obstacles, and action plans beyond self-generated input."*

**Relevance to This Work:**

**1. Empirical support for Group A > Group B hypothesis.** Your Group B (static written prompts) maps almost directly to Kim et al.'s Free-form condition — unstructured, self-guided reflection. Your Group A (Sage + DwGJ) maps to the Gross-guided condition and then goes further: the structure is not static prompts but an *adaptive AI conversation* that responds to the participant's reasoning in real time. Kim et al.'s finding that structured guidance produces 2× more action plans and larger behavioral follow-through is direct empirical precedent. Cite in Discussion when interpreting your results.

**2. Positions the debrief as a necessary component, not an optional add-on.** The paper demonstrates that unstructured reflection tends toward rumination rather than change. This supports the design rationale for Sage: the debrief mechanism is what converts practice experience into transferable skill. Cite in Introduction or Motivation.

**3. This project answers the call they leave open.** Kim et al. flag AI augmentation as their explicit next step. Sage is exactly that: an AI that conducts the structured, theory-grounded reflection conversation autonomously — no facilitator required, grounded in DwGJ rather than Gross's ER model, in the negotiation domain rather than personal habit change.

**4. Key domain difference.** Kim et al. target emotion regulation and recurring personal regrets over 15 days of lived experience. This project targets negotiation skill over a single controlled practice session. The mechanisms are analogous (structured reflection → behavior change) but the timescale, domain, and outcome measures are different. Do not directly compare effect sizes — use Kim et al. to motivate the theoretical argument, not as a numerical benchmark.

**Citation notes:**
- ✅ Cite for: empirical evidence that structured, theory-grounded reflection produces significantly more action planning and behavioral follow-through than free-form reflection — CHI '26 RCT-level evidence
- ✅ Cite for: the reflection-to-action gap as a central HCI challenge — positions this project within a current CHI research theme
- ✅ Cite in Discussion: "consistent with Kim et al. (2026), who found that structured reflection substantially increased plan enactment relative to free-form reflection…"
- ✅ Cite for: the paper's explicit call for AI augmentation — positions this project as a direct response
- ⚠️ Do NOT use their effect sizes as expected benchmarks for your study — different domain, timescale, and outcome measures
- ⚠️ N=20 pilot — between-condition differences non-significant on primary outcomes; cite effect sizes with appropriate hedging ("medium-to-large trends favoring structured reflection")

---

# Category E — LLM Negotiation Behavior (Parked — Background Only)

> These papers study LLM-vs-LLM negotiation. Not part of the related work section — they address AI capability, not human skill development. Kept for reference only.

---

## Bianchi, Chia, Yuksekgonul, Tagliabue, Jurafsky & Zou (2024) — NegotiationArena

**Reference:** Bianchi, F., Chia, P. J., Yuksekgonul, M., Tagliabue, J., Jurafsky, D., & Zou, J. (2024). How well can LLMs negotiate? NegotiationArena platform and analysis. In *Proceedings of ICML 2024*. arXiv:2402.05863.

**Summary:**
Open-source LLM-vs-LLM negotiation benchmark. Three game types: resource exchange, multi-turn ultimatum ($100 split), seller-buyer. Tests GPT-4, GPT-3.5, Claude 2/2.1 — 60 negotiations per agent pair per scenario. Key findings: GPT-4 is best overall; pretending to be desperate improves payoff ~20% against standard GPT-4; LLMs exhibit irrational behaviors (anchoring bias, accepting bad offers, "babysitting" weaker agents); buyers outperform sellers across models.

**Relevance to This Work:**
Background only. Validates that LLMs have measurable negotiation capability — supports using an LLM as a practice counterpart. Also: strategic personality prompting (aggressive, desperate) substantially changes outcomes — motivates the counterpart personality design (aggressive/collaborative/evasive). No human participants; no pedagogical design.

**Citation notes:**
- ✅ If cited at all: LLM personality prompting substantially changes negotiation outcomes — methodological background for counterpart design.
- ⚠️ Do NOT cite as evidence of human skill improvement or LLM suitability for training.

---

## Noh & Chang (2024) — LLMs with Personalities in Multi-issue Negotiation Games

**Reference:** Noh, S., & Chang, H.-C. H. (2024). LLMs with personalities in multi-issue negotiation games. arXiv:2405.05248. Dartmouth College.

**Summary:**
n=1,500 LLM-vs-LLM simulations using 10 OCEAN personality types (high/low for each Big Five trait) as GPT-4-turbo instances. Single-issue ($100 split) and multi-issue (apples/bananas/crepes with asymmetric valuations) games. Key findings: (1) high agreeableness reaches most agreements but is exploitable; low agreeableness extracts highest value when deals land; (2) multi-issue games improve outcomes for all — agreement rates 64.3% → 89.0%; (3) low conscientiousness and high neuroticism produce most toxic language; (4) LLMs have fairness guardrails but can be "jail broken" via personality prompting; (5) SHAP analysis: assertive language and agreeableness are most predictive of payoff.

**Relevance to This Work:**
Background only. Low agreeableness (aggressive) personality extracts highest value — validates aggressive as the most challenging counterpart for skill training. Multi-issue games produce better joint outcomes — supports multi-issue scenario design. "Jail broken" finding justifies using personality prompts to create challenging counterparts despite LLM fairness defaults. No human participants.

**Citation notes:**
- ✅ If cited: aggressive personality prompting reliably produces challenging counterpart behavior; multi-issue games enable synergistic outcomes.
- ⚠️ Do NOT cite as human learning evidence.

---

## Hua, Qu & Haffari (2024) — Assistive LLM Agents for Socially-Aware Negotiation Dialogues

**Reference:** Hua, Y., Qu, L., & Haffari, G. (2024). Assistive large language model agents for socially-aware negotiation dialogues. In *Findings of EMNLP 2024*, 8047–8074.

**Summary:**
Three-agent system: a seller LLM and buyer LLM negotiate; a third "remediator" LLM watches the conversation and rewrites seller utterances that violate social norms (aggressive, offensive language) before they reach the buyer. Uses In-Context Learning (ICL) with a novel "value impact" scoring function to select the best few-shot examples for the remediator — measuring how much a remediation improves deal success, deal price, trust, and relationship quality. Dialogues generated in Chinese (GPT-3.5 used because OpenAI policy prevents English norm violations). Results: deal success 86% → 90%, deal price +1.5%, social goals 82% → 85%.

**Relevance to This Work:**
Background only. Agent-vs-agent; no human training component. The social norm violation framing partially overlaps with D4 (pressure tactics vs. legitimate criteria), but the operationalization and purpose are entirely different. EMNLP venue credit is already covered by ACE (Shea et al., 2024).

**Citation notes:**
- ⚠️ Do NOT cite in related work — agent-vs-agent, no human learning, venue already covered.
