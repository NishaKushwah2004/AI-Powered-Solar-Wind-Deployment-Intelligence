import Card from "@/components/ui/Card";

import ScoreProgressBar from "../components/ScoreProgressBar";

export default function ScoreBreakdownChart({
  metrics,
}) {
  return (
    <Card>

      <Card.Body>

        <h3 className="mb-6 text-lg font-semibold">
          Weighted Score Breakdown
        </h3>

        <div className="space-y-5">

          <ScoreProgressBar
            label="Renewable Resource"
            score={
              metrics.renewable_resource_score
            }
          />

          <ScoreProgressBar
            label="Geographic"
            score={
              metrics.geographic_score
            }
          />

          <ScoreProgressBar
            label="Infrastructure"
            score={
              metrics.infrastructure_score
            }
          />

          <ScoreProgressBar
            label="Environmental"
            score={
              metrics.environmental_score
            }
          />

          <ScoreProgressBar
            label="Economic"
            score={
              metrics.economic_score
            }
          />

        </div>

      </Card.Body>

    </Card>
  );
}