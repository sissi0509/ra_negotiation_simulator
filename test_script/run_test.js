#!/usr/bin/env node
/**
 * Negotiation Simulator — Autonomous Script Test Runner
 *
 * Calls the app API directly via HTTP — no browser, no Playwright.
 * A separate Claude (Haiku) instance acts as the simulated user.
 * The simulated user has NO knowledge of the project internals —
 * it only sees the brief (user_style, test_focus) and the conversation.
 *
 * Usage:
 *   node run_test.js                          -- run with config.json
 *   node run_test.js --brief briefs/foo.md    -- load brief from file
 *
 * Requires: Node 18+, app running at base_url, ANTHROPIC_API_KEY in env or .env.local
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// ─── Config ──────────────────────────────────────────────────────────────────

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "config.json"), "utf-8")
);

const args = process.argv.slice(2);
const briefIdx = args.indexOf("--brief");
if (briefIdx !== -1 && args[briefIdx + 1]) {
  const briefPath = path.resolve(__dirname, args[briefIdx + 1]);
  const briefText = fs.readFileSync(briefPath, "utf-8");
  const pick = (key) => {
    const m = briefText.match(new RegExp(`^${key}:\\s*(.+)`, "m"));
    return m ? m[1].trim() : null;
  };
  if (pick("mode"))             config.mode             = pick("mode");
  if (pick("scenario"))         config.scenario_id      = pick("scenario");
  if (pick("personality"))      config.personality_id   = pick("personality");
  if (pick("user_style"))       config.user_style       = pick("user_style");
  if (pick("test_focus"))       config.test_focus       = pick("test_focus");
  if (pick("transcript_file"))  config.transcript_file  = pick("transcript_file");
}

const BASE_URL      = config.base_url      || "http://localhost:3000";
const MODE          = config.mode          || "full";
const SIM_MODEL     = config.sim_model     || "claude-haiku-4-5-20251001";
const TEST_USER_ID  = config.test_user_id  || null;

// Load scenario metadata so the simulated user knows their situation
const scenarios = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../negotiation-simulator/content/scenarios.json"), "utf-8")
);
const scenarioMeta = scenarios.find((s) => s.id === config.scenario_id) || {};
const OUTPUT_DIR  = path.join(__dirname, "output");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── API key ─────────────────────────────────────────────────────────────────
// Read from environment first, then fall back to negotiation-simulator/.env.local

function loadEnvVar(key) {
  if (process.env[key]) return process.env[key];
  const envPath = path.join(__dirname, "../negotiation-simulator/.env.local");
  if (fs.existsSync(envPath)) {
    const match = fs.readFileSync(envPath, "utf-8")
      .match(new RegExp(`^${key}=(.+)$`, "m"));
    if (match) return match[1].trim();
  }
  return null;
}

const ANTHROPIC_API_KEY = loadEnvVar("ANTHROPIC_API_KEY");
if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY not found. Set it in env or negotiation-simulator/.env.local");

const TEST_API_KEY = loadEnvVar("TEST_API_KEY");

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`);
}

/** POST JSON to the app API. Returns parsed response body. */
async function postApp(route, body) {
  const headers = { "Content-Type": "application/json" };
  if (TEST_API_KEY) headers["x-test-api-key"] = TEST_API_KEY;
  const res = await fetch(`${BASE_URL}${route}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${route} → ${res.status}: ${text}`);
  }
  return res.json();
}

