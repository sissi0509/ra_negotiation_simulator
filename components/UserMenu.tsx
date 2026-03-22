"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

type Stage = "negotiate" | "debrief" | "report";

const STAGES: { key: Stage; label: string }[] = [
  { key: "negotiate", label: "Negotiate" },
  { key: "debrief", label: "Debrief" },
  { key: "report", label: "Report" },
];

interface Props {
  stage: Stage;
}

export default function UserMenu({ stage }: Props) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [confirmingSignOut, setConfirmingSignOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const email = session?.user?.email ?? "";
  const name = session?.user?.name ?? email;
  const initial = (name[0] ?? "?").toUpperCase();

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setConfirmingSignOut(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white transition-colors hover:bg-gray-700"
      >
        {initial}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-gray-200 bg-white shadow-lg">
          {/* User info */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
            {name !== email && (
              <p className="text-xs text-gray-400 truncate">{email}</p>
            )}
          </div>

          {/* Stage indicator */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
              Progress
            </p>
            <div className="flex items-center gap-1">
              {STAGES.map((s, i) => {
                const stageIndex = STAGES.findIndex((x) => x.key === stage);
                const isDone = i < stageIndex;
                const isCurrent = i === stageIndex;
                return (
                  <div key={s.key} className="flex items-center gap-1">
                    <span
                      className={`text-xs font-medium ${
                        isCurrent
                          ? "text-gray-900"
                          : isDone
                          ? "text-gray-400 line-through"
                          : "text-gray-300"
                      }`}
                    >
                      {s.label}
                    </span>
                    {i < STAGES.length - 1 && (
                      <span className="text-gray-300">›</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="border-b border-gray-100 px-4 py-2 flex flex-col gap-0.5">
            <a
              href="/"
              className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
              onClick={() => { localStorage.removeItem("negotiation_session_id"); localStorage.setItem("intro_seen", "true"); setOpen(false); }}
            >
              Simulator
            </a>
            <a
              href="/history"
              className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              History
            </a>
            <a
              href="/"
              className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
              onClick={() => { localStorage.removeItem("intro_seen"); localStorage.removeItem("negotiation_session_id"); setOpen(false); }}
            >
              Welcome
            </a>
          </div>

          {/* Sign out */}
          <div className="px-4 py-2">
            {confirmingSignOut ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-500">Your current progress will not be saved. Are you sure?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex-1 rounded-md bg-red-500 px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600"
                  >
                    Sign out
                  </button>
                  <button
                    onClick={() => setConfirmingSignOut(false)}
                    className="flex-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmingSignOut(true)}
                className="w-full rounded-md px-2 py-1.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
