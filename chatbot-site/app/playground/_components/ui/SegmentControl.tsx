export function SegmentControl<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { label: string; value: T }[];
}) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-white/10 w-full">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="flex-1 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer"
          style={{
            background:
              value === opt.value
                ? "rgba(0,229,160,0.12)"
                : "rgba(255,255,255,0.03)",
            color: value === opt.value ? "#00e5a0" : "#6b7280",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
