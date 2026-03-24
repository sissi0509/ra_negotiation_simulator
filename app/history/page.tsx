"use client";

import { useEffect, useRef, useState } from "react";
import UserMenu from "@/components/UserMenu";

interface TranscriptSummary {
  run_id: string;
  scenario_name: string;
  personality_name: string;
  started_at: string;
  messages: { role: string }[];
  has_debrief: boolean;
}

interface Message {
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

interface DebriefMessage {
  role: "user" | "assistant";
  content: string;
}

interface Debrief {
  debrief_summary: string;
  assessment?: string;
  ended_by: string;
  messages?: DebriefMessage[];
}

interface DetailData {
  transcript: { scenario_name: string; personality_name: string; messages: Message[] };
  debrief: Debrief | null;
}

function DetailView({ meta, detail, detailLoading, onBack, formatDate }: {
  meta?: TranscriptSummary;
  detail: DetailData | null;
  detailLoading: boolean;
  onBack: () => void;
  formatDate: (s: string) => string;
}) {
  const [leftPct, setLeftPct] = useState(30);
  const [topPct, setTopPct] = useState(50);
  const [showDebriefConvo, setShowDebriefConvo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  function startDragH(e: React.MouseEvent) {
    e.preventDefault();
    const onMove = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setLeftPct(Math.min(Math.max(pct, 15), 70));
    };
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function startDragV(e: React.MouseEvent) {
    e.preventDefault();
    const onMove = (ev: MouseEvent) => {
      if (!rightRef.current) return;
      const rect = rightRef.current.getBoundingClientRect();
      const pct = ((ev.clientY - rect.top) / rect.height) * 100;
      setTopPct(Math.min(Math.max(pct, 15), 85));
    };
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  return (
    <div className="flex h-screen flex-col bg-white">
      <header className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            ← Back
          </button>
          {meta && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {meta.scenario_name} · {meta.personality_name}
              </p>
              <p className="text-sm font-semibold text-gray-900">{formatDate(meta.started_at)}</p>
            </div>
          )}
        </div>
        <UserMenu stage="negotiate" />
      </header>

      {detailLoading ? (
        <div className="flex flex-1 items-center justify-center text-sm text-gray-400">Loading…</div>
      ) : detail ? (
        <div ref={containerRef} className="flex min-h-0 flex-1 overflow-hidden select-none">

          {/* Left — negotiation conversation */}
          <div className="flex flex-col overflow-hidden" style={{ width: `${leftPct}%` }}>
            <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Negotiation</p>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto px-5 py-4">
              {detail.transcript.messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical drag handle */}
          <div
            onMouseDown={startDragH}
            className="w-1 cursor-col-resize bg-gray-100 hover:bg-indigo-200 transition-colors shrink-0"
          />

          {/* Right — debrief summary + assessment */}
          <div ref={rightRef} className="flex flex-col overflow-hidden flex-1">

            {!detail.debrief ? (
              /* No debrief yet — prompt to start one */
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <p className="text-sm font-medium text-gray-700">This negotiation hasn't been debriefed yet.</p>
                <p className="text-xs text-gray-400">Debrief with Sage to get feedback and an AI assessment.</p>
                <button
                  onClick={() => {
                    localStorage.setItem("debrief_pending", JSON.stringify(detail.transcript));
                    window.location.href = "/debrief";
                  }}
                  className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
                >
                  Start Debrief
                </button>
              </div>
            ) : (
              <>
                {/* Upper — debrief summary */}
                <div className="flex flex-col overflow-hidden" style={{ height: `${topPct}%` }}>
                  <div className="sticky top-0 z-10 border-b border-gray-100 bg-indigo-50 px-5 py-3 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">Debrief Summary</p>
                    {detail.debrief.messages?.length ? (
                      <button
                        onClick={() => setShowDebriefConvo((v) => !v)}
                        className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors"
                      >
                        {showDebriefConvo ? "Hide conversation" : "Show conversation"}
                      </button>
                    ) : null}
                  </div>
                  <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4">
                    {detail.debrief.debrief_summary ? (
                      <ul className="flex flex-col gap-2">
                        {detail.debrief.debrief_summary.split("\n").filter((l) => l.trim()).map((line, i) => (
                          <li key={i} className="text-sm leading-relaxed text-gray-800">{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400">No summary available.</p>
                    )}
                    {showDebriefConvo && detail.debrief.messages?.length ? (
                      <div className="flex flex-col gap-3 border-t border-indigo-100 pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">Debrief Conversation</p>
                        {detail.debrief.messages.map((m, i) => (
                          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                              m.role === "user" ? "bg-indigo-600 text-white" : "bg-indigo-50 text-gray-800"
                            }`}>
                              {m.content.replace(/\[BREAK\]/g, "").trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Horizontal drag handle */}
                <div
                  onMouseDown={startDragV}
                  className="h-1 cursor-row-resize bg-gray-100 hover:bg-indigo-200 transition-colors shrink-0"
                />

                {/* Lower — AI assessment */}
                <div className="flex flex-col overflow-hidden flex-1">
                  <div className="sticky top-0 z-10 border-b border-gray-100 bg-emerald-50 px-5 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">AI Assessment</p>
                  </div>
                  <div className="overflow-y-auto px-5 py-4">
                    {detail.debrief.assessment ? (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                        {detail.debrief.assessment}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">No assessment available.</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      ) : null}
    </div>
  );
}

export default function HistoryPage() {
  const [list, setList] = useState<TranscriptSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<DetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((data) => setList(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  async function handleSelect(run_id: string) {
    setSelectedId(run_id);
    setDetail(null);
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/history/${run_id}`);
      const data = await res.json();
      setDetail(data);
    } finally {
      setDetailLoading(false);
    }
  }

  function handleBack() {
    setSelectedId(null);
    setDetail(null);
  }

  async function handleDelete(run_id: string) {
    setDeleting(true);
    try {
      await fetch(`/api/history/${run_id}`, { method: "DELETE" });
      setList((prev) => prev.filter((t) => t.run_id !== run_id));
    } finally {
      setDeleting(false);
      setConfirmDeleteId(null);
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function userTurns(messages: { role: string }[]) {
    return messages?.filter((m) => m.role === "user").length ?? 0;
  }

  // ── Detail view ────────────────────────────────────────────────────────────
  if (selectedId) {
    const meta = list.find((t) => t.run_id === selectedId);
    return (
      <DetailView
        meta={meta}
        detail={detail}
        detailLoading={detailLoading}
        onBack={handleBack}
        formatDate={formatDate}
      />
    );
  }

  // ── List view ──────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">History</h1>
          <p className="text-xs text-gray-400">Your past negotiation sessions</p>
        </div>
        <UserMenu stage="negotiate" />
      </header>

      <div className="mx-auto w-full max-w-2xl px-6 py-8">
        {loading ? (
          <p className="text-center text-sm text-gray-400">Loading…</p>
        ) : list.length === 0 ? (
          <p className="text-center text-sm text-gray-400">No sessions yet. Go negotiate something!</p>
        ) : (
          <>
          <div className="flex flex-col gap-3">
            {list.map((t) => (
              <div
                key={t.run_id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 transition-colors hover:border-gray-300 hover:bg-gray-50"
              >
                <button
                  onClick={() => handleSelect(t.run_id)}
                  className="flex flex-1 items-center justify-between text-left gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.scenario_name || t.scenario_id?.replace(/_/g, " ")}</p>
                    <p className="text-xs text-gray-400">{t.personality_name || t.personality_id} · {formatDate(t.started_at)}</p>
                  </div>
                  {t.has_debrief ? (
                    <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                      Debriefed
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-400">
                      Not debriefed
                    </span>
                  )}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(t.run_id); }}
                  className="ml-4 shrink-0 text-gray-300 transition-colors hover:text-red-400"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Confirmation dialog */}
          {confirmDeleteId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white px-8 py-6 shadow-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Delete this session?</p>
                  <p className="mt-1 text-xs text-gray-400">This will permanently delete the negotiation transcript and all debrief data. This cannot be undone.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    disabled={deleting}
                    className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(confirmDeleteId)}
                    disabled={deleting}
                    className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:opacity-50"
                  >
                    {deleting ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}
          </>
        )}
      </div>
    </div>
  );
}
