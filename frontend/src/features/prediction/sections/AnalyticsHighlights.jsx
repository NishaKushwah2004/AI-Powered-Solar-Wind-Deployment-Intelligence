import {
  TrendingUp,
  Zap,
  Sun,
  Wind,
} from "lucide-react";

import Card from "@/components/ui/Card";

export default function AnalyticsHighlights({
  prediction,
}) {
  if (!prediction) return null;

  const solar =
    prediction.solar_prediction;

  const wind =
    prediction.wind_prediction;

  const hybrid =
    prediction.hybrid_prediction;

  const dominant =
    solar.predicted_energy_output >=
    wind.predicted_energy_output
      ? "Solar"
      : "Wind";

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          Analytics Highlights
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Highlight
            icon={TrendingUp}
            title="Best Resource"
            value={dominant}
          />

          <Highlight
            icon={Zap}
            title="Hybrid Output"
            value={`${hybrid.total_expected_energy.toFixed(
              1
            )} kWh`}
          />

          <Highlight
            icon={Sun}
            title="Solar CF"
            value={`${(
              solar.predicted_capacity_factor *
              100
            ).toFixed(1)}%`}
          />

          <Highlight
            icon={Wind}
            title="Wind CF"
            value={`${(
              wind.predicted_capacity_factor *
              100
            ).toFixed(1)}%`}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

function Highlight({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:bg-slate-100">
      <Icon
        className="mb-4 text-primary"
        size={24}
      />

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {value}
      </h3>
    </div>
  );
}