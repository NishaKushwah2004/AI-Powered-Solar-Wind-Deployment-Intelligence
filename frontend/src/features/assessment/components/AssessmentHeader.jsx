import {
  Download,
  FileSpreadsheet,
  RefreshCcw,
} from "lucide-react";

import { Button } from "@/components/ui";

export default function AssessmentHeader({
  loading,
  onRefresh,
}) {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Resource Assessment Report
        </h1>

        <p className="mt-2 text-slate-500">
          Comprehensive renewable energy
          feasibility analysis for the
          selected site.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          loading={loading}
          onClick={onRefresh}
        >
          <RefreshCcw size={18} />
          Refresh
        </Button>

        <Button
          variant="outline"
          disabled
        >
          <Download size={18} />
          Export PDF
        </Button>

        <Button
          variant="outline"
          disabled
        >
          <FileSpreadsheet size={18} />
          Export Excel
        </Button>
      </div>
    </div>
  );
}