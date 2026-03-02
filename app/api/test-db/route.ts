import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// Temporary diagnostic endpoint — visit GET /api/test-db to verify MongoDB connection.
// Remove this file once the connection is confirmed working.
export async function GET() {
  try {
    const db = await getDb();
    const collections = await db.listCollections().toArray();
    const transcriptCount = await db.collection("transcripts").countDocuments();
    const debriefCount = await db.collection("debriefs").countDocuments();
    return NextResponse.json({
      ok: true,
      database: db.databaseName,
      collections: collections.map((c) => c.name),
      counts: { transcripts: transcriptCount, debriefs: debriefCount },
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
