# Related Work

## Draft v2.0 — for professor review

---

Negotiation is a complex interpersonal skill requiring both strategic knowledge and behavioral adaptation, and has emerged as a promising target for AI-based simulation training (Shea et al., 2024; Kapráliková & Novák, 2025; Li Rong et al., 2025). Experimental evidence confirms that AI-driven training produces greater improvement in negotiation performance than conventional role-play (Dannenmann et al., 2022). More recently, Li Rong et al. (2025) found that a generative AI coach produced significantly greater gains in strategic preparation, strategy, and value creation than traditional role-play, though communication skills did not improve. Systems that add AI-generated feedback between practice rounds show further improvement (Rottner, 2024; Shea et al., 2024), though Shea et al. found that only targeted, annotation-based feedback improved outcomes; generic AI feedback performed no better than no feedback. Yet none of these systems applies the principled negotiation framework of Fisher, Ury, and Patton (1981) — Getting to Yes (GTY) — the interest-based, integrative approach taught in business and law schools worldwide.

Beyond theory choice, a deeper pedagogical gap persists. Learners benefit most from a complete cycle of practice, reflection, and re-practice (Dinnar et al., 2021). The systems described above, however, address only the practice step — none closes the full loop with structured reflection. Even in traditional negotiation education, producing lasting behavioral change "is a tall order" (McKersie & Walton, 2015). Feedback-based systems alone may not be equipped to meet this challenge, since durable behavioral change requires surfacing the implicit cognitive frames that drive behavior rather than merely correcting surface mistakes (Rudolph et al., 2007). Structured debriefing following a simulation is designed to do exactly that.

Research on simulation-based learning, developed primarily in medical education, identifies debriefing as the most critical component of the simulation experience: the "heart and soul" (Fanning & Gaba, 2007). Emerging work has begun applying AI to facilitate debriefing directly. Hong et al. (2025) used GPT-4o to generate debrief scripts that human facilitators read from during pediatric simulations, with both facilitators and learners reporting strong enthusiasm and perceived improvements in debriefing organization. Gonzalez & Nagendran (2025) deployed an autonomous AI agent that guided students through scripted reflection prompts and analyzed their spoken responses, though no significant correlation emerged between time in debrief and simulation performance. Notably, Debriefing with Good Judgment (DwGJ; Rudolph et al., 2007) offers a theoretically grounded conversational method, combining explicit advocacy with genuine inquiry, that none of these systems has applied.

No prior work combines AI-based negotiation practice with an autonomous debrief agent. More specifically, no existing AI negotiation system applies GTY, and no debriefing system has applied DwGJ in a negotiation context. This project addresses these gaps by combining LLM-based negotiation practice with a debrief agent grounded in both GTY and DwGJ, evaluated through a controlled experiment.

---

## Reference list (for this section only)

- Dannenmann, B., Semenkin, K., Kracklauer, A. H., & Rasche, C. (2022). Learning to negotiate: AI-driven applications versus conventional training. *ISPIM Innovation Conference Proceedings.*
- Dinnar, S., Dede, C., Johnson, E., Straub, C., & Korjus, K. (2021). Artificial intelligence and technology in teaching negotiation. *Negotiation Journal, 37*(1), 65–82.
- Fanning, R. M., & Gaba, D. M. (2007). The role of debriefing in simulation-based learning. *Simulation in Healthcare, 2*(2), 115–125.
- Fisher, R., Ury, W., & Patton, B. (1981). *Getting to Yes: Negotiating Agreement Without Giving In.* Penguin Books.
- Gonzalez, L., & Nagendran, A. (2025). Artificial intelligence (AI)-facilitated debriefing: A pilot study. *Clinical Simulation in Nursing, 105*, 101782.
- Hong, E., Kazmir, S., Dylik, B., et al. (2025). Exploring the use of a large language model in simulation debriefing: An observational simulation-based pilot study. *Simulation in Healthcare, 20*(6), 366–371.
- Kapráliková, I., & Novák, D. (2025). AI-powered simulations for business negotiations: Enhancing skill development through technology. *CASALC Review, 15*(2), 44–71. https://doi.org/10.5817/CASALC2025-2-3
- Li Rong, Peng Hui, Peng Jingyu, & Luo Tianchan. (2025). The AI negotiation coach: Using generative AI to specifically enhance strategic preparation, strategy and value-creation in business negotiation education. In *Proceedings of the 2025 International Conference on Educational Technology Management (ICETM)*, 304–308. IEEE. https://doi.org/10.1109/ICETM67477.2025.11413592
- McKersie, R. B., & Walton, R. E. (2015). Reflections on negotiation theory, practice, and education: A robust record and new opportunities. *Negotiation Journal, 31*(4), 491–500.
- Rottner, R. (2024). Iterative learning: Using AI-bots in negotiation training. *ASEE 2024 Annual Conference & Exposition*, Paper #41800.
- Rudolph, J. W., Simon, R., Rivard, P., Dufresne, R. L., & Raemer, D. B. (2007). Debriefing with Good Judgment: Combining rigorous feedback with genuine inquiry. *Anesthesiology Clinics, 25*(2), 361–376.
- Shea, R., Kallalla, A., Liu, X. L., Morris, M. W., & Yu, Z. (2024). ACE: A LLM-based negotiation coaching system. *EMNLP 2024*, 12720–12749.
