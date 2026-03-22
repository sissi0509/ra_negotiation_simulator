interface Scenario {
  id: string;
  name: string;
  description: string;
  counterpart_role: string;
}

interface Personality {
  id: string;
  name: string;
  description: string;
}

interface Props {
  scenario: Scenario;
  personality: Personality;
  onBegin: () => void;
}

export default function SceneModal({ scenario, personality, onBegin }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-xl bg-white px-8 py-8 shadow-lg">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Scenario
          </p>
          <h2 className="text-lg font-semibold text-gray-900">{scenario.name}</h2>
          <p className="text-sm leading-relaxed text-gray-600">{scenario.description}</p>
        </div>

        <div className="rounded-md bg-gray-50 px-4 py-3">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Counterpart:</span>{" "}
            {personality.name} {scenario.counterpart_role}
          </p>
        </div>

        <p className="text-xs text-gray-400 text-center">
          Tip: have at least a few exchanges before ending — short conversations can&apos;t be debriefed.
        </p>

        <button
          onClick={onBegin}
          className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Begin Negotiation
        </button>
      </div>
    </div>
  );
}
