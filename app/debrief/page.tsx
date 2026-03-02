"use client";

import { useState, useEffect } from "react";
import DebriefLoadingScreen from "@/components/DebriefLoadingScreen";
import DebriefEndState from "@/components/DebriefEndState";
import ChatWindow, { Message } from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import TranscriptPanel from "@/components/TranscriptPanel";
import { Transcript } from "@/lib/transcript";
import { DebriefPlan } from "@/lib/debriefPrompt";
import { buildDebriefText, downloadDebrief } from "@/lib/debriefExport";
import DebriefUpload from "@/components/DebriefUpload";

export const DEBRIEF_PENDING_KEY = "debrief_pending";
export const DEBRIEF_SESSION_KEY = "debrief_session_id";
const DEBRIEF_STATE_KEY = "debrief_state";

function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function DebriefPage() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [plan, setPlan] = useState<DebriefPlan | null>(null);
  const [debriefId, setDebriefId] = useState<string | null>(null);
  const [debriefStartedAt, setDebriefStartedAt] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [debriefEnded, setDebriefEnded] = useState(false);
  const [sessionSummary, setSessionSummary] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<string | null>(null);
  const [assessmentReady, setAssessmentReady] = useState(false);
  const [assessmentVisible, setAssessmentVisible] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [showEndChoice, setShowEndChoice] = useState(false);

  // On mount: check for a pending transcript (new debrief) or an active session (page refresh).
  useEffect(() => {
    async function init() {
      // Priority 1: new debrief request from the simulator (or manual upload).
      const pending = localStorage.getItem(DEBRIEF_PENDING_KEY);
      if (pending) {
        localStorage.removeItem(DEBRIEF_SESSION_KEY);
        localStorage.removeItem(DEBRIEF_STATE_KEY);
        try {
          setTranscript(JSON.parse(pending) as Transcript);
        } catch {
          localStorage.removeItem(DEBRIEF_PENDING_KEY);
        }
        setIsInitializing(false);
        return;
      }

      // Priority 2: mid-session page refresh — restore full state from localStorage.
      const savedState = localStorage.getItem(DEBRIEF_STATE_KEY);
      if (savedState) {
        try {
          const state = JSON.parse(savedState);
          if (!Array.isArray(state.transcript?.messages)) {
            localStorage.removeItem(DEBRIEF_STATE_KEY);
            setIsInitializing(false);
            return;
          }
          setTranscript(state.transcript);
          setPlan(state.plan);
          setDebriefId(state.debriefId);
          setDebriefStartedAt(state.debriefStartedAt ?? null);
          const restored: Message[] = (state.messages ?? []).map(
            (m: { role: "user" | "assistant"; content: string }) => ({
              role: m.role,
              text: m.content,
              timestamp: new Date().toISOString(),
            })
          );
          setMessages(restored);
          setSessionActive(true);
          setIsInitializing(false);
          return;
        } catch {
          localStorage.removeItem(DEBRIEF_STATE_KEY);
        }
      }

      // Priority 3: server session fallback
      const sessionId = localStorage.getItem(DEBRIEF_SESSION_KEY);
      if (sessionId) {
        try {
          const res = await fetch(`/api/debrief/session?id=${sessionId}`);
          if (res.ok) {
            const data = await res.json();
            setTranscript(data.transcript);
            setPlan(data.plan);
            setDebriefId(sessionId);
            const restored: Message[] = (data.messages ?? []).map(
              (m: { role: "user" | "assistant"; content: string }) => ({
                role: m.role,
                text: m.content,
                timestamp: new Date().toISOString(),
              })
            );
            setMessages(restored);
            setSessionActive(true);
            setIsInitializing(false);
            return;
          } else {
            localStorage.removeItem(DEBRIEF_SESSION_KEY);
          }
        } catch {
          localStorage.removeItem(DEBRIEF_SESSION_KEY);
        }
      }

      setIsInitializing(false);
    }
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save conversation state to localStorage after every message.
  useEffect(() => {
    if (!debriefId || !plan || !transcript || !Array.isArray(transcript.messages) || messages.length === 0) return;
    const state = {
      debriefId,
      transcript,
      plan,
      debriefStartedAt: debriefStartedAt ?? new Date().toISOString(),
      messages: messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.text })),
    };
    localStorage.setItem(DEBRIEF_STATE_KEY, JSON.stringify(state));
  }, [messages, debriefId, plan, transcript, debriefStartedAt]);

  // Save completed debrief to db when session ends (natural or manual).
  useEffect(() => {
    if (!sessionComplete || !transcript || !plan || !debriefId) return;

    const apiMessages = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.text }));

    fetch("/api/debrief/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        run_id: transcript.run_id,
        debrief_id: debriefId,
        transcript,
        plan,
        messages: apiMessages,
        session_summary: sessionSummary ?? "",
        started_at: debriefStartedAt ?? new Date().toISOString(),
      }),
    }).catch(() => {}); // Best-effort — don't surface save errors to the user
  }, [sessionComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent flash of wrong screen while initialising
  if (isInitializing) return null;

  // ── Handlers ──────────────────────────────────────────────────────────────

  async function handleStart() {
    if (!transcript) return;
    setStartError(null);
    setIsLoading(true);

    const newDebriefId = generateId();
    localStorage.setItem(DEBRIEF_SESSION_KEY, newDebriefId);
    setDebriefId(newDebriefId);
    const startedAt = new Date().toISOString();
    setDebriefStartedAt(startedAt);

    try {
      // Stage 1: analyse transcript once — full transcript sent here only
      const planRes = await fetch("/api/debrief/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...transcript, debrief_id: newDebriefId }),
      });
      if (!planRes.ok) {
        const errData = await planRes.json().catch(() => ({}));
        throw new Error(errData.error || `Plan API error ${planRes.status}`);
      }
      const { plan: newPlan }: { plan: DebriefPlan } = await planRes.json();
      setPlan(newPlan);

      // Stage 2: get Sage's opening turn — include transcript for full context
      const debriefRes = await fetch("/api/debrief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: newPlan,
          messages: [],
          debrief_id: newDebriefId,
          transcript,
        }),
      });
      if (!debriefRes.ok) {
        const errData = await debriefRes.json().catch(() => ({}));
        throw new Error(errData.error || `Debrief API error ${debriefRes.status}`);
      }
      const { reply } = await debriefRes.json();

      setMessages([{ role: "assistant", text: reply, timestamp: new Date().toISOString() }]);
      setSessionActive(true);
    } catch (err) {
      setStartError(err instanceof Error ? err.message : "Something went wrong starting the debrief. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function fireAssessment(currentPlan: DebriefPlan, currentMessages: Message[], summary: string) {
    if (!transcript || !debriefId) return;
    const apiMessages = currentMessages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.text }));
    try {
      const res = await fetch("/api/debrief/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          run_id: transcript.run_id,
          debrief_id: debriefId,
          transcript,
          plan: currentPlan,
          messages: apiMessages,
          sessionSummary: summary,
        }),
      });
      if (res.ok) {
        const { assessment: result } = await res.json();
        setAssessment(result);
      }
    } catch {
      // Silently fail — button stays enabled so user sees the error state
    } finally {
      setAssessmentReady(true);
    }
  }

  async function handleSessionComplete(summary: string, fullReply: string, currentPlan: DebriefPlan, currentMessages: Message[]) {
    setSessionSummary(summary);
    setSessionComplete(true);

    // Append Sage's closing message to the chat — strip the session-complete marker
    const markerIndex = fullReply.indexOf("--- Session Complete ---");
    const displayText =
      markerIndex >= 0
        ? fullReply.slice(0, markerIndex).trim() || "Session complete."
        : fullReply;
    const closingMsg: Message = {
      role: "assistant",
      text: displayText,
      timestamp: new Date().toISOString(),
    };
    const allMessages = [...currentMessages, closingMsg];
    setMessages(allMessages);

    fireAssessment(currentPlan, allMessages, summary); // fire in background — don't block UI
  }

  async function handleSend(text: string) {
    if (!plan || !debriefId || !transcript) return;

    const userMsg: Message = { role: "user", text, timestamp: new Date().toISOString() };
    const next = [...messages, userMsg];
    setMessages(next);
    setIsLoading(true);

    try {
      const apiMessages = next
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.text }));

      const res = await fetch("/api/debrief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, messages: apiMessages, debrief_id: debriefId, transcript }),
      });
      if (!res.ok) throw new Error(`Debrief API error ${res.status}`);
      const data: { reply: string; sessionSummary?: string } = await res.json();

      if (data.sessionSummary !== undefined) {
        // Session complete — auto-fire Stage 3 and show report screen
        await handleSessionComplete(data.sessionSummary, data.reply, plan, next);
      } else {
        const newMsg: Message = { role: "assistant", text: data.reply, timestamp: new Date().toISOString() };
        setMessages((prev) => [...prev, newMsg]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          text: "Something went wrong. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleRevealAssessment() {
    setAssessmentVisible(true);
  }

  function handleDownload() {
    if (!transcript || !debriefId) return;
    const apiMessages = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.text }));
    const text = buildDebriefText(
      transcript,
      apiMessages,
      sessionSummary ?? "",
      assessment ?? undefined
    );
    downloadDebrief(text, debriefId);
  }

  async function handleBack() {
    if (debriefId) {
      await fetch(`/api/debrief/session?id=${debriefId}`, { method: "DELETE" }).catch(() => {});
    }
    localStorage.removeItem(DEBRIEF_PENDING_KEY);
    localStorage.removeItem(DEBRIEF_SESSION_KEY);
    localStorage.removeItem(DEBRIEF_STATE_KEY);
    window.location.href = "/";
  }

  // ── Report Screen ──────────────────────────────────────────────────────────
  if (debriefEnded && transcript) {
    return (
      <div className="flex h-screen flex-col bg-white">
        <header className="shrink-0 flex items-center border-b border-indigo-100 px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-400">
              Debrief Report
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {transcript.scenario_name} · {transcript.personality_name}
            </p>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Left — report cards */}
          <div className="flex w-[65%] flex-col overflow-y-auto">
            <DebriefEndState
              sessionSummary={sessionSummary}
              assessment={assessment}
              assessmentReady={assessmentReady}
              assessmentVisible={assessmentVisible}
              onRevealAssessment={handleRevealAssessment}
              onDownload={handleDownload}
              onBack={handleBack}
            />
          </div>
          {/* Right — original transcript */}
          <div className="flex w-[35%] flex-col overflow-hidden border-l border-indigo-100 bg-slate-50">
            <TranscriptPanel transcript={transcript} />
          </div>
        </div>
      </div>
    );
  }

  // ── Chat Screen (split-screen) ────────────────────────────────────────────
  if (sessionActive && transcript) {
    return (
      <div className="flex h-screen flex-col bg-white">
        {/* Header */}
        <header className="shrink-0 flex items-center justify-between border-b border-indigo-100 px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-400">
              Negotiation Debrief
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {transcript.scenario_name} · {transcript.personality_name}
            </p>
          </div>
          {!sessionComplete && !showEndChoice && (
            <button
              onClick={() => setShowEndChoice(true)}
              className="rounded-md border border-indigo-200 px-3 py-1.5 text-sm text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              End Debrief
            </button>
          )}
        </header>

        {/* Split body */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Left — AI Reflection Panel (65%) */}
          <div className="flex min-h-0 w-[65%] min-w-0 flex-col">
            <ChatWindow
              messages={messages}
              isLoading={isLoading}
              counterpartRole="Sage"
              theme="indigo"
            />
            {showEndChoice ? (
              <div className="shrink-0 border-t border-indigo-100 bg-white px-6 py-5">
                <p className="mb-3 text-sm font-medium text-gray-700">
                  How would you like to end the debrief?
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      if (!plan) return;
                      setSessionComplete(true);
                      setShowEndChoice(false);
                      fireAssessment(plan, messages, sessionSummary ?? "");
                    }}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
                  >
                    View Report
                  </button>
                  <button
                    onClick={handleBack}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    End Session
                  </button>
                  <button
                    onClick={() => setShowEndChoice(false)}
                    className="rounded-md px-4 py-2 text-sm text-gray-400 transition-colors hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : sessionComplete ? (
              <div className="shrink-0 border-t border-indigo-100 bg-white px-6 py-5">
                <button
                  onClick={() => setDebriefEnded(true)}
                  disabled={!assessmentReady}
                  className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
                >
                  {assessmentReady ? "View Debrief Report" : "Preparing Report…"}
                </button>
              </div>
            ) : (
              <MessageInput onSend={handleSend} disabled={isLoading} />
            )}
          </div>

          {/* Right — Transcript Panel (35%) */}
          <div className="flex w-[35%] flex-col overflow-hidden border-l border-indigo-100 bg-slate-50">
            <TranscriptPanel transcript={transcript} />
          </div>
        </div>
      </div>
    );
  }

  // ── Loading Screen ────────────────────────────────────────────────────────
  if (transcript) {
    const userTurnCount = Array.isArray(transcript.messages)
      ? transcript.messages.filter((m) => m.role === "user").length
      : 0;

    return (
      <DebriefLoadingScreen
        scenarioName={transcript.scenario_name}
        personalityName={transcript.personality_name}
        userTurnCount={userTurnCount}
        isLoading={isLoading}
        error={startError}
        onStart={handleStart}
      />
    );
  }

  // ── Upload Screen ─────────────────────────────────────────────────────────
  return (
    <DebriefUpload
      onLoad={(t) => {
        localStorage.setItem(DEBRIEF_PENDING_KEY, JSON.stringify(t));
        setTranscript(t);
      }}
    />
  );
}
