# Related Work Comparison Table

> Based strictly on what is stated in `related_work_draft.md`.
> Cells marked ⚠️ mean the related work does not specify — verify against the original paper.
> Last updated: 2026-04-23

---

## Column Definitions

| Column | What it captures |
|---|---|
| **Skill Trained** | The interpersonal skill domain |
| **Training Simulation** | The AI-powered practice environment — what kind of simulation and what role does AI play? |
| **In-Session Feedback** | Feedback delivered *during* the practice conversation |
| **Post-Session Feedback** | Static written feedback delivered *after* the conversation ends |
| **Post-Session Debrief** | Reflective dialogue (AI or human) delivered after the conversation |
| **Theory** | Named theory grounding the feedback or debrief design |
| **Evaluation Aspect** | What construct or outcome is being assessed |
| **Measurement Instrument** | How the construct is operationalized and measured |
| **Controlled Experiment** | Comparison group and sample size |

---

## Group 1 — Social Skill Training Systems

| System | Skill Trained | Training Simulation | In-Session Feedback | Post-Session Feedback | Post-Session Debrief | Theory | Evaluation Aspect | Measurement Instrument | Controlled Experiment |
|---|---|---|---|---|---|---|---|---|---|
| Shaikh et al. (2024) *Rehearsal* | Conflict resolution | ✓ AI partner simulates counterpart using Interests-Rights-Power (IRP) framework; generates moves conditioned on one of 8 conflict strategies | ✓ Turn-by-turn: presents counterfactual alternative messages; prompts user to identify strategy used | None | None | IRP framework (Ury & Brett) | Skill transfer — cooperative vs. competitive strategy use in an unaided live conflict; IRP strategy knowledge recall/recognition | Manual IRP strategy annotation of live conflict transcript (Cohen's Kappa = 0.74), strategy frequency counts; knowledge quiz (recall + recognition) | ✓ N=40 |
| Daryanto et al. (2025) *Conversate* | Job interview | ✓ AI interviewer — asks pre-defined questions and dynamically generates follow-up questions based on user responses | None | None | ✓ Two-stage: (1) AI evaluates responses against communication criteria and highlights weak moments in transcript; (2) user selects annotated moments, writes self-reflection, then engages in iterative AI dialogue focused on those specific moments (STAR-method feedback + follow-up Q&A + answer revision) | Dialogic feedback (Steen et al., 2014) | Perceived benefits and challenges of AI-assisted interview practice, annotation, and dialogic feedback | Post-session interviews with 19 participants; qualitative coding of transcripts + interaction logs | ✗ |

---

## Group 2 — Negotiation Training Systems

| System | Skill Trained | Training Simulation | In-Session Feedback | Post-Session Feedback | Post-Session Debrief | Theory | Evaluation Aspect | Measurement Instrument | Controlled Experiment |
|---|---|---|---|---|---|---|---|---|---|
| Dannenmann et al. (2022) | Negotiation | ✓ Two AI roles: (1) virtual buyer agents John & Paul — negotiate with user via spoken natural language; NLP keyword matching maps user's speech to negotiation style (accommodating, integrating, avoiding, dominant); (2) AI coach Ringo — briefs user before negotiation and delivers post-negotiation style summary | None | ✓ AI coach Ringo gives static end-of-session overview of negotiation style used and deal outcome (total discount granted) | None | ⚠️ Not stated | Negotiation performance; tactics and negotiation styles; nervousness; enjoyment (pre/post) | Staff assessment + student self-assessment on 7-item Likert scales (Day 1 vs. Day 3); Wilcoxon and Mann-Whitney U tests; N=27 | ✓ N=27 vs. traditional role-play |
| Rottner (2024) *AdVentures* | Negotiation | ✓ ChatGPT4 plays recruiter counterpart in a job candidate salary negotiation; student plays job candidate; AI resets between rounds (no memory of Round 1), enabling a fresh second attempt | None | ✓ AI gives personalized static feedback after Round 1 — scores active listening, negotiation techniques, collaboration, and tone (0–4 per dimension) with written commentary | None | Experiential learning theory (Kolb) | Negotiation outcome — integrative potential score (proximity to Pareto frontier); Round 1 → Round 2 improvement | Integrative potential score (objective deal outcome vs. Pareto frontier); within-exercise reflection surveys + end-of-course evaluations (indirect); N=53 | ✗ Pilot N=53 |
| Shea et al. (2024) *ACE* | Negotiation | ✓ GPT-4 plays seller counterpart in single-issue distributive bargaining (used car / sublease scenarios); dynamic prompting gradually adjusts AI's reservation price across turns to prevent it from conceding too quickly | None | ✓ Two-part static feedback after negotiation: (1) preparation feedback — flags errors in walk-away point, target price, and first-offer strategy; (2) negotiation feedback — turn-based (error identification + direct feedback + revised utterance suggestion per turn) and holistic (formality, firmness, linguistic level across full transcript) | None | ⚠️ Not stated | Negotiation outcome (deal price Trial 1 → Trial 2); subjective improvement perceptions | Final agreed deal price (objective); subjective improvement self-report (Likert); N=374 | ✓ N=374 (ACE annotation feedback vs. generic AI feedback vs. no-feedback control) |
| Li Rong et al. (2025) | Negotiation | ✓ Dynamically adaptive AI opponents on Chaoxing learning platform; capable of assuming multiple negotiation styles; multi-issue scenarios (6 negotiable issues: price, quantity, payment, delivery, quality, contract duration); system logs all interactions for feedback | ✓ Real-time personalized feedback during conversation | None | None | ⚠️ Not stated | 5 negotiation competencies (preparation, strategy, communication, adaptability, value creation) + overall outcome; pre-test vs. post-test improvement | Expert assessment using validated 50-point rubric (5 competencies × 10 pts); 3 independent blinded experts (ICC=0.87); video-recorded negotiations; paired and independent t-tests; N=90 | ✓ N=90 (n=45 per group) vs. traditional peer-to-peer role-play |

---

## Group 3 — AI Debriefing Systems

| System | Skill Trained | Training Simulation | In-Session Feedback | Post-Session Feedback | Post-Session Debrief | Theory | Evaluation Aspect | Measurement Instrument | Controlled Experiment |
|---|---|---|---|---|---|---|---|---|---|
| Hong et al. (2025) | Clinical — pediatric | ✗ Mannequin-based medical simulation (no AI role-play) | None | None | ✓ Human-led debrief supported by AI: real-time simulation transcript fed to CustomGPT (GPT-4o) → generates a 1–2 page debrief script + evaluation checklist → human facilitator leads debrief using AI-generated script following PEARLS 5-phase structure (setting the scene, reaction, description, analysis, summary) | PEARLS framework — Promoting Excellence and Reflective Learning in Simulation (Eppich & Cheng, 2015) | Facilitator task load; facilitator and learner perceptions of AI integration | NASA-TLX workload scale (facilitators); 5-point Likert perception survey + free-text responses (facilitators + learners); N=4 facilitators + 25 learners | ✗ Observational pilot |
| Gonzalez & Nagendran (2025) | Clinical — nursing | ✗ Screen-based virtual nursing simulation (no AI role-play) | None | None | ✓ Two-AI system following EMPOWER® Debrief Framework: (1) AI agent guides learner through structured verbal reflection (7 phases: Explore, Misconceptions, Performance standards, Outcomes, Wins, Evaluate, Reflect); (2) second AI (Relativ.ai) analyzes spoken responses for 5 dimensions (confidence, fluency, authority, critical thinking, clarity) and generates immediate performance report | Schön's Reflective Practice Theory (Schön, 1983) | Relationship between debrief time, reflective dimensions met, and simulation performance score | Simulation performance score (virtual platform); debrief time (auto-logged); reflective dimensions met (AI-assessed); Pearson correlations + t-tests; N=52 | ✗ Pilot |
| Evangelou et al. (2025/2026) | Counseling | ✓ VR scenario-based simulation | None | None | ✓ AI chatbot — fixed 3-phase protocol: (1) reaction → (2) understanding → (3) summary | Structured Debriefing in Simulation-Based Education (Palaganas et al., 2016) | | | ✓ 2026: N=45, AI chatbot vs. human-led debrief |

---

## This Work

| System | Skill Trained | Training Simulation | In-Session Feedback | Post-Session Feedback | Post-Session Debrief | Theory | Evaluation Aspect | Measurement Instrument | Controlled Experiment |
|---|---|---|---|---|---|---|---|---|---|
| **This work** | **Negotiation** | **✓ AI counterpart — 3 scenarios × aggressive personality; standardized participant context** | **None** | **None (static report withheld until end of study)** | **✓ AI conversation (Sage) — adaptive: selects 2 key moments from transcript, states diagnostic hypothesis about cognitive frame, explores why with participant, offers alternative move, elicits takeaway** | **Getting to Yes (Fisher et al., 1981) — evaluates negotiation content; Debriefing with Good Judgment (Rudolph et al., 2007) — guides reflective process** | **Negotiation behavior change; negotiation outcome; self-efficacy; self-awareness** | **BQS behavioral coding (D1–D5 dimension ratios, Round 1 → Round 2 delta); outcome score; self-efficacy scale (OSS-6); insight scale (SRIS-IN)** | **✓ N=30 — 3 groups: AI debrief (Sage) / static written reflection / no reflection** |

---

## What the Table Shows

**No prior system has all four of the following:**

| Property | Prior systems with this |
|---|---|
| AI role-play practice | Rehearsal, Conversate, Dannenmann, Rottner, ACE, Li Rong, Evangelou |
| Post-session debrief (any form) | Conversate, Hong, Gonzalez, Evangelou |
| Named theory grounding the debrief | Conversate (dialogic feedback theory), Rehearsal (IRP), Evangelou (Palaganas et al.) |
| Behavioral coding as evaluation metric | Rehearsal — only one |

**This work is the only system combining:** AI negotiation practice + adaptive post-session AI debrief + debrief grounded in two named theories (Getting to Yes for content evaluation + DwGJ for reflective process) + behavioral coding measurement.

---

## Verification Status (⚠️ cells)

Cells verified against original PDFs (2026-04-23):
- **Rottner (2024) Theory** — RESOLVED: paper explicitly cites experiential learning theory (Kolb)
- **Evangelou (2026) Theory** — RESOLVED: paper explicitly cites Structured Debriefing in Simulation-Based Education (Palaganas et al., 2016)
- **Li Rong (2025) N** — RESOLVED: N=90 (n=45 per group) added
- **Dannenmann (2022):** confirmed — no named theory; cites Voeth & Herbst negotiation process phases only. ⚠️ = "not reported"
- **Li Rong (2025) Theory:** confirmed — deliberate practice mentioned conceptually but no theory named. ⚠️ stays
- **Shea et al. (2024) ACE:** not yet verified against PDF — check for cognitive tutoring or coaching framework
- **Hong et al. (2025):** not yet verified against PDF — check for named debriefing model
- **Gonzalez & Nagendran (2025):** not yet verified against PDF — check for reflection theory

---

## Notes for Paper

- Split into 3 sub-tables as above — mirrors the paragraph structure of the related work.
- In the paper, merge Group 1 and Group 2 into one table ("Simulation-based skill training") and keep Group 3 separate ("AI-facilitated debriefing"), with "This work" as the final row of whichever table is more relevant — or span across both.
- LaTeX: use `\checkmark` and `$\times$`, bold "This work" row, use `\midrule` between groups.
- ⚠️ cells should be resolved before submission — either filled in or noted as "not reported" in the table.
