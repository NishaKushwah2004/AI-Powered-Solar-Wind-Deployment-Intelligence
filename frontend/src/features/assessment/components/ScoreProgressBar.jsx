import { cn } from "@/utils/cn";

export default function ScoreProgressBar({
  label,
  score,
}) {
  const percentage = Math.max(
    0,
    Math.min(score ?? 0, 100)
  );

  function getColor() {
    if (percentage >= 85) {
      return "bg-emerald-500";
    }

    if (percentage >= 70) {
      return "bg-green-500";
    }

    if (percentage >= 55) {
      return "bg-amber-500";
    }

    return "bg-red-500";
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>

        <span className="text-sm font-semibold">
          {percentage.toFixed(1)}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            getColor()
          )}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}