import personalities from "@/content/personalities.json";

interface Props {
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}

export default function PersonalitySelector({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Counterpart Personality
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
      >
        <option value="">Select a personality…</option>
        {personalities.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
