import { CheckCircle2, Clock3 } from "lucide-react";

export default function ModuleCard({
  title,
  available,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6">

      <div className="mb-5 flex items-center justify-between">

        <h3 className="font-semibold">

          {title}

        </h3>

        {available ? (
          <CheckCircle2
            className="text-green-600"
          />
        ) : (
          <Clock3
            className="text-amber-500"
          />
        )}

      </div>

      <span
        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
          available
            ? "bg-green-100 text-green-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {available
          ? "Available"
          : "Coming Soon"}
      </span>

    </div>
  );
}