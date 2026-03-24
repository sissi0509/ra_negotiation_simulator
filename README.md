# Negotiation Training Platform

A full-stack AI-powered negotiation training platform built as part of a research project at Northeastern University, investigating whether AI-powered post-negotiation coaching improves skill development.

## What It Does

Users practice negotiation scenarios against an AI counterpart, then receive structured coaching from an AI debrief agent (Sage) that analyzes their performance and guides reflection.

**Two main components:**
- **Negotiation Simulator** — role-play practice across 3 scenarios (salary, apartment rent, vendor contract) × 3 counterpart personalities (collaborative, aggressive, evasive)
- **Debrief Agent** — structured coaching session after each negotiation, powered by a 3-stage multi-agent pipeline

## Multi-Agent Architecture

```
Negotiation Simulator (Claude Haiku)
  Plays the AI counterpart during practice; adapts to scenario and personality settings

        ↓  transcript passed to debrief pipeline

Stage 1 — Planner (Claude Sonnet)
  Reads the full transcript, identifies 2 key moments, outputs a structured coaching plan

Stage 2 — Coaching Agent / Sage (Claude Haiku)
  Multi-turn conversation guided by the plan; expert-led, not Socratic

Stage 3 — Assessor (Claude Haiku)
  Generates a final written assessment: context, strengths, areas for improvement, next steps

        ↓  used for pipeline evaluation

Autonomous Testing Agent (test_script/)
  Simulates a full user session end-to-end — negotiation → debrief → assessment — with no
  human input, using a brief file to define the simulated user's behavior and test focus
```

## Tech Stack

- **Frontend/Backend:** Next.js, TypeScript
- **Database:** MongoDB
- **AI:** Anthropic Claude API (Sonnet + Haiku)
- **Auth:** NextAuth v5 (Google OAuth)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas cluster (or local MongoDB)
- Anthropic API key
- Google OAuth credentials (for login)

### Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create `.env.local` in the project root:

```
ANTHROPIC_API_KEY=your_key_here
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=negotiation_simulator
AUTH_SECRET=your_nextauth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_URL=http://localhost:3000
TEST_API_KEY=your_test_key_here
```

> Note: `MONGODB_DB` is the database name. Do not include it in the URI path.

3. Add your email to the MongoDB `users` collection to grant access:

```json
{ "email": "your-email@example.com" }
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Autonomous Test Script

`test_script/` contains an autonomous testing agent that simulates full user sessions end-to-end — negotiation, debrief, and assessment — with no human input. Used for evaluating and iterating on agent behavior.

### Setup

```bash
cd test_script
npm install
cp config.example.json config.json   # then fill in your values
```

### Run a test

```bash
node run_test.js --brief briefs/<brief-name>.md
```

The brief file controls the simulated user's behavior and what to evaluate. See `briefs/` for examples.

Results are saved to `output/`.

## Project Structure

```
app/
  page.tsx                  # Simulator home
  debrief/page.tsx          # Debrief UI
  history/page.tsx          # Session history
  api/
    chat/                   # Simulator AI
    debrief/                # Stages 1, 2, 3
    transcripts/            # Save/load transcripts
    history/                # History API
ai_prompts/                 # All AI instructions (editable without code changes)
test_script/                # Autonomous test agent
```

## Research Context

This platform is part of a controlled experiment (3-group between-subjects design) measuring whether AI-powered debriefing improves negotiation outcomes compared to static reflection or no debrief. The experiment uses standardized scenarios with fixed ZOPA ranges and pre/post surveys.
