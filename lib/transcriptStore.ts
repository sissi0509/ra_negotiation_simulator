// File-system transcript store — acts as a simple database until a real one is chosen.
// Each completed conversation is written to db/transcripts/transcript_<run_id>.json
// Migration path: read all files, insert rows into your DB, then delete db/.
import fs from "fs";
import path from "path";
import type { Transcript } from "@/lib/transcript";

const TRANSCRIPTS_DIR = path.join(process.cwd(), "db", "transcripts");

function ensureDir(): void {
  if (!fs.existsSync(TRANSCRIPTS_DIR)) {
    fs.mkdirSync(TRANSCRIPTS_DIR, { recursive: true });
  }
}

export function saveTranscript(transcript: Transcript): void {
  ensureDir();
  const filepath = path.join(
    TRANSCRIPTS_DIR,
    `transcript_${transcript.run_id}.json`
  );
  fs.writeFileSync(filepath, JSON.stringify(transcript, null, 2), "utf-8");
}

export function getAllTranscripts(): Transcript[] {
  if (!fs.existsSync(TRANSCRIPTS_DIR)) return [];
  return fs
    .readdirSync(TRANSCRIPTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(TRANSCRIPTS_DIR, f), "utf-8");
      return JSON.parse(raw) as Transcript;
    });
}
