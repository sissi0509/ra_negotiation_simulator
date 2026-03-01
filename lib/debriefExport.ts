import { Transcript } from "@/lib/transcript";

export function buildDebriefText(
  transcript: Transcript,
  messages: Array<{ role: string; content: string }>,
  summary: string,
  assessment?: string
): string {
  const date = transcript.started_at.split("T")[0];

  const header = [
    "[Negotiation Debrief]",
    `Scenario: ${transcript.scenario_name}`,
    `Personality: ${transcript.personality_name}`,
    `Original negotiation: ${date}`,
    "",
    "---",
    "",
  ].join("\n");

  const body = messages
    .map((m) => {
      const speaker = m.role === "user" ? "You" : "Sage";
      return `[${speaker}]: ${m.content}`;
    })
    .join("\n\n");

  const summaryBlock = "\n\n" + summary;
  const assessmentBlock = assessment ? "\n\n" + assessment : "";

  return header + body + summaryBlock + assessmentBlock;
}

export function downloadDebrief(text: string, debriefId: string): void {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `debrief_${debriefId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
