import {
  FolderKanban,
  MapPinned,
  Leaf,
  BarChart3,
} from "lucide-react";

import KPICard from "./KPICard";

export default function KPIGrid({
  summary,
}) {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <KPICard
        title="Projects"
        value={summary?.total_projects ?? 0}
        icon={FolderKanban}
      />

      <KPICard
        title="Sites"
        value={summary?.total_sites ?? 0}
        icon={MapPinned}
      />

      <KPICard
        title="Assessment Score"
        value={
          summary?.average_assessment_score ??
          "--"
        }
        icon={BarChart3}
      />

      <KPICard
        title="Prediction Confidence"
        value={
          summary?.average_prediction_confidence ??
          "--"
        }
        icon={Leaf}
      />
    </div>
  );
}