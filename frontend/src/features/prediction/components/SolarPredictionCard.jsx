import Card from "@/components/ui/Card";

export default function SolarPredictionCard({
  prediction,
}) {
  if (!prediction) return null;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          Solar Prediction
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-slate-500">
              Predicted Energy
            </p>

            <h3 className="text-xl font-semibold">
              {prediction.predicted_energy_output.toFixed(2)} kWh
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Capacity Factor
            </p>

            <h3 className="text-xl font-semibold">
              {(prediction.predicted_capacity_factor * 100).toFixed(1)}%
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Panel Efficiency
            </p>

            <h3 className="text-xl font-semibold">
              {(prediction.panel_efficiency * 100).toFixed(1)}%
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Confidence
            </p>

            <h3 className="text-xl font-semibold">
              {(prediction.confidence * 100).toFixed(0)}%
            </h3>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}