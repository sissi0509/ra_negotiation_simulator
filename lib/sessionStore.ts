// Server-side in-memory session store.
// Lives in module scope — persists across requests in a single Next.js process.
// Data is lost on server restart (acceptable for v0).

export interface StoredMessage {
  role: "user" | "assistant";
  content: string;
}

export interface SessionState {
  scenario_id: string;
  personality_id: string;
  messages: StoredMessage[];
}

const store = new Map<string, SessionState>();

export function getSession(id: string): SessionState | undefined {
  return store.get(id);
}

export function saveSession(id: string, state: SessionState): void {
  store.set(id, state);
}

export function deleteSession(id: string): void {
  store.delete(id);
}
