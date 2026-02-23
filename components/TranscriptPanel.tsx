import { Transcript } from "@/lib/transcript";

interface Props {
  transcript: Transcript;
}

export default function TranscriptPanel({ transcript }: Props) {
  // Render directly from the raw canonical log — never from plan.key_moments or any filtered subset.
  const allMessages = transcript.messages;
  const turnCount = allMessages.length;
  const turnLabel = turnCount === 1 ? "1 turn" : `${turnCount} turns`;

  return (
    <>
      {/* Panel header */}
      <div className="shrink-0 border-b border-indigo-100 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-indigo-400">
          Original Negotiation
        </p>
        <p className="text-sm font-medium text-gray-700">
          {transcript.scenario_name} · {transcript.personality_name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{turnLabel}</p>
      </div>

      {/* Scrollable transcript — read-only */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {allMessages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={i}
                className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
              >
                <span className="text-xs text-gray-400">
                  {isUser ? "You" : "Counterpart"}
                </span>
                <div
                  className={`max-w-[92%] rounded-xl px-3 py-2 text-xs leading-relaxed select-text ${
                    isUser
                      ? "rounded-tr-sm bg-gray-800 text-white"
                      : "rounded-tl-sm border border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
