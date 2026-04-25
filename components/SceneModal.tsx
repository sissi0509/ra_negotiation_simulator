import { isExperiment } from "@/lib/appMode";
import { SCENE_MODAL_TIP } from "@/content/uiStrings";

interface Scenario {
  id: string;
  name: string;
  description: string;
  counterpart_role: string;
  backstory?: string;
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
  onBack: () => void;
}

// Split backstory on blank lines and bold any "Label (...):" prefix at the start of a paragraph.
function BackstoryBlock({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="flex flex-col gap-2">
      {paragraphs.map((para, i) => {
        // Match "Some label (optional note):" at the start of the paragraph
        const labelMatch = para.match(/^([^:]+:\s*)/);
        if (labelMatch && i > 0) {
          const label = labelMatch[1];
          const rest = para.slice(label.length);
          return (
            <p key={i} className="text-sm leading-relaxed text-blue-900">
              <span className="font-semibold">{label}</span>{rest}
            </p>
          );
        }
        return (
          <p key={i} className="text-sm leading-relaxed text-blue-900">
            {para}
          </p>
        );
      })}
    </div>
  );
}

export default function SceneModal({ scenario, personality, onBegin, onBack }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="flex w-full max-w-md flex-col rounded-xl bg-white shadow-lg max-h-full overflow-hidden">

        {/* Scrollable content */}
        <div className="flex flex-col gap-6 overflow-y-auto px-8 py-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Scenario
            </p>
            <h2 className="text-lg font-semibold text-gray-900">{scenario.name}</h2>
            {!isExperiment && (
              <p className="text-sm leading-relaxed text-gray-600">{scenario.description}</p>
            )}
          </div>

          {scenario.backstory && (
            <div className="rounded-md border border-blue-100 bg-blue-50 px-4 py-3 flex flex-col gap-1">
              <p className="text-xs font-medium uppercase tracking-wide text-blue-400 mb-1">Your Situation</p>
              <BackstoryBlock text={scenario.backstory} />
            </div>
          )}

          <div className="rounded-md bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Counterpart:</span>{" "}
              {personality.name} {scenario.counterpart_role}
            </p>
          </div>

          <p className="text-sm text-gray-700">
            {SCENE_MODAL_TIP}
          </p>
        </div>

        {/* Buttons always visible at bottom */}
        <div className="flex gap-3 px-8 pb-8 pt-2 border-t border-gray-100">
          {!isExperiment && (
            <button
              onClick={onBack}
              className="flex-1 rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Go Back
            </button>
          )}
          <button
            onClick={onBegin}
            className="flex-1 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Begin Negotiation
          </button>
        </div>

      </div>
    </div>
  );
}
