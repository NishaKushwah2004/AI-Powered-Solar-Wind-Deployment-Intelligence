import {
  CheckCircle2,
  Sun,
  Wind,
  Zap,
  Lightbulb,
} from "lucide-react";

import Card from "@/components/ui/Card";

export default function PredictionRecommendations({
  prediction,
}) {
  if (!prediction) return null;

  const hybrid =
    prediction.hybrid_prediction;

  const solar =
    prediction.solar_prediction;

  const wind =
    prediction.wind_prediction;

  const configuration =
    hybrid?.recommended_configuration ??
    "Not Available";

  const confidence =
    (hybrid?.confidence ?? 0) * 100;

  const recommendations = [];

  recommendations.push(
    `Recommended deployment: ${configuration}.`
  );

  if (
    solar?.predicted_energy_output >
    wind?.predicted_energy_output
  ) {
    recommendations.push(
      "Solar generation is expected to outperform wind at this location."
    );
  } else if (
    wind?.predicted_energy_output >
    solar?.predicted_energy_output
  ) {
    recommendations.push(
      "Wind generation is expected to outperform solar at this location."
    );
  } else {
    recommendations.push(
      "Solar and wind resources are well balanced."
    );
  }

  if (confidence >= 90) {
    recommendations.push(
      "Prediction confidence is excellent. This site is suitable for detailed engineering studies."
    );
  } else if (confidence >= 75) {
    recommendations.push(
      "Prediction confidence is high. Proceed with feasibility assessment."
    );
  } else {
    recommendations.push(
      "Additional environmental observations are recommended before investment."
    );
  }

  if (
    configuration
      .toLowerCase()
      .includes("hybrid")
  ) {
    recommendations.push(
      "Hybrid deployment can improve reliability by balancing seasonal renewable resources."
    );
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center gap-3">
          <Lightbulb className="text-primary" />

          <div>
            <h2 className="text-xl font-semibold">
              Deployment Recommendations
            </h2>

            <p className="text-sm text-slate-500">
              AI-assisted recommendations
              based on prediction results.
            </p>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center gap-3">
            {configuration
              .toLowerCase()
              .includes("solar") ? (
              <Sun className="text-amber-500" />
            ) : configuration
                .toLowerCase()
                .includes("wind") ? (
              <Wind className="text-sky-500" />
            ) : (
              <Zap className="text-primary" />
            )}

            <div>
              <p className="text-sm text-slate-500">
                Recommended Configuration
              </p>

              <h3 className="text-2xl font-bold">
                {configuration}
              </h3>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map(
            (item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-slate-200 p-4"
              >
                <CheckCircle2
                  size={20}
                  className="mt-0.5 text-green-600"
                />

                <p className="text-slate-700">
                  {item}
                </p>
              </div>
            )
          )}
        </div>
      </Card.Body>
    </Card>
  );
}