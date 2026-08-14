import {
  ConfidenceCard,
  ExecutiveSummary,
  RecommendationCard,
} from "../components";

import {
  OverallScoreChart,
} from "../charts";

export default function ExecutiveSummarySection({
  report,
}) {
  if (!report) return null;

  return (
    <section className="space-y-6">
      <ExecutiveSummary
        report={report}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <OverallScoreChart
          score={
            report.resource_metrics
              ?.overall_score ?? 0
          }
        />

        <ConfidenceCard
          confidence={
            report.resource_metrics
              ?.confidence_score ?? 0
          }
        />

        <RecommendationCard
          recommendation={
            report.recommendation
          }
          metrics={
            report.resource_metrics
          }
        />
      </div>
    </section>
  );
}