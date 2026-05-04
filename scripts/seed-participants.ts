// Run with: npx tsx scripts/seed-participants.ts

// ─── EDIT THESE ──────────────────────────────────────────────
const EMAIL = "zx1@study.local"; // login email
const PASSWORD = "password123-zx1"; // login password
const ID = "Pzx1"; // participant ID (P01, P02, …)
const GROUP = "A"; // "A" | "B" | "C"
// ─────────────────────────────────────────────────────────────

import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const CONDITION_MAP: Record<string, string> = {
  A: "ai_debrief",
  B: "static_reflection",
  C: "control",
};

async function seed() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;
  if (!uri || !dbName) {
    console.error("Missing MONGODB_URI or MONGODB_DB in .env.local");
    process.exit(1);
  }

  const group = GROUP.toUpperCase();
  const condition = CONDITION_MAP[group];
  if (!condition) {
    console.error(`Invalid GROUP "${GROUP}". Must be A, B, or C.`);
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");

  const existing = await collection.findOne({ email: EMAIL });
  if (existing) {
    console.log(`SKIP  ${EMAIL} — already exists`);
    await client.close();
    return;
  }

  const password_hash = await bcrypt.hash(PASSWORD, 10);
  await collection.insertOne({
    email: EMAIL,
    name: ID,
    password_hash,
    type: "participant",
    participant_id: ID,
    group,
    condition,
    rounds: [
      { round: 1, scenario: "salary_negotiation", personality: "aggressive" },
      { round: 2, scenario: "apartment_rent", personality: "aggressive" },
    ],
    current_round: 1,
    status: "active",
    consent_given: false,
    steps_done: {
      pre: false,
      gty_intro: false,
      s2_efficacy: false,
      s3_debrief: false,
      s4_efficacy: false,
      final: false,
      round1_complete: false,
      debrief_complete: false,
      reflection_complete: false,
      round2_complete: false,
      assessment_complete: false,
    },
    enrolled_at: new Date().toISOString(),
  });

  console.log(`CREATED ${EMAIL} — Group ${group} (${condition})`);
  await client.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
