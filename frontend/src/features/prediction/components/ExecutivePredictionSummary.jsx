import Card from "@/components/ui/Card";

export default function ExecutivePredictionSummary({
  prediction,
}) {
  if (!prediction) return null;

  const solar = prediction.solar_prediction;
  const wind = prediction.wind_prediction;
  const hybrid = prediction.hybrid_prediction;

  return (
    <Card>
      <Card.Body>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Renewable Energy Prediction
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Prediction Summary
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              AI-generated renewable energy prediction
              based on environmental, GIS, solar,
              and wind resource analysis.
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">
              Total Expected Energy
            </p>

            <h2 className="mt-2 text-5xl font-bold text-primary">
              {hybrid?.total_expected_energy?.toFixed(2) ??
                "-"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              kWh
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">
              Solar Output
            </p>

            <h3 className="text-xl font-semibold">
              {solar?.predicted_energy_output?.toFixed(
                2
              ) ?? "-"}{" "}
              kWh
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Wind Output
            </p>

            <h3 className="text-xl font-semibold">
              {wind?.predicted_energy_output?.toFixed(
                2
              ) ?? "-"}{" "}
              kWh
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Recommended Configuration
            </p>

            <h3 className="text-xl font-semibold">
              {hybrid?.recommended_configuration ??
                "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Confidence
            </p>

            <h3 className="text-xl font-semibold">
              {hybrid?.confidence != null
                ? `${(hybrid.confidence * 100).toFixed(
                    0
                  )}%`
                : "-"}
            </h3>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}