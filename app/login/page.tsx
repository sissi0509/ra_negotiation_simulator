"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { isExperiment } from "@/lib/appMode";

function LoginCard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");
  const registered = searchParams.get("registered");

  const [tab, setTab] = useState<"email" | "google">("email");
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (result?.error) {
        setFormError("Incorrect email or password.");
      } else {
        router.replace("/");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
        <h1 className="text-center text-xl font-semibold text-gray-900">
          Negotiation Simulator
        </h1>

        {registered && (
          <p className="rounded-md bg-green-50 px-4 py-3 text-center text-sm text-green-700">
            Account created! Sign in below.
          </p>
        )}
        {error === "AccessDenied" && (
          <p className="rounded-md bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            You don&apos;t have access yet. Contact the researcher.
          </p>
        )}
        {error && error !== "AccessDenied" && (
          <p className="rounded-md bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            Sign-in failed. Please try again or contact the researcher.
          </p>
        )}

        {/* Tab switcher — hidden in experiment mode */}
        {!isExperiment && (
          <div className="flex rounded-lg border border-gray-200 p-1 text-sm">
            <button
              onClick={() => setTab("email")}
              className={`flex-1 rounded-md py-1.5 font-medium transition-colors ${
                tab === "email"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setTab("google")}
              className={`flex-1 rounded-md py-1.5 font-medium transition-colors ${
                tab === "google"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Google
            </button>
          </div>
        )}

        {tab === "email" || isExperiment ? (
          <>
            {formError && (
              <p className="rounded-md bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                {formError}
              </p>
            )}
            <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Your password"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>
            </form>
            {!isExperiment && (
              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-medium text-indigo-600 hover:underline">
                  Create one
                </Link>
              </p>
            )}
          </>
        ) : (
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginCard />
    </Suspense>
  );
}
