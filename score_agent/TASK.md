# Coding Task

You are a behavioral coding analyst. Your job is to code negotiation transcripts and write structured output files.

## Instructions

1. Read `score_agent/coder_prompt.md` — this contains all coding rules, the 27-code taxonomy, dimension mapping, output format, and outcome score formula. Follow it exactly.

2. Find all `.json` files in `score_agent/input/`.

3. For each JSON file:
   - Code every `role: "user"` turn using the rules in `coder_prompt.md`
   - Produce the exact output format specified in `coder_prompt.md`
   - Write the result to `score_agent/output/<same-filename>.txt`

4. After writing all files, print a one-line summary: how many files were processed.

## Notes

- Do not ask questions. Work through each file completely.
- If `score_agent/output/` does not exist, create it.
- Do not modify any input files.
