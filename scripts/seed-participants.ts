// Run with: npx ts-node --project tsconfig.json scripts/seed-participants.ts
//
// Creates one participant account per group (A, B, C) in the `users` collection.
// Edit the entries below before running.

import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const PARTICIPANTS = [
  {
    email: "participant-a@study.local",
    name: "Participant A",
    password: "study-password-a",
    participant_id: "P01",
    group: "A",
    condition: "ai_debrief",
    rounds: [
      { round: 1, scenario: "salary_negotiation", personality: "aggressive" },
      { round: 2, scenario: "apartment_rent", personality: "aggressive" },
    ],
  },
  {
    email: "participant-b@study.local",
    name: "Participant B",
    password: "study-password-b",
    participant_id: "P02",
    group: "B",
    condition: "static_reflection",
    rounds: [
      { round: 1, scenario: "salary_negotiation", personality: "aggressive" },
      { round: 2, scenario: "apartment_rent", personality: "aggressive" },
    ],
  },
  {
    email: "participant-c@study.local",
    name: "Participant C",
    password: "study-password-c",
    participant_id: "P03",
    group: "C",
    condition: "control",
    rounds: [
      { round: 1, scenario: "salary_negotiation", personality: "aggressive" },
      { round: 2, scenario: "apartment_rent", personality: "aggressive" },
    ],
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;
  if (!uri || !dbName) {
    console.error("Missing MONGODB_URI or MONGODB_DB in .env.local");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");

  for (const p of PARTICIPANTS) {
    const existing = await collection.findOne({ email: p.email });
    if (existing) {
      console.log(`SKIP  ${p.email} — already exists`);
      continue;
    }

    const password_hash = await bcrypt.hash(p.password, 10);
    await collection.insertOne({
      email: p.email,
      name: p.name,
      password_hash,
      type: "participant",
      participant_id: p.participant_id,
      group: p.group,
      condition: p.condition,
      rounds: p.rounds,
      current_round: 1,
      status: "active",
      consent_given: false,
      steps_done: {
        // Surveys
        pre: false,
        gty_intro: false,
        s2_efficacy: false,
        s3_debrief: false,
        s4_efficacy: false,
        s5_improvement: false,
        final: false,
        // Activity steps
        round1_complete: false,
        debrief_complete: false,
        reflection_complete: false,
        round2_complete: false,
      },
      enrolled_at: new Date().toISOString(),
    });
    console.log(`CREATED ${p.email} (Group ${p.group}, ${p.condition})`);
  }

  await client.close();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
