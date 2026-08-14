import {
  Sun,
  Wind,
  Zap,
  Gauge,
} from "lucide-react";

import Card from "@/components/ui/Card";

export default function PredictionSummary({
  prediction,
}) {
  if (!prediction) return null;

  const solar =
    prediction.solar_prediction;

  const wind =
    prediction.wind_prediction;

  const hybrid =
    prediction.hybrid_prediction;

  const cards = [
    {
      title: "Solar Output",
      icon: Sun,
      value: `${solar.predicted_energy_output.toFixed(
        2
      )} kWh`,
    },
    {
      title: "Wind Output",
      icon: Wind,
      value: `${wind.predicted_energy_output.toFixed(
        2
      )} kWh`,
    },
    {
      title: "Hybrid Output",
      icon: Zap,
      value: `${hybrid.total_expected_energy.toFixed(
        2
      )} kWh`,
    },
    {
      title: "Confidence",
      icon: Gauge,
      value: `${(
        hybrid.confidence * 100
      ).toFixed(0)}%`,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map(
        (
          {
            title,
            icon: Icon,
            value,
          },
          index
        ) => (
          <Card key={index}>
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {title}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {value}
                  </h3>
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon
                    size={24}
                    className="text-primary"
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        )
      )}
    </div>
  );
}