export function ControlLabel({
  label,
  hint,
}: {
  label: string;
  hint?: string;
}) {
  return (
    <div className="mb-1.5">
      <span className="text-xs font-medium text-gray-300">{label}</span>
      {hint && <span className="text-[10px] text-gray-600 ml-2">{hint}</span>}
    </div>
  );
}
