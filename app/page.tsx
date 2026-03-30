"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import ScenarioSelector from "@/components/ScenarioSelector";
import PersonalitySelector from "@/components/PersonalitySelector";
import SceneModal from "@/components/SceneModal";
import ChatWindow, { Message } from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import EndStatePrompt from "@/components/EndStatePrompt";
import ExportModal from "@/components/ExportModal";
import ActionBar from "@/components/ActionBar";
import scenarios from "@/content/scenarios.json";
import personalities from "@/content/personalities.json";
import { isUserSigningOff } from "@/lib/endDetection";
import { buildTranscript } from "@/lib/transcript";
import { DEBRIEF_PENDING_KEY, DEBRIEF_SESSION_KEY as DEBRIEF_SESSION_KEY_CONST } from "@/app/debrief/page";
import { isExperiment, currentRoundAssignment, nextSurveyDue } from "@/lib/appMode";
import type { ExperimentUser, ExperimentCondition } from "@/lib/appMode";

const SESSION_KEY = "negotiation_session_id";

// ── Condition-specific step lists ─────────────────────────────────────────────
const CONDITION_STEPS: Record<ExperimentCondition, { label: string; detail: string }[]> = {
  ai_debrief: [
    { label: "Complete a short survey", detail: "A few quick questions about your negotiation background." },
    { label: "Negotiate (Round 1)", detail: "A text conversation with an AI counterpart in an assigned scenario." },
    { label: "Reflect with an AI coach", detail: "Sage, an AI coach, will guide you through key moments from your negotiation." },
    { label: "Receive your assessment", detail: "A structured report on your strengths and areas to improve." },
    { label: "Negotiate (Round 2)", detail: "A second scenario to apply what you learned." },
    { label: "Complete a final survey", detail: "A few closing questions before you finish." },
  ],
  static_reflection: [
    { label: "Complete a short survey", detail: "A few quick questions about your negotiation background." },
    { label: "Negotiate (Round 1)", detail: "A text conversation with an AI counterpart in an assigned scenario." },
    { label: "Review and reflect", detail: "Read your transcript and write a short reflection on your approach." },
    { label: "Negotiate (Round 2)", detail: "A second scenario." },
    { label: "Complete a final survey", detail: "A few closing questions before you finish." },
  ],
  control: [
    { label: "Complete a short survey", detail: "A few quick questions about your negotiation background." },
    { label: "Negotiate (Round 1)", detail: "A text conversation with an AI counterpart in an assigned scenario." },
    { label: "Negotiate (Round 2)", detail: "A second scenario." },
    { label: "Complete a final survey", detail: "A few closing questions before you finish." },
  ],
};

