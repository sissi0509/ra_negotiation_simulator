// Server-side in-memory session store for debrief sessions.
// Same pattern as sessionStore.ts — persists across requests in a single Next.js process.
// Data is lost on server restart (acceptable for v0).

import { Transcript } from "@/lib/transcript";
import { DebriefPlan } from "@/lib/debriefPrompt";

export interface DebriefStoredMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DebriefSession {
  transcript: Transcript;
  plan: DebriefPlan;
  messages: DebriefStoredMessage[];
  assessment?: string;
}

const store = new Map<string, DebriefSession>();

export function getDebriefSession(id: string): DebriefSession | undefined {
  return store.get(id);
}

export function saveDebriefSession(id: string, state: DebriefSession): void {
  store.set(id, state);
}

export function deleteDebriefSession(id: string): void {
  store.delete(id);
}
