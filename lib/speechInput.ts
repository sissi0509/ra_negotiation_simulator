// Minimal types for the Web Speech API (not included in TypeScript's default lib)
interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
}

function getSpeechRecognitionConstructor():
  | (new () => SpeechRecognitionInstance)
  | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition ?? null;
}

/** Returns true if the browser supports the Web Speech API (Chrome/Edge only). */
export function isSpeechAvailable(): boolean {
  return getSpeechRecognitionConstructor() !== null;
}

/**
 * Creates a one-shot speech recognizer.
 * - onResult: called with the final transcript when the user stops speaking.
 * - onEnd: called when recognition stops (success, error, or manual stop).
 * Returns null if the browser does not support SpeechRecognition.
 */
export function createSpeechRecognizer(
  onResult: (text: string) => void,
  onEnd: () => void
): SpeechRecognitionInstance | null {
  const Ctor = getSpeechRecognitionConstructor();
  if (!Ctor) return null;

  const recognizer = new Ctor();
  recognizer.continuous = false;
  recognizer.interimResults = false;
  recognizer.lang = "en-US";

  recognizer.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognizer.onend = onEnd;
  recognizer.onerror = onEnd;

  return recognizer;
}
