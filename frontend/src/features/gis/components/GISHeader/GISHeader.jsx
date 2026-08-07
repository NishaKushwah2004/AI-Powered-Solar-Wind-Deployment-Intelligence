import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui";

export default function GISHeader({
  onRefresh,
  loading,
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          GIS Map
        </h1>

        <p className="mt-1 text-slate-500">
          Visualize project sites across the map.
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        loading={loading}
        disabled={loading}
        title="Refresh GIS data"
        aria-label="Refresh GIS data"
        onClick={onRefresh}
      >
        <RefreshCcw size={18} />
        Refresh
      </Button>
    </div>
  );
}