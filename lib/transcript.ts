import { Message } from "@/components/ChatWindow";

export interface Transcript {
  run_id: string;
  scenario_id: string;
  scenario_name: string;
  personality_id: string;
  personality_name: string;
  started_at: string;
  exported_at: string;
  messages: Array<{ role: string; text: string; timestamp: string }>;
}

export function buildTranscript(
  messages: Message[],
  scenario_id: string,
  scenario_name: string,
  personality_id: string,
  personality_name: string,
  started_at: string,
  run_id?: string
): Transcript {
  return {
    run_id: run_id ?? crypto.randomUUID(),
    scenario_id,
    scenario_name,
    personality_id,
    personality_name,
    started_at,
    exported_at: new Date().toISOString(),
    // Exclude error messages — only real conversation turns
    messages: messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, text: m.text, timestamp: m.timestamp })),
  };
}

export function buildPlainText(
  transcript: Transcript,
  counterpartRole: string
): string {
  const date = transcript.started_at.split("T")[0];
  const header = [
    "[Negotiation Transcript]",
    `Scenario: ${transcript.scenario_name}`,
    `Personality: ${transcript.personality_name}`,
    `Date: ${date}`,
    "",
    "---",
    "",
  ].join("\n");

  const body = transcript.messages
    .map((m) => {
      const speaker = m.role === "user" ? "You" : counterpartRole;
      return `[${speaker}]: ${m.text}`;
    })
    .join("\n\n");

  return header + body;
}

function triggerDownload(
  content: string,
  filename: string,
  mimeType: string
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadJSON(transcript: Transcript): void {
  triggerDownload(
    JSON.stringify(transcript, null, 2),
    `transcript_${transcript.run_id}.json`,
    "application/json"
  );
}

export function downloadPlainText(
  transcript: Transcript,
  counterpartRole: string
): void {
  triggerDownload(
    buildPlainText(transcript, counterpartRole),
    `transcript_${transcript.run_id}.txt`,
    "text/plain"
  );
}
