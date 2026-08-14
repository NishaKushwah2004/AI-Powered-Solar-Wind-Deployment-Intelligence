import Card from "@/components/ui/Card";

export default function TechnologyRecommendationCard({
  prediction,
}) {
  if (!prediction) return null;

  const recommendation =
    prediction.hybrid_prediction
      .recommended_configuration;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          Technology Recommendation
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-primary">
            {recommendation}
          </h3>

          <ul className="list-disc space-y-2 pl-5 text-slate-600">
            <li>
              Maximizes annual energy
              production.
            </li>

            <li>
              Optimizes renewable resource
              utilization.
            </li>

            <li>
              Improves seasonal stability.
            </li>

            <li>
              Suitable for long-term
              deployment.
            </li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
}