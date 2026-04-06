#!/usr/bin/env node
/**
 * Negotiation Transcript Generator
 *
 * Runs only the negotiation phase (no debrief, no Sage).
 * A simulated user (Claude Haiku) interacts with your app's /api/chat endpoint.
 * Simulated user behavior is defined in a brief file — add new briefs anytime.
 *
 * Usage:
 *   node generate_transcript.js --brief briefs/salary_low.md
 *   node generate_transcript.js --brief briefs/apartment_high.md
 *
 * Requires: Node 18+, app running at base_url, ANTHROPIC_API_KEY in env or .env.local
 */

const fs   = require("fs");
const path = require("path");
const crypto = require("crypto");

// ─── Load brief ───────────────────────────────────────────────────────────────

const args     = process.argv.slice(2);
const briefIdx = args.indexOf("--brief");

if (briefIdx === -1 || !args[briefIdx + 1]) {
  console.error("Usage: node generate_transcript.js --brief briefs/<filename>.md");
  console.error("Example: node generate_transcript.js --brief briefs/salary_low.md");
  process.exit(1);
}

const briefPath = path.resolve(__dirname, args[briefIdx + 1]);
if (!fs.existsSync(briefPath)) {
  console.error(`Brief file not found: ${briefPath}`);
  process.exit(1);
}

const briefText = fs.readFileSync(briefPath, "utf-8");
const pick = (key) => {
  const m = briefText.match(new RegExp(`^${key}:\\s*(.+)`, "m"));
  return m ? m[1].trim() : null;
};

const SCENARIO     = pick("scenario");
const PERSONALITY  = pick("personality") || "aggressive";
const SKILL_LEVEL  = pick("skill_level") || "unspecified";
const USER_STYLE   = pick("user_style");
const USER_ID      = pick("user_id")     || null;
const BASE_URL     = pick("base_url")    || "http://localhost:3000";
const SIM_MODEL    = pick("sim_model")   || "claude-haiku-4-5-20251001";

if (!SCENARIO) {
  console.error("Brief file must include: scenario: salary_negotiation | apartment_rent");
  process.exit(1);
}
if (!USER_STYLE) {
  console.error("Brief file must include: user_style: <behavior description>");
  process.exit(1);
}

// ─── API key ──────────────────────────────────────────────────────────────────

function loadEnvVar(key) {
  if (process.env[key]) return process.env[key];
  const envPath = path.join(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const match = fs.readFileSync(envPath, "utf-8").match(new RegExp(`^${key}=(.+)$`, "m"));
    if (match) return match[1].trim();
  }
  return null;
}

const ANTHROPIC_API_KEY = loadEnvVar("ANTHROPIC_API_KEY");
if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY not found.");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg) { console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`); }

const TEST_API_KEY = loadEnvVar("TEST_API_KEY");

async function postApp(route, body) {
  const headers = { "Content-Type": "application/json" };
  if (TEST_API_KEY) headers["x-test-api-key"] = TEST_API_KEY;
  const res = await fetch(`${BASE_URL}${route}`, {
    method:  "POST",
    headers,
    body:    JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${route} → ${res.status}: ${text}`);
  }
  return res.json();
}

async function callSimUser(systemPrompt, messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type":      "application/json",
      "x-api-key":         ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model:      SIM_MODEL,
      max_tokens: 300,
      system:     systemPrompt,
      messages,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API → ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data.content[0].text.trim();
}

function clean(text) {
  return text.replace(/\[seq:\d+\]\n?/, "").replace(/\[BREAK\]/g, "").trim();
}

// ─── Simulated user system prompt ─────────────────────────────────────────────

const SIM_SYSTEM_PROMPT = `You are a person practicing negotiation. You are NOT an AI assistant — you are roleplaying as a real person having a real conversation.

${USER_STYLE}

Rules:
- Respond only as yourself — short, natural, conversational replies (1–4 sentences).
- React to what the counterpart actually said. Do not follow a script.
- Stay in character throughout. Never break the fourth wall.
- When the negotiation has reached a natural conclusion (agreement or clear impasse), output exactly this on its own line and nothing else:
  !!END_NEGOTIATION!!
- Do NOT end prematurely — have a real negotiation first (at least 6–8 exchanges).`;

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  log("=== Negotiation Transcript Generator ===");
  log(`Brief:        ${path.basename(briefPath)}`);
  log(`Scenario:     ${SCENARIO}`);
  log(`Personality:  ${PERSONALITY}`);
  log(`Skill level:  ${SKILL_LEVEL}`);
  log(`User ID:      ${USER_ID || "(none)"}`);
  log(`Base URL:     ${BASE_URL}`);
  log("");

  const sessionId = crypto.randomUUID();
  const startedAt = new Date().toISOString();
  const chatMessages = [];
  const simUserMsgs  = [];

  // Opening message from AI counterpart (your app)
  const opening     = await postApp("/api/chat", {
    scenario_id:    SCENARIO,
    personality_id: PERSONALITY,
    messages:       [],
    session_id:     sessionId,
    user_id:        USER_ID,
  });
  const openingText = clean(opening.reply);
  chatMessages.push({ role: "assistant", content: openingText });
  log(`[AI]   ${openingText}`);

  let lastAiText = openingText;

  // Negotiation loop — two AI agents talking to each other
  while (true) {
    simUserMsgs.push({ role: "user", content: lastAiText });
    const userReply = await callSimUser(SIM_SYSTEM_PROMPT, simUserMsgs);

    if (userReply.includes("!!END_NEGOTIATION!!")) {
      log("[SIM]  Negotiation ended.");
      break;
    }

    log(`[User] ${userReply}`);
    simUserMsgs.push({ role: "assistant", content: userReply });
    chatMessages.push({ role: "user", content: userReply });

    // AI counterpart responds via your app
    const aiResp  = await postApp("/api/chat", {
      scenario_id:    SCENARIO,
      personality_id: PERSONALITY,
      messages:       chatMessages,
      session_id:     sessionId,
      user_id:        USER_ID,
    });
    lastAiText = clean(aiResp.reply);
    chatMessages.push({ role: "assistant", content: lastAiText });
    log(`[AI]   ${lastAiText}`);
  }

  // Build transcript in MongoDB format — ready for coder_prompt.md
  const transcript = {
    run_id:         `TEST_${SCENARIO.toUpperCase()}_${SKILL_LEVEL.toUpperCase()}_${sessionId.slice(0, 8)}`,
    scenario_id:    SCENARIO,
    personality_id: PERSONALITY,
    skill_level:    SKILL_LEVEL,
    brief:          path.basename(briefPath),
    started_at:     startedAt,
    exported_at:    new Date().toISOString(),
    messages: chatMessages.map((m) => ({
      role:      m.role,
      text:      m.content,
      timestamp: new Date().toISOString(),
    })),
  };

  // Save to output/
  const OUTPUT_DIR = path.join(__dirname, "output");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const ts       = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const filename = `${ts}_${SCENARIO}_${SKILL_LEVEL}.json`;
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(transcript, null, 2), "utf-8");

  log("");
  log("=== DONE ===");
  log(`Transcript saved: test_script/output/${filename}`);
  log(`Messages: ${transcript.messages.length} total (${transcript.messages.filter(m => m.role === "user").length} user turns)`);
  log(`Feed this file into coder_prompt.md to code and score.`);
})();
