# Score Agent

Behavioral coding agent for negotiation transcripts.

## What it does

Takes a negotiation transcript JSON and produces:
- Sequential behavioral code list (27-code NegotiAct-based scheme)
- Raw frequency and ratio per GTY dimension (D1–D5)
- Deal outcome and ZOPA-based outcome score
- Flags (passive engagement, no offers, no interest exploration)

## How to use

1. Drop transcript JSON files into `score_agent/input/`
2. Open a fresh Claude Code session in this project
3. Say: **"Read score_agent/TASK.md"**
4. Results appear in `score_agent/output/` as `.txt` files

## Input format

MongoDB transcript JSON with `messages` array. Each message has `role` (`user` or `assistant`) and `text`. Supported scenarios: `salary_negotiation`, `apartment_rent`.

## Files

| File | Purpose |
|---|---|
| `README.md` | This file — for humans |
| `TASK.md` | Instructions for Claude Code |
| `coder_prompt.md` | Full coding rules (self-contained) |
| `input/` | Drop transcript JSONs here |
| `output/` | Coded results written here |
