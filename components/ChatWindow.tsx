"use client";

import { useEffect, useRef } from "react";

export interface Message {
  role: "user" | "assistant" | "error";
  text: string;
  timestamp: string;
}

interface Props {
  messages: Message[];
  isLoading: boolean;
  counterpartRole: string;
}

export default function ChatWindow({ messages, isLoading, counterpartRole }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
      {messages.map((msg, i) => {
        if (msg.role === "error") {
          return (
            <p key={i} className="text-center text-sm text-red-500">
              {msg.text}
            </p>
          );
        }

        const isUser = msg.role === "user";
        return (
          <div key={i} className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
            <span className="text-xs text-gray-400">
              {isUser ? "You" : counterpartRole}
            </span>
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                isUser
                  ? "rounded-tr-sm bg-gray-900 text-white"
                  : "rounded-tl-sm bg-gray-100 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}

      {messages.length >= 30 && (
        <div className="sticky bottom-0 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-xs text-amber-700">
          This conversation is getting long — consider resetting to keep responses accurate.
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs text-gray-400">{counterpartRole}</span>
          <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3">
            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
