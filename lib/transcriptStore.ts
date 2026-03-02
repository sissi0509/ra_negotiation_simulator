import { getDb } from "@/lib/mongodb";
import type { Transcript } from "@/lib/transcript";

const COLLECTION = "transcripts";

export async function saveTranscript(transcript: Transcript): Promise<void> {
  const db = await getDb();
  await db.collection(COLLECTION).replaceOne(
    { run_id: transcript.run_id },
    transcript,
    { upsert: true }
  );
}

export async function getAllTranscripts(): Promise<Transcript[]> {
  const db = await getDb();
  return db
    .collection<Transcript>(COLLECTION)
    .find({}, { projection: { _id: 0 } })
    .sort({ started_at: -1 })
    .toArray();
}
