import MetricCard from "@/features/assessment/components/MetricCard";

export default function PredictionMetricsGrid({
  prediction,
}) {
  if (!prediction) return null;

  const solar =
    prediction.solar_prediction;

  const wind =
    prediction.wind_prediction;

  const hybrid =
    prediction.hybrid_prediction;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <MetricCard
        title="Solar Energy"
        value={`${solar.predicted_energy_output.toFixed(
          2
        )} kWh`}
      />

      <MetricCard
        title="Wind Energy"
        value={`${wind.predicted_energy_output.toFixed(
          2
        )} kWh`}
      />

      <MetricCard
        title="Hybrid Energy"
        value={`${hybrid.total_expected_energy.toFixed(
          2
        )} kWh`}
      />

      <MetricCard
        title="Solar Capacity"
        value={`${(
          solar.predicted_capacity_factor *
          100
        ).toFixed(1)}%`}
      />

      <MetricCard
        title="Wind Capacity"
        value={`${(
          wind.predicted_capacity_factor *
          100
        ).toFixed(1)}%`}
      />

      <MetricCard
        title="Prediction Confidence"
        value={`${(
          hybrid.confidence * 100
        ).toFixed(0)}%`}
      />
    </div>
  );
}