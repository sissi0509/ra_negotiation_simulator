import { getDb } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/dbCollections";
import type { Transcript } from "@/lib/transcript";

const COLLECTION = COLLECTIONS.transcripts;

export async function saveTranscript(transcript: Transcript, userId?: string | null): Promise<void> {
  const db = await getDb();
  await db.collection(COLLECTION).replaceOne(
    { run_id: transcript.run_id },
    { ...transcript, ...(userId ? { user_id: userId } : {}) },
    { upsert: true }
  );
}

export async function getTranscriptByRunId(runId: string): Promise<Transcript | null> {
  const db = await getDb();
  return db.collection<Transcript>(COLLECTION).findOne({ run_id: runId }, { projection: { _id: 0 } });
}

export async function getAllTranscripts(): Promise<Transcript[]> {
  const db = await getDb();
  return db
    .collection<Transcript>(COLLECTION)
    .find({}, { projection: { _id: 0 } })
    .sort({ started_at: -1 })
    .toArray();
}