function ExperimentIntroScreen({
  experimentState,
  onBegin,
}: {
  experimentState: ExperimentUser;
  onBegin: () => void;
}) {
  const [consented, setConsented] = useState(false);
  const steps = CONDITION_STEPS[experimentState.condition];
  // If they already consented in a previous session, skip the checkbox.
  const alreadyConsented = experimentState.consent_given;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="flex w-full max-w-lg flex-col gap-8 rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Research Study</p>
          <h1 className="text-xl font-semibold text-gray-900">Welcome, {experimentState.name?.split(" ")[0] ?? "Participant"}</h1>
          <p className="text-sm text-gray-500">
            Here&apos;s what you&apos;ll do. Please read carefully before continuing.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 rounded-lg border border-gray-100 bg-gray-50 px-5 py-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">{step.label}</p>
                <p className="mt-0.5 text-sm text-gray-500">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {!alreadyConsented && (
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">
              I understand the study procedure and agree to participate. I know I can stop at any time by contacting the researcher.
            </span>
          </label>
        )}

        <button
          onClick={onBegin}
          disabled={!alreadyConsented && !consented}
          className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          I understand — let&apos;s begin
        </button>
      </div>
    </div>
  );
}

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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  // True while we check localStorage / fetch the session — prevents the Setup
  // Screen from flashing before we know whether to show the Chat Screen instead.
  const [isInitializing, setIsInitializing] = useState(true);
  // Show intro on first visit only. Tracked via localStorage for now;
  // will be replaced with MongoDB users.onboarded flag once login is wired up.
  const [showIntro, setShowIntro] = useState(false);
  // Experiment mode: user's assigned scenario/personality and progress flags.
  const [experimentState, setExperimentState] = useState<ExperimentUser | null>(null);
  // Experiment mode: show group-specific instructions after login, before setup.
  const [showExperimentIntro, setShowExperimentIntro] = useState(isExperiment);

  const { status: authStatus } = useSession();

  const canStart = selectedScenario !== "" && selectedPersonality !== "";
  const scenario = scenarios.find((s) => s.id === selectedScenario);
  const personality = personalities.find((p) => p.id === selectedPersonality);

  // On mount: restore session from server if we have a saved session ID
  useEffect(() => {
    // Show intro on first visit — skip if already onboarded
    if (!localStorage.getItem("intro_seen")) {
      setShowIntro(true);
    }

    // In experiment mode, fetch the participant's state and use the current round's assignment.
    if (isExperiment) {
      fetch("/api/experiment/state")
        .then((res) => (res.ok ? res.json() : null))
        .then((data: ExperimentUser | null) => {
          if (data) {
            setExperimentState(data);
            const assignment = currentRoundAssignment(data);
            if (assignment) {
              setSelectedScenario(assignment.scenario);
              setSelectedPersonality(assignment.personality);
            }
          }
        })
        .catch(() => {});
    }

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
      startedAt,
      sessionId ?? undefined
    );
    fetch("/api/transcripts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transcript),
    }).catch(() => {}); // silent failure — not critical for the user experience
  }, [conversationEnded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isInitializing || authStatus === "loading") return null;

  function handleGetStarted() {
    localStorage.setItem("intro_seen", "true");
    setShowIntro(false);
  }

  // ── Welcome Screen (unauthenticated or first visit) ───────────────────────
  if (authStatus === "unauthenticated" || showIntro) {
    // Experiment mode: minimal sign-in screen — no process steps shown to unauthenticated users.
    if (isExperiment) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="flex w-full max-w-sm flex-col gap-6 rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm text-center">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Research Study</p>
              <h1 className="text-xl font-semibold text-gray-900">Negotiation Study</h1>
              <p className="text-sm text-gray-500">Use the email and password provided by the researcher to sign in.</p>
            </div>
            <Link
              href="/login"
              className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      );
    }

    // Product mode: full welcome screen with process overview.
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 px-4">
        {authStatus === "authenticated" && (
          <div className="flex justify-end px-2 py-4">
            <UserMenu stage="negotiate" />
          </div>
        )}
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="flex w-full max-w-lg flex-col gap-8 rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
          <div className="flex flex-col gap-2">
            <p className="text-center text-xs font-medium uppercase tracking-wide text-gray-400">
              Welcome
            </p>
            <h1 className="text-center text-xl font-semibold text-gray-900">
              Negotiation Simulator
            </h1>
            <p className="text-center text-sm leading-relaxed text-gray-500">
              This tool helps you practice negotiation and reflect on your performance. Here&apos;s what you&apos;ll do:
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-4 rounded-lg border border-gray-100 bg-gray-50 px-5 py-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">1</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Practice Negotiation</p>
                <p className="mt-0.5 text-sm text-gray-500">
                  Choose a scenario and personality, then negotiate with an AI counterpart in a realistic conversation.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-gray-100 bg-gray-50 px-5 py-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">2</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Debrief with Sage</p>
                <p className="mt-0.5 text-sm text-gray-500">
                  Reflect on your conversation with Sage, an AI coach who will guide you through key moments in your negotiation.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-gray-100 bg-gray-50 px-5 py-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">3</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Receive Your Assessment</p>
                <p className="mt-0.5 text-sm text-gray-500">
                  Get a structured report on your strengths, areas for improvement, and concrete next steps.
                </p>
              </div>
            </div>
          </div>

          {authStatus === "unauthenticated" ? (
            <Link
              href="/login"
              className="flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Sign in
            </Link>
          ) : (
            <button
              onClick={handleGetStarted}
              className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
      {authStatus === "authenticated" && (
        <p className="text-center text-xs text-gray-400">
          Use the avatar button in the top-right corner to access History, return here, or sign out.
        </p>
      )}
      </div>
    );
  }

  // ── Experiment Intro Screen (authenticated, experiment mode, before setup) ─
  if (isExperiment && showExperimentIntro) {
    // Wait until we have the participant's state to show the right instructions.
    if (!experimentState) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <p className="text-sm text-gray-400">Loading your study information…</p>
        </div>
      );
    }

    return <ExperimentIntroScreen
      experimentState={experimentState}
      onBegin={() => {
        // Mark started_at and consent_given on first begin.
        const patch: Record<string, unknown> = { consent_given: true };
        if (!experimentState.started_at) patch.started_at = new Date().toISOString();
        fetch("/api/experiment/state", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        }).catch(() => {});
        setExperimentState((prev) => prev ? { ...prev, consent_given: true } : prev);
        setShowExperimentIntro(false);
      }}
    />;
  }

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
      if (forceEnd) setConversationEnded(true);
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
      startedAt,
      sessionId ?? undefined
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

  function handleUploadTranscript(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        if (!Array.isArray(json.messages) || !json.scenario_name || !json.personality_name || !json.started_at) {
          setUploadError("This doesn't look like a valid transcript. Please export one from the simulator.");
          return;
        }
        localStorage.removeItem(DEBRIEF_SESSION_KEY_CONST);
        localStorage.setItem(DEBRIEF_PENDING_KEY, JSON.stringify(json));
        window.location.href = "/debrief";
      } catch {
        setUploadError("This doesn't look like a valid transcript. Please export one from the simulator.");
      }
    };
    reader.readAsText(file);
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
          <UserMenu stage="negotiate" />
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
          <EndStatePrompt onStartNew={handleReset} onExport={handleExport} onDebrief={handleDebrief} userTurns={messages.filter((m) => m.role === "user").length} debriefRequired={isExperiment} />
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
              startedAt,
              sessionId ?? undefined
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex justify-end px-6 py-4">
        <UserMenu stage="negotiate" />
      </div>
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        <h1 className="text-center text-xl font-semibold text-gray-900">
          Negotiation Simulator
        </h1>

        {isExperiment ? (
          // ── Experiment mode: show assigned round info, no picker ──────────
          experimentState ? (() => {
            const due = nextSurveyDue(experimentState);
            const assignment = currentRoundAssignment(experimentState);
            // Pre-survey must be completed before negotiating.
            const needsPreSurvey = due === "pre";
            return (
              <div className="flex flex-col gap-3">
                {needsPreSurvey && (
                  <div className="rounded-md bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                    <p className="font-medium">Before you start</p>
                    <p className="mt-0.5">Please complete the pre-study survey first.</p>
                    <Link href="/survey?type=pre" className="mt-2 block font-medium text-amber-900 underline">
                      Go to Survey →
                    </Link>
                  </div>
                )}
                <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  <p className="font-medium text-gray-900">Round {experimentState.current_round}</p>
                  <p className="mt-1">{scenario?.name ?? assignment?.scenario}</p>
                  <p className="text-gray-500">{personality?.name ?? assignment?.personality} counterpart</p>
                </div>
              </div>
            );
          })() : (
            <p className="text-center text-sm text-gray-400">Loading your assignment…</p>
          )
        ) : (
          // ── Product mode: user picks scenario/personality ────────────────
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
        )}

        <button
          onClick={handleStart}
          disabled={!canStart || (isExperiment && nextSurveyDue(experimentState!) === "pre")}
          className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        >
          Start
        </button>
      </div>

      {/* Upload card — product mode only */}
      {!isExperiment && (
        <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-gray-100 bg-white px-8 py-6 shadow-sm">
          <p className="text-center text-sm text-gray-500">
            Already have a transcript?
          </p>
          <button
            onClick={() => uploadRef.current?.click()}
            className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Upload to debrief
          </button>
          <input
            ref={uploadRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleUploadTranscript}
          />
          {uploadError && (
            <p className="text-center text-xs text-red-500">{uploadError}</p>
          )}
        </div>
      )}

      {showModal && scenario && personality && (
        <SceneModal
          scenario={scenario}
          personality={personality}
          onBegin={handleBegin}
          onBack={() => setShowModal(false)}
        />
      )}
    </div>
    </div>
  );
}
