import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

interface CallParams {
  max_tokens: number;
  system?: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

export async function callClaude(params: CallParams): Promise<string> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: params.max_tokens,
    ...(params.system ? { system: params.system } : {}),
    messages: params.messages,
  });

  const block = response.content[0];
  return block.type === "text" ? block.text : "";
}
