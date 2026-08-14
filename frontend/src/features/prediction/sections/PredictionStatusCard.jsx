import Card from "@/components/ui/Card";

export default function PredictionStatusCard({
  prediction,
}) {
  if (!prediction) return null;

  const confidence =
    prediction.hybrid_prediction
      .confidence;

  const status =
    confidence >= 0.9
      ? "Excellent"
      : confidence >= 0.75
      ? "Good"
      : "Moderate";

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          Prediction Status
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="space-y-4">
          <p className="text-4xl font-bold text-primary">
            {status}
          </p>

          <p className="text-slate-600">
            Model confidence is{" "}
            {(confidence * 100).toFixed(
              0
            )}
            %.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}