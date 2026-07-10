import { MapPinned } from "lucide-react";

export default function EmptySites() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed py-20">

      <MapPinned
        size={60}
        className="text-slate-400"
      />

      <h2 className="mt-5 text-xl font-semibold">
        No Sites Found
      </h2>

      <p className="mt-2 text-slate-500">
        Add your first site to begin.
      </p>

    </div>
  );
}