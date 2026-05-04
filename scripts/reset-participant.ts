// Resets a participant back to the start of Round 2.
// Run with: npx tsx scripts/reset-participant.ts

// ─── EDIT THIS ────────────────────────────────────────────────
const EMAIL = "zx@study.local";
// ─────────────────────────────────────────────────────────────

import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

async function reset() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;
  if (!uri || !dbName) {
    console.error("Missing MONGODB_URI or MONGODB_DB in .env.local");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const user = await db.collection("users").findOne({ email: EMAIL });
  if (!user) {
    console.error(`User not found: ${EMAIL}`);
    await client.close();
    process.exit(1);
  }

  await db.collection("users").updateOne(
    { email: EMAIL },
    {
      $set: {
        current_round: 2,
        status: "active",
        "steps_done.s3_debrief":         false,
        "steps_done.s4_efficacy":         false,
        "steps_done.debrief_complete":    false,
        "steps_done.reflection_complete": false,
        "steps_done.round2_complete":     false,
        "steps_done.assessment_complete": false,
        "steps_done.final":               false,
      },
    }
  );

  console.log(`RESET ${EMAIL} — back to start of Round 2`);
  console.log("Also clear localStorage in the browser: negotiation_session_id, debrief_pending, debrief_state, experiment_debrief_id, experiment_last_run_id");
  await client.close();
}

reset().catch((err) => {
  console.error(err);
  process.exit(1);
});
