import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui";

export default function PredictionHeader({
  loading,
  onRefresh,
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Renewable Energy Prediction
        </h1>

        <p className="mt-1 text-slate-500">
          Predict solar, wind and hybrid renewable
          energy potential for the selected site.
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