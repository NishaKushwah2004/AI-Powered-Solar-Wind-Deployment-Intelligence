import MetricCard from "./MetricCard";

export default function ResourceMetricsGrid({
  metrics,
}) {
  if (!metrics) return null;

  return (
    <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-3">
      <MetricCard
        title="Solar Score"
        value={metrics.solar_score}
      />

      <MetricCard
        title="Wind Score"
        value={metrics.wind_score}
      />

      <MetricCard
        title="Renewable Resource"
        value={
          metrics.renewable_resource_score
        }
      />

      <MetricCard
        title="Geographic"
        value={
          metrics.geographic_score
        }
      />

      <MetricCard
        title="Infrastructure"
        value={
          metrics.infrastructure_score
        }
      />

      <MetricCard
        title="Environmental"
        value={
          metrics.environmental_score
        }
      />

      <MetricCard
        title="Economic"
        value={
          metrics.economic_score
        }
      />

      <MetricCard
        title="Overall"
        value={
          metrics.overall_score
        }
      />

      <MetricCard
        title="Confidence"
        value={`${Math.round(
          metrics.confidence_score * 100
        )}%`}
      />
    </div>
  );
}