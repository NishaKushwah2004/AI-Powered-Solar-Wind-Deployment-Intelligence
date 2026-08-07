import {
  CheckCircle2,
  TrendingUp,
  Sun,
  Wind,
  Zap,
} from "lucide-react";

import Card from "@/components/ui/Card";

export default function PredictionInsights({
  prediction,
}) {
  if (!prediction) return null;

  const solar =
    prediction.solar_prediction;

  const wind =
    prediction.wind_prediction;

  const hybrid =
    prediction.hybrid_prediction;

  const solarEnergy =
    solar.predicted_energy_output;

  const windEnergy =
    wind.predicted_energy_output;

  const totalEnergy =
    hybrid.total_expected_energy;

  const recommendation =
    hybrid.recommended_configuration;

  const confidence =
    hybrid.confidence * 100;

  const dominantSource =
    solarEnergy >= windEnergy
      ? "Solar"
      : "Wind";

  const improvement =
    (
      ((totalEnergy -
        Math.max(
          solarEnergy,
          windEnergy
        )) /
        Math.max(
          solarEnergy,
          windEnergy
        )) *
      100
    ).toFixed(1);

  const insights = [
    {
      icon: TrendingUp,
      title: "Dominant Resource",
      description: `${dominantSource} is predicted to produce the highest energy output.`,
    },

    {
      icon: Zap,
      title: "Hybrid Gain",
      description: `Hybrid deployment improves expected generation by approximately ${improvement}% over the best standalone source.`,
    },

    {
      icon:
        dominantSource === "Solar"
          ? Sun
          : Wind,
      title: "Recommended Configuration",
      description: recommendation,
    },

    {
      icon: CheckCircle2,
      title: "Prediction Confidence",
      description: `${confidence.toFixed(
        0
      )}% confidence indicates ${
        confidence >= 85
          ? "high reliability."
          : confidence >= 70
          ? "good reliability."
          : "moderate reliability."
      }`,
    },
  ];

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          Prediction Insights
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Automatically generated
          insights from the renewable
          energy prediction engine.
        </p>
      </Card.Header>

      <Card.Body>
        <div className="space-y-5">
          {insights.map(
            (
              {
                icon: Icon,
                title,
                description,
              },
              index
            ) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-slate-200 p-4"
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon
                    size={20}
                    className="text-primary"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    {description}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </Card.Body>
    </Card>
  );
}