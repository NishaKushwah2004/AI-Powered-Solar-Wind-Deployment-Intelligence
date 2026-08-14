import Card from "@/components/ui/Card";

import {
  EnergyComparisonChart,
  CapacityFactorChart,
  HybridContributionChart,
  ConfidenceChart,
} from ".";

export default function PredictionChartsSection({
  prediction,
}) {
  if (!prediction) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold">
            Energy Comparison
          </h2>
        </Card.Header>

        <Card.Body>
          <EnergyComparisonChart
            prediction={prediction}
          />
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold">
            Capacity Factors
          </h2>
        </Card.Header>

        <Card.Body>
          <CapacityFactorChart
            prediction={prediction}
          />
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold">
            Hybrid Contribution
          </h2>
        </Card.Header>

        <Card.Body>
          <HybridContributionChart
            prediction={prediction}
          />
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold">
            Prediction Confidence
          </h2>
        </Card.Header>

        <Card.Body>
          <ConfidenceChart
            prediction={prediction}
          />
        </Card.Body>
      </Card>
    </div>
  );
}