import {
  RecommendationCard,
  ResourceMetricsGrid,
} from "../components";

export default function RecommendationSection({
  report,
}) {
  if (!report) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Final Recommendation
        </h2>

        <p className="mt-2 text-slate-500">
          Final deployment recommendation
          generated using renewable resource,
          environmental, geographic and
          infrastructure analysis.
        </p>
      </div>

      <RecommendationCard
        recommendation={
          report.recommendation
        }
        metrics={
          report.resource_metrics
        }
      />

      <ResourceMetricsGrid
        metrics={
          report.resource_metrics
        }
      />
    </section>
  );
}