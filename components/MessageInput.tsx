"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { isSpeechAvailable, createSpeechRecognizer } from "@/lib/speechInput";

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  // Keep a ref to the active recognizer so we could stop it if needed
  const recognizerRef = useRef<ReturnType<typeof createSpeechRecognizer>>(null);

  useEffect(() => {
    setSpeechAvailable(isSpeechAvailable());
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  }

  function handleMic() {
    if (isRecording) return;
    setIsRecording(true);

    const recognizer = createSpeechRecognizer(
      (transcript) => {
        // Append transcript to whatever the user already typed
        setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      },
      () => {
        setIsRecording(false);
        recognizerRef.current = null;
      }
    );

    if (recognizer) {
      recognizerRef.current = recognizer;
      recognizer.start();
    } else {
      setIsRecording(false);
    }
  }

  return (
    <div className="flex items-end gap-3 border-t border-gray-200 bg-white px-6 py-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
        rows={2}
        className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
      />

      {speechAvailable && (
        <button
          onClick={handleMic}
          disabled={disabled || isRecording}
          title={isRecording ? "Listening…" : "Voice input (Chrome/Edge)"}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
            isRecording
              ? "cursor-default border-red-200 bg-red-50 text-red-600"
              : "border-gray-300 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          }`}
        >
          {isRecording ? (
            <>
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              Listening…
            </>
          ) : (
            "🎤"
          )}
        </button>
      )}

      <button
        onClick={submit}
        disabled={disabled || text.trim() === ""}
        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      >
        Send
      </button>
    </div>
  );
}
