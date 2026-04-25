"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { gtyIntro } from "@/experiment/content/surveyData";

export default function GtyIntroPage() {
  const router = useRouter();
  const [continuing, setContinuing] = useState(false);

  useEffect(() => {
    fetch("/api/experiment/state")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data?.steps_done?.gty_intro) router.replace("/"); })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleContinue() {
    setContinuing(true);
    await fetch("/api/experiment/state", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ steps_done: { gty_intro: true } }),
    }).catch(() => {});
    router.replace("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        <div className="mb-6 flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {gtyIntro.title}
          </p>
          <p className="text-sm text-gray-500">{gtyIntro.subtitle}</p>
        </div>

        <p className="mb-6 text-sm text-gray-600">{gtyIntro.body}</p>

        <div className="flex flex-col gap-4 mb-8">
          {gtyIntro.principles.map((p) => (
            <div key={p.number} className="flex gap-4 rounded-lg border border-gray-100 bg-gray-50 px-5 py-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                {p.number}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">{p.title}</p>
                <p className="mt-0.5 text-sm text-gray-500">{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={continuing}
          className="w-full rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
        >
          {continuing ? "Continuing…" : gtyIntro.cta}
        </button>
      </div>
    </div>
  );
}
