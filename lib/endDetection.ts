// Phrases detected in the AI's reply that signal the negotiation has concluded
const AI_END_PHRASES = [
  // Deal reached
  "we have a deal",
  "we've got a deal",
  "we've got ourselves a deal",
  "it's a deal",
  "deal is done",
  "we have an agreement",
  "we've reached an agreement",
  "we're in agreement",
  "we've come to an agreement",
  "consider it done",
  "you've got yourself a deal",
  "glad we could agree",
  "glad we could work this out",
  "happy we could reach",
  "pleased we could reach",
  "welcome aboard",
  "look forward to working with you",
  "pleasure doing business",
  "pleasure working with you",
  "we can proceed on that basis",
  "let's go ahead with that",
  "i'll accept that",
  "that works for us",
  "we'll move forward with that",
  // No deal
  "no deal",
  "we'll pass",
  "we're going to pass",
  "we'll go with another",
  "we'll look elsewhere",
  "we'll move on",
  "we're going to move on",
  "offer is withdrawn",
  "that's our final offer",
  "that's my final offer",
  "we're done here",
  "this conversation is over",
  "we cannot move forward",
  "we won't be able to proceed",
  "we're going to have to walk away",
  "i'm going to have to walk away",
  "we're walking away",
];

// Phrases detected in the user's message that signal they want to end
const USER_END_PHRASES = [
  "goodbye",
  "good bye",
  "bye bye",
  "see you later",
  "see you soon",
  "farewell",
  "take care",
  "have a good day",
  "have a nice day",
  "i'm done",
  "i'm out",
  "we're done",
  "let's end",
  "end this",
  "stop the negotiation",
  "let's stop",
  "no thanks",
  "not interested",
];

// Standalone "bye" — word boundary prevents matching "maybe", "nearby", etc.
const STANDALONE_BYE = /\bbye\b/i;

export function isConversationOver(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return AI_END_PHRASES.some((phrase) => lower.includes(phrase));
}

export function isUserSigningOff(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  if (STANDALONE_BYE.test(lower)) return true;
  return USER_END_PHRASES.some((phrase) => lower.includes(phrase));
}
