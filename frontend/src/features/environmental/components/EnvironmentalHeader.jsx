import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui";

export default function EnvironmentalHeader({
  loading,
  onRefresh,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Environmental Intelligence
        </h1>

        <p className="mt-2 text-slate-500">
          Analyze environmental and geographic conditions for renewable energy deployment.
        </p>
      </div>

      <Button
        variant="outline"
        loading={loading}
        icon={<RefreshCcw size={18} />}
        onClick={onRefresh}
      >
        Refresh
      </Button>
    </div>
  );
}