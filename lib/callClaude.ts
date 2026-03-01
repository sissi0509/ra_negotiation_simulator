import Anthropic from "@anthropic-ai/sdk";

// Prefer the cheapest model; fall back to sonnet only when haiku is overloaded.
const CHEAP_MODEL = "claude-haiku-4-5";
const FALLBACK_MODEL = "claude-sonnet-4-6";

const client = new Anthropic();

type CreateParams = Parameters<typeof client.messages.create>[0];
type MessageResponse = Awaited<ReturnType<typeof client.messages.create>>;

/**
 * Calls the Anthropic messages API using the cheapest available model.
 * Automatically retries with the fallback model on a 529 Overloaded error.
 */
export async function callClaude(
  params: Omit<CreateParams, "model">
): Promise<MessageResponse> {
  try {
    return await client.messages.create({ ...params, model: CHEAP_MODEL });
  } catch (err) {
    // 529 = API overloaded — silently retry with the fallback model
    if ((err as { status?: number }).status === 529) {
      return await client.messages.create({ ...params, model: FALLBACK_MODEL });
    }
    throw err;
  }
}