/** Call Anthropic API with the simulated user persona. */
async function callSimUser(systemPrompt, messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: SIM_MODEL,
      max_tokens: 300,
      system: systemPrompt,
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

/** Strip [BREAK] markers and [seq:N] headers from display text. */
function clean(text) {
  return text.replace(/\[seq:\d+\]\n?/, "").replace(/\[BREAK\]/g, "").trim();
}

// ─── Simulated user system prompts ───────────────────────────────────────────

function buildNegotiationPrompt() {
  const counterpart = [config.personality_id, scenarioMeta.counterpart_role].filter(Boolean).join(" ");
  const situationLines = [
    scenarioMeta.description && `Situation: ${scenarioMeta.description}`,
    scenarioMeta.backstory   && `Your background: ${scenarioMeta.backstory}`,
  ].filter(Boolean).join("\n");

  return `You are a person practicing negotiation. You are NOT an AI assistant — you are roleplaying as a real person having a real conversation.

Scenario: ${scenarioMeta.name || config.scenario_id}
Counterpart: ${counterpart}
${situationLines}

Your behavior: ${config.user_style || "Competent negotiator."}
Test focus (what edge case to create): ${config.test_focus || "General quality check."}

Rules:
- Respond only as yourself — short, natural, conversational replies (1–4 sentences).
- React to what the counterpart actually said. Do not follow a script.
- Stay in character throughout. Never break the fourth wall.
- When the negotiation has reached a natural conclusion (agreement, impasse, or clear close), output exactly this on its own line and nothing else:
  !!END_NEGOTIATION!!
- Do NOT end prematurely — have a real negotiation first (at least 4–6 exchanges).`;
}

function buildDebriefPrompt(transcript) {
  const transcriptSummary = transcript.messages
    .map((m) => `${m.role === "user" ? "You" : "Counterpart"}: ${m.text}`)
    .join("\n");

  return `You are a person who just finished a salary negotiation practice session and is now in a debrief with a coach named Sage.

Here is the negotiation you just had:
---
${transcriptSummary}
---

Your behavior during the debrief: ${config.user_style || "Reflects thoughtfully."}
Test focus: ${config.test_focus || "General quality check."}

Rules:
- Respond only as yourself reflecting on your negotiation — natural, conversational (1–4 sentences).
- Engage genuinely with what Sage says. React to the specific observation or question.
- You may push back if you disagree, but be open to learning.
- Do NOT try to end the session — Sage will close it when ready.
- If Sage asks a question, answer it directly before adding anything else.
- Never break character or mention that you are an AI.`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  log("=== Negotiation Simulator — Autonomous Script Test ===");
  log(`Mode:         ${MODE}`);
  log(`Scenario:     ${config.scenario_id}`);
  log(`Personality:  ${config.personality_id}`);
  log(`Sim model:    ${SIM_MODEL}`);
  log(`Base URL:     ${BASE_URL}`);
  log("");

  const logLines = [];
  function record(label, text) {
    const line = `[${label}]: ${text}`;
    log(line);
    logLines.push(line + "\n");
  }

  const sessionId  = crypto.randomUUID();
  const startedAt  = new Date().toISOString();
  let   transcript = null;

  try {

    // ── Negotiation phase ──────────────────────────────────────────────────

    if (MODE !== "debrief_only") {
      log("Starting negotiation...\n");

      const negSystemPrompt = buildNegotiationPrompt();
      // simUserMsgs tracks the conversation from the simulated user's perspective:
      //   role "user"      = what the counterpart (AI) said
      //   role "assistant" = what the simulated user said
      const simUserMsgs = [];
      const chatMessages = []; // /api/chat format: { role, content }

      // Opening message from the counterpart
      const opening = await postApp("/api/chat", {
        scenario_id:    config.scenario_id,
        personality_id: config.personality_id,
        messages:       [],
        session_id:     sessionId,
        user_id:        TEST_USER_ID,
      });
      const openingText = clean(opening.reply);
      chatMessages.push({ role: "assistant", content: openingText });
      record("AI", openingText);

      // Negotiation loop — seed with opening message
      let lastAiText = openingText;

      while (true) {
        // Simulated user responds to latest counterpart message
        simUserMsgs.push({ role: "user", content: lastAiText });
        const userReply = await callSimUser(negSystemPrompt, simUserMsgs);

        if (userReply.includes("!!END_NEGOTIATION!!")) {
          log("[SIM] Ending negotiation.");
          break;
        }

        record("User", userReply);
        simUserMsgs.push({ role: "assistant", content: userReply });
        chatMessages.push({ role: "user", content: userReply });

        // Counterpart responds
        const aiResp = await postApp("/api/chat", {
          scenario_id:    config.scenario_id,
          personality_id: config.personality_id,
          messages:       chatMessages,
          session_id:     sessionId,
          user_id:        TEST_USER_ID,
        });
        lastAiText = clean(aiResp.reply);
        chatMessages.push({ role: "assistant", content: lastAiText });
        record("AI", lastAiText);
      }

      // Build transcript
      transcript = {
        run_id:           sessionId,
        scenario_id:      config.scenario_id,
        scenario_name:    config.scenario_id.replace(/_/g, " "),
        personality_id:   config.personality_id,
        personality_name: config.personality_id,
        started_at:       startedAt,
        exported_at:      new Date().toISOString(),
        messages: chatMessages
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({ role: m.role, text: m.content, timestamp: new Date().toISOString() })),
      };

    } else {
      // debrief_only: load transcript from file
      const transcriptFile = path.resolve(__dirname, config.transcript_file);
      if (!fs.existsSync(transcriptFile))
        throw new Error(`transcript_file not found: ${transcriptFile}`);
      transcript = JSON.parse(fs.readFileSync(transcriptFile, "utf-8"));
      log(`Loaded transcript: ${transcript.scenario_name} / ${transcript.personality_name} (${transcript.messages?.length} messages)\n`);
    }

    // ── Debrief phase ──────────────────────────────────────────────────────

    log("\nStarting debrief...");
    logLines.push("\n=== DEBRIEF CONVERSATION ===");

    const debriefId      = crypto.randomUUID();
    const debriefMessages = []; // running history for /api/debrief
    const debSystemPrompt = buildDebriefPrompt(transcript);
    // simDebriefMsgs: Sage's messages as "user", simulated user's replies as "assistant"
    const simDebriefMsgs  = [];
    let   sessionSummary  = "";

    // Stage 1 — generate plan
    log("Calling /api/debrief/plan... (30–90 seconds)");
    const planResp = await postApp("/api/debrief/plan", { ...transcript, debrief_id: debriefId, user_id: TEST_USER_ID });
    const plan     = planResp.plan;
    log("Plan ready. Starting debrief conversation...\n");

    // Stage 2 — debrief conversation loop
    while (true) {
      const sageResp = await postApp("/api/debrief", {
        debrief_id: debriefId,
        messages:   debriefMessages,
        plan,
        transcript,
      });

      const rawReply     = sageResp.reply;
      const MARKER       = "--- Session Complete ---";
      const markerIdx    = rawReply.indexOf(MARKER);
      const sessionDone  = markerIdx !== -1;
      const displayReply = clean(sessionDone ? rawReply.slice(0, markerIdx) : rawReply);

      if (sessionDone) sessionSummary = rawReply.slice(markerIdx + MARKER.length).trim();

      debriefMessages.push({ role: "assistant", content: rawReply });
      record("Sage", displayReply);

      if (sessionDone) {
        log("[AUTO] Session complete.");
        break;
      }

      // Simulated user responds to Sage
      simDebriefMsgs.push({ role: "user", content: displayReply });
      const userReply = await callSimUser(debSystemPrompt, simDebriefMsgs);

      if (userReply.includes("!!END_DEBRIEF!!")) {
        log("[SIM] Force-ending debrief.");
        sessionSummary = displayReply;
        break;
      }

      record("User", userReply);
      simDebriefMsgs.push({ role: "assistant", content: userReply });
      debriefMessages.push({ role: "user", content: userReply });
    }

    logLines.push(`\n=== DEBRIEF SUMMARY ===\n${sessionSummary}`);

    // Stage 3 — final assessment
    log("\nGenerating final assessment...");
    const assessResp = await postApp("/api/debrief/assessment", {
      run_id:         transcript.run_id,
      debrief_id:     debriefId,
      transcript,
      plan,
      messages:       debriefMessages,
      sessionSummary,
    });
    log(`[Assessment]: ${assessResp.assessment}`);
    logLines.push(`\n=== FINAL ASSESSMENT ===\n${assessResp.assessment}`);

    // ── Save log ───────────────────────────────────────────────────────────

    const ts       = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const filename = `${ts}_${config.scenario_id}_${config.personality_id}.txt`;
    const finalLog = `=== NEGOTIATION ===\n${logLines.join("\n")}`;
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), finalLog, "utf-8");

    log(`\n=== SESSION COMPLETE ===`);
    log(`Log: test_script/output/${filename}`);

  } catch (err) {
    log(`\n[ERROR] ${err.message}`);
    process.exit(1);
  }
})();
