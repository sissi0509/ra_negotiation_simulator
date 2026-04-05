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

---

### Category B — AI + Soft Skills Training
Papers on using AI to develop interpersonal and communication skills more broadly. Positions negotiation within the wider soft-skills training literature.

| # | Paper | Notes |
|---|-------|-------|
| 5 | Zogopoulos et al. (2025) | Teacher survey on AI for soft skills; positive but mixed on critical thinking |
| 12 | Burgues et al. (2024) | Literature review on AI simulation for soft skills; healthcare + hospitality evidence |

---

### Category C — Debriefing Theory + AI-Facilitated Debriefing
Papers on why debriefing matters and how AI can support it. Most directly relevant to the theoretical design of Sage and the justification for the debrief condition in the RCT.

| # | Paper | Notes |
|---|-------|-------|
| 6 | Fanning & Gaba (2007) | Debriefing = "heart and soul" of simulation; Kolb's experiential learning |
| 2 | Rudolph et al. (2007) — DwGJ | Theoretical backbone of Sage's Phase C design |
| 3 | Hong et al. (2025) | LLM as facilitator *assistant*; not autonomous; no control group |
| 9 | Gonzalez & Nagendran (2025) | AI debrief pilot in nursing; proprietary AI; no control condition |

---

### Category D — Theoretical Foundation
Core theory that underpins the measurement and design framework.

| # | Paper | Notes |
|---|-------|-------|
| 13 | Fisher, Ury & Patton (1981) — GTY | GTY 4 principles form the BQS dimensional structure (D1–D4) |
| 14 | McKersie & Walton (2015) | Foundational negotiation theorists; "producing lasting behavioral change is a tall order" |

---

### How the categories connect to this project

```
Category A (AI + Negotiation)   →  motivates the simulator + positions ACE as prior work
Category B (AI + Soft Skills)   →  situates negotiation within broader soft-skills AI training
Category C (Debriefing)         →  justifies Sage and the debrief condition in the RCT
Category D (Theory)             →  grounds the BQS measurement system and diagnostic matrix
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

# Category B — AI + Soft Skills Training

## Burgues, Goujet & Zaraik (2024)

**Reference:** Burgues, M., Goujet, R., & Zaraik, J. (2024). Learning soft skills with an AI-based simulation role-play: A literature review. _Manzalab / ROLEPL-AI project._

**Summary:**
A literature review (N = 130 sources, post-2020 for AI/soft skills content) surveying the intersection of AI-based simulation and soft skills development. Organized into three sections: (1) cognitive science findings — AI positively influences problem-solving, logical reasoning, and collaboration; supports metacognition and intrinsic motivation; cognitive overload is a real risk; (2) specificities of soft skills training — role-playing is the dominant method; AI-based simulation training has documented effectiveness in healthcare and hospitality; simulation provides a safe practice environment; (3) learning with AI simulations — human-AI interaction design guidelines; perceived social presence matters. Conclusion: AI simulation role-play is a good fit for soft skills training, but more empirical research is needed.

**Relevance to This Work:**
Primary review citation for AI and soft skills. Supports the general claim that AI simulation training improves communication, collaboration, and leadership competencies across multiple sectors. Establishes that simulation provides a "safe environment for practice and refinement" — directly applicable to justifying AI negotiation simulation for skill-building.

---

## Zogopoulos, Gioti, Raptis & Karatzas (2025)

**Reference:** Zogopoulos, K., Gioti, L., Raptis, N., & Karatzas, A. (2025). Teaching soft skills to students through artificial intelligence. _IOSR Journal of Research & Method in Education, 15_(1), 23–33.

**Summary:**
A quantitative survey of 862 Greek primary and secondary school teachers on their perceptions of AI's role in developing soft skills. Five skill areas: critical thinking, problem solving, creativity and innovation, collaboration and communication, safe use of AI. Results: overall positive attitude (54.96% "very-very much"); strongest acceptance for safe use of AI (67.7%) and creativity/innovation (58.2%); most skepticism about critical thinking (44.3%) and collaboration (47.3%). A stepwise regression (R² = 0.626) identified personalization and workload reduction as strongest predictors of acceptance; fear of negative effects on critical thinking was a negative predictor.

**Relevance to This Work:**
Confirms broad recognition that AI can develop communication and problem-solving skills — exactly the soft skill cluster that negotiation represents. The finding that simulation and interactive platforms received high acceptance supports use of AI simulation in the negotiation domain.

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
