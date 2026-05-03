"use client";

export default function TransitionPage() {
  const REMAINING_STEPS = [
    {
      label: "Your AI assessment",
      detail: "Personalized feedback on your Round 1 negotiation based on how the conversation went.",
    },
    {
      label: "Final survey",
      detail: "A few short questions about your overall experience in this study.",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="flex w-full max-w-md flex-col gap-8 rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm">

        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Almost done
          </p>
          <h1 className="text-xl font-semibold text-gray-900">
            Two more steps
          </h1>
          <p className="text-sm text-gray-500">
            You have completed both negotiation rounds. Here is what is left.
          </p>
        </div>

        {/* Remaining step cards */}
        <div className="flex flex-col gap-3">
          {REMAINING_STEPS.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-lg border border-gray-100 bg-gray-50 px-5 py-4"
            >
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

        <button
          onClick={() => window.location.replace("/assessment")}
          className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          See my assessment →
        </button>
      </div>
    </div>
  );
}
