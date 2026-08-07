import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function HybridPredictionCard({
  prediction,
}) {
  if (!prediction) return null;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          Hybrid Prediction
        </h2>
      </Card.Header>

      <Card.Body>
        <Badge variant="success">
          {prediction.recommended_configuration}
        </Badge>

        <div className="mt-6 grid grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-slate-500">
              Solar Contribution
            </p>

            <h3 className="text-xl font-semibold">
              {prediction.solar_contribution.toFixed(1)}%
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Wind Contribution
            </p>

            <h3 className="text-xl font-semibold">
              {prediction.wind_contribution.toFixed(1)}%
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Total Expected Energy
            </p>

            <h3 className="text-xl font-semibold">
              {prediction.total_expected_energy.toFixed(2)} kWh
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