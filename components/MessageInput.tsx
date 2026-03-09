"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { isSpeechAvailable, createSpeechRecognizer } from "@/lib/speechInput";

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
  defaultVoice?: boolean;
}

export default function MessageInput({ onSend, disabled, defaultVoice = false }: Props) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const recognizerRef = useRef<ReturnType<typeof createSpeechRecognizer>>(null);

  useEffect(() => {
    const available = isSpeechAvailable();
    setSpeechAvailable(available);
    if (defaultVoice && available) setVoiceMode(true);
  }, [defaultVoice]);

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
        // In voice mode replace; in text mode append
        if (voiceMode) {
          setText(transcript);
        } else {
          setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
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

  // ── Voice mode ────────────────────────────────────────────────────────────
  if (voiceMode && speechAvailable) {
    return (
      <div className="flex flex-col items-center gap-3 border-t border-gray-200 bg-white px-6 py-5">
        {/* Transcript preview */}
        {text && !isRecording && (
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
            {text}
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* Mic button */}
          <button
            onClick={handleMic}
            disabled={disabled || isRecording}
            title={isRecording ? "Listening…" : "Speak"}
            className={`flex h-14 w-14 items-center justify-center rounded-full text-xl transition-colors ${
              isRecording
                ? "cursor-default bg-red-50 ring-4 ring-red-200"
                : "bg-gray-900 text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            }`}
          >
            {isRecording ? (
              <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
            ) : (
              "🎤"
            )}
          </button>

          {/* Send — only shown when transcript is ready */}
          {text && !isRecording && (
            <button
              onClick={submit}
              disabled={disabled}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Send
            </button>
          )}
        </div>

        <p className="text-xs text-gray-400">
          {isRecording ? "Listening…" : text ? "Send or tap mic to re-record" : "Tap to speak"}
        </p>

        <button
          onClick={() => { setText(""); setVoiceMode(false); }}
          className="text-xs text-gray-400 transition-colors hover:text-gray-600"
        >
          Type instead
        </button>
      </div>
    );
  }

  // ── Text mode ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-2 border-t border-gray-200 bg-white px-6 py-4">
      <div className="flex items-end gap-3">
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
            title={isRecording ? "Listening…" : "Voice input"}
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

      {speechAvailable && !voiceMode && (
        <button
          onClick={() => { setText(""); setVoiceMode(true); }}
          className="self-start text-xs text-gray-400 transition-colors hover:text-gray-600"
        >
          Use voice instead
        </button>
      )}
    </div>
  );
}
