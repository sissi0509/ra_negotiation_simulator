"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TranscriptPanel from "@/components/TranscriptPanel";
import type { Transcript } from "@/lib/transcript";
import { reflectionPrompts as reflectionData } from "@/experiment/content/surveyData";

function ReflectionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const runId = searchParams.get("run_id") ?? "";
  const round = Number(searchParams.get("round") ?? "1");

  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [responses, setResponses] = useState<Record<string, string>>(
    Object.fromEntries(reflectionData.prompts.map((p) => [p.id, ""]))
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!runId) { setLoadError(true); return; }
    fetch("/api/experiment/state")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.steps_done?.s3_debrief) {
          router.replace("/");
        } else if (data?.steps_done?.reflection_complete) {
          router.replace(`/survey?type=s3_debrief&run_id=${runId}`);
        }
      })
      .catch(() => {});

    fetch(`/api/transcripts?run_id=${runId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setTranscript(data))
      .catch(() => setLoadError(true));
  }, [runId]); // eslint-disable-line react-hooks/exhaustive-deps

  const allAnswered = reflectionData.prompts.every((p) => responses[p.id].trim().length > 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allAnswered) {
      setError("Please respond to all prompts before submitting.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/reflection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ run_id: runId, round, responses }),
      });
      if (!res.ok) throw new Error();
      await fetch("/api/experiment/state", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ steps_done: { reflection_complete: true } }),
      }).catch(() => {});
      router.replace(`/survey?type=s3_debrief&run_id=${runId}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="shrink-0 border-b border-gray-200 bg-white px-6 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Round {round} · Written Reflection</p>
        <p className="text-sm font-semibold text-gray-900">{reflectionData.title}</p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — transcript */}
        <div className="flex w-96 shrink-0 flex-col border-r border-gray-200 bg-white overflow-hidden">
          {transcript ? (
            <TranscriptPanel transcript={transcript} />
          ) : loadError ? (
            <div className="flex flex-1 items-center justify-center px-6">
              <p className="text-sm text-red-500">Could not load transcript.</p>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center px-6">
              <p className="text-sm text-gray-400">Loading transcript…</p>
            </div>
          )}
        </div>

        {/* Right panel — prompts */}
        <div className="flex flex-1 flex-col overflow-y-auto px-8 py-8">
          <div className="mb-6">
            <p className="text-sm text-gray-500">{reflectionData.instruction}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-2xl">
            {reflectionData.prompts.map((prompt, i) => (
              <div key={prompt.id} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-800">
                  <span className="mr-2 text-gray-400">{i + 1}.</span>
                  {prompt.question}
                </label>
                <textarea
                  value={responses[prompt.id]}
                  onChange={(e) => setResponses((prev) => ({ ...prev, [prompt.id]: e.target.value }))}
                  rows={4}
                  placeholder={prompt.placeholder}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>
            ))}

            {error && (
              <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting || !allAnswered}
              className="self-start rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? "Submitting…" : reflectionData.cta}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ReflectionPage() {
  return (
    <Suspense>
      <ReflectionForm />
    </Suspense>
  );
}
