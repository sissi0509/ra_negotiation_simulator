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
  theme?: "gray" | "indigo";
}

export default function ChatWindow({ messages, isLoading, counterpartRole, theme = "gray" }: Props) {
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
                  : theme === "indigo"
                  ? "rounded-tl-sm bg-indigo-50 text-gray-900"
                  : "rounded-tl-sm bg-gray-100 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}

      {isLoading && (
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs text-gray-400">{counterpartRole}</span>
          <div className={`rounded-2xl rounded-tl-sm px-4 py-3 ${theme === "indigo" ? "bg-indigo-50" : "bg-gray-100"}`}>
            <div className="flex gap-1">
              <span className={`h-2 w-2 animate-bounce rounded-full [animation-delay:0ms] ${theme === "indigo" ? "bg-indigo-300" : "bg-gray-400"}`} />
              <span className={`h-2 w-2 animate-bounce rounded-full [animation-delay:150ms] ${theme === "indigo" ? "bg-indigo-300" : "bg-gray-400"}`} />
              <span className={`h-2 w-2 animate-bounce rounded-full [animation-delay:300ms] ${theme === "indigo" ? "bg-indigo-300" : "bg-gray-400"}`} />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
