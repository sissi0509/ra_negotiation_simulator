"use client";

import { useState, useEffect } from "react";
import ScenarioSelector from "@/components/ScenarioSelector";
import PersonalitySelector from "@/components/PersonalitySelector";
import SceneModal from "@/components/SceneModal";
import ChatWindow, { Message } from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import EndStatePrompt from "@/components/EndStatePrompt";
import ExportModal from "@/components/ExportModal";
import ActionBar from "@/components/ActionBar";
import scenarios from "@/data/scenarios.json";
import personalities from "@/data/personalities.json";
import { isConversationOver, isUserSigningOff } from "@/lib/endDetection";
import { buildTranscript } from "@/lib/transcript";
import { DEBRIEF_PENDING_KEY, DEBRIEF_SESSION_KEY as DEBRIEF_SESSION_KEY_CONST } from "@/app/debrief/page";

const SESSION_KEY = "negotiation_session_id";

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState("");
  const [selectedPersonality, setSelectedPersonality] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  // True while we check localStorage / fetch the session — prevents the Setup
  // Screen from flashing before we know whether to show the Chat Screen instead.
  const [isInitializing, setIsInitializing] = useState(true);

  const canStart = selectedScenario !== "" && selectedPersonality !== "";
  const scenario = scenarios.find((s) => s.id === selectedScenario);
  const personality = personalities.find((p) => p.id === selectedPersonality);

  // On mount: restore session from server if we have a saved session ID
  useEffect(() => {
    const storedId = localStorage.getItem(SESSION_KEY);
    if (!storedId) {
      setIsInitializing(false);
      return;
    }

    fetch(`/api/session?id=${storedId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || !data.messages?.length) {
          localStorage.removeItem(SESSION_KEY);
          return;
        }
        const restoredMessages: Message[] = data.messages.map(
          (m: { role: "user" | "assistant"; content: string }) => ({
            role: m.role,
            text: m.content,
            timestamp: new Date().toISOString(),
          })
        );
        setSessionId(storedId);
        setSelectedScenario(data.scenario_id);
        setSelectedPersonality(data.personality_id);
        setMessages(restoredMessages);
        setStartedAt(new Date().toISOString());
        setSessionActive(true);
      })
      .catch(() => localStorage.removeItem(SESSION_KEY))
      .finally(() => setIsInitializing(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save completed transcript to backend whenever the conversation ends.
  // Fire-and-forget: the user doesn't need feedback for this background save.
  useEffect(() => {
    if (!conversationEnded) return;
    const sc = scenarios.find((s) => s.id === selectedScenario);
    const pers = personalities.find((p) => p.id === selectedPersonality);
    if (!sc || !pers || !startedAt || messages.length === 0) return;

    const transcript = buildTranscript(
      messages,
      sc.id,
      sc.name,
      pers.id,
      pers.name,
      startedAt
    );
    fetch("/api/transcripts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transcript),
    }).catch(() => {}); // silent failure — not critical for the user experience
  }, [conversationEnded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isInitializing) return null;

  // sid is passed explicitly because setState is async and the new value
  // wouldn't be available in the same call stack as setSessionId.
  async function fetchReply(history: Message[], forceEnd = false, sid?: string) {
    const activeId = sid ?? sessionId;
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario_id: selectedScenario,
          personality_id: selectedPersonality,
          // Strip error messages — only user/assistant turns go to the API
          messages: history
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({ role: m.role as "user" | "assistant", content: m.text })),
          session_id: activeId,
        }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const reply: string = data.reply;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply, timestamp: new Date().toISOString() },
      ]);
      if (forceEnd || isConversationOver(reply)) setConversationEnded(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "error", text: "Something went wrong. Please try again.", timestamp: new Date().toISOString() },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleStart() {
    setShowModal(true);
  }

  function handleBegin() {
    const newId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, newId);
    setSessionId(newId);
    setStartedAt(new Date().toISOString());
    setShowModal(false);
    setSessionActive(true);
    // Pass newId directly — setSessionId is async so sessionId still holds the old value here
    fetchReply([], false, newId);
  }

  function handleExport() {
    setShowExportModal(true);
  }

  function handleEnd() {
    setConversationEnded(true);
  }

  function handleDebrief() {
    if (!scenario || !personality || !startedAt) return;
    const transcript = buildTranscript(
      messages,
      scenario.id,
      scenario.name,
      personality.id,
      personality.name,
      startedAt
    );
    // Clear any stale debrief session so the new transcript always takes priority
    localStorage.removeItem(DEBRIEF_SESSION_KEY_CONST);
    localStorage.setItem(DEBRIEF_PENDING_KEY, JSON.stringify(transcript));
    window.location.href = "/debrief";
  }

  function handleReset() {
    if (sessionId) {
      fetch(`/api/session?id=${sessionId}`, { method: "DELETE" }).catch(() => {});
      localStorage.removeItem(SESSION_KEY);
    }
    setSessionId(null);
    setStartedAt(null);
    setShowExportModal(false);
    setMessages([]);
    setSessionActive(false);
    setConversationEnded(false);
    setSelectedScenario("");
    setSelectedPersonality("");
  }

  function handleSend(text: string) {
    const userMsg: Message = { role: "user", text, timestamp: new Date().toISOString() };
    const next = [...messages, userMsg];
    setMessages(next);
    // If user is signing off, still fetch one last AI farewell then end
    fetchReply(next, isUserSigningOff(text));
  }

  // ── Chat Screen ──────────────────────────────────────────────────────────
  if (sessionActive && scenario && personality) {
    return (
      <div className="flex h-screen flex-col bg-white">
        <header className="flex items-center gap-3 border-b border-gray-200 px-6 py-4">
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              {scenario.name} · {personality.name}
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {personality.name} {scenario.counterpart_role}
            </p>
          </div>
          <ActionBar
            onExport={handleExport}
            onEnd={handleEnd}
            onReset={handleReset}
            canExport={messages.filter((m) => m.role !== "error").length > 0}
            conversationEnded={conversationEnded}
          />
        </header>

        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          counterpartRole={scenario.counterpart_role}
        />

        {messages.length >= 30 && (
          <div className="bg-amber-50 px-6 py-2 text-center text-xs text-amber-700 border-t border-amber-100">
            This conversation is getting long — consider resetting to keep responses accurate.
          </div>
        )}

        {conversationEnded ? (
          <EndStatePrompt onStartNew={handleReset} onExport={handleExport} onDebrief={handleDebrief} />
        ) : (
          <MessageInput onSend={handleSend} disabled={isLoading} />
        )}

        {showExportModal && scenario && personality && startedAt && (
          <ExportModal
            transcript={buildTranscript(
              messages,
              scenario.id,
              scenario.name,
              personality.id,
              personality.name,
              startedAt
            )}
            counterpartRole={scenario.counterpart_role}
            onClose={() => setShowExportModal(false)}
          />
        )}
      </div>
    );
  }

  // ── Setup Screen ─────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        <h1 className="text-center text-xl font-semibold text-gray-900">
          Negotiation Simulator
        </h1>

        <div className="flex flex-col gap-4">
          <ScenarioSelector
            value={selectedScenario}
            onChange={setSelectedScenario}
          />
          <PersonalitySelector
            value={selectedPersonality}
            onChange={setSelectedPersonality}
          />
        </div>

        <button
          onClick={handleStart}
          disabled={!canStart}
          className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        >
          Start
        </button>
      </div>

      {showModal && scenario && personality && (
        <SceneModal
          scenario={scenario}
          personality={personality}
          onBegin={handleBegin}
        />
      )}
    </div>
  );
}
