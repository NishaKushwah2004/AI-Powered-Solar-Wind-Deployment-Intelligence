import {
  CheckCircle2,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export default function RecommendationCard({
  recommendation,
  metrics,
}) {
  if (!metrics) return null;

  const overall =
    metrics.overall_score ?? 0;

  const priority =
    overall >= 85
      ? "High"
      : overall >= 65
      ? "Medium"
      : "Low";

  const risk =
    overall >= 85
      ? "Low"
      : overall >= 65
      ? "Moderate"
      : "High";

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          Deployment Recommendation
        </h2>
      </Card.Header>

      <Card.Body className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="success">
            {metrics.recommended_energy_source}
          </Badge>

          <span className="text-sm text-slate-500">
            Recommended Technology
          </span>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-slate-700">
            {recommendation}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle2
              size={18}
              className="text-green-600"
            />

            <span>
              Renewable resource availability
              is favorable.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <TrendingUp
              size={18}
              className="text-blue-600"
            />

            <span>
              Infrastructure and GIS analysis
              support deployment.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <TriangleAlert
              size={18}
              className="text-amber-500"
            />

            <span>
              Verify environmental clearance
              before execution.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 border-t pt-5">
          <div>
            <p className="text-sm text-slate-500">
              Deployment Priority
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {priority}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Risk Level
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {risk}
            </h3>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}