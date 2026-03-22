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

interface Debrief {
  debrief_summary: string;
  assessment?: string;
  ended_by: string;
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
                  <div className="sticky top-0 z-10 border-b border-gray-100 bg-indigo-50 px-5 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">Debrief Summary</p>
                  </div>
                  <div className="overflow-y-auto px-5 py-4">
                    {detail.debrief.debrief_summary ? (
                      <ul className="flex flex-col gap-2">
                        {detail.debrief.debrief_summary.split("\n").filter((l) => l.trim()).map((line, i) => (
                          <li key={i} className="text-sm leading-relaxed text-gray-800">{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400">No summary available.</p>
                    )}
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
          <div className="flex flex-col gap-3">
            {list.map((t) => (
              <button
                key={t.run_id}
                onClick={() => handleSelect(t.run_id)}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 text-left transition-colors hover:border-gray-300 hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.scenario_name}</p>
                  <p className="text-xs text-gray-400">{t.personality_name} · {formatDate(t.started_at)}</p>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
