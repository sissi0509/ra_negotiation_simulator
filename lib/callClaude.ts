import Anthropic from "@anthropic-ai/sdk";
import type { Message } from "@anthropic-ai/sdk/resources/messages";

// Prefer the cheapest model; fall back to sonnet only when haiku is overloaded.
const CHEAP_MODEL = "claude-haiku-4-5-20251001";
const FALLBACK_MODEL = "claude-sonnet-4-6";

const client = new Anthropic();

type CreateParams = Parameters<typeof client.messages.create>[0];

/**
 * Calls the Anthropic messages API (non-streaming).
 * Defaults to the cheapest model; pass model: FALLBACK_MODEL for tasks that
 * require reliable structured output (e.g. Stage 1 plan generation).
 * Automatically retries with the fallback model on a 529 Overloaded error.
 */
export async function callClaude(
  params: Omit<CreateParams, "model" | "stream">,
  model: string = CHEAP_MODEL
): Promise<Message> {
  try {
    return await client.messages.create({ ...params, model, stream: false });
  } catch (err) {
    // 529 = API overloaded — silently retry with the fallback model
    if ((err as { status?: number }).status === 529) {
      return await client.messages.create({ ...params, model: FALLBACK_MODEL, stream: false });
    }
    throw err;
  }
}

export { FALLBACK_MODEL };
