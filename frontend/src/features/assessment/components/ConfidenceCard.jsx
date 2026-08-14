import Card from "@/components/ui/Card";

import {
  formatPercentage,
} from "../utils/assessmentFormatter";

import {
  getConfidenceColor,
  getConfidenceLabel,
} from "../utils/assessmentHelpers";

export default function ConfidenceCard({
  confidence = 0,
}) {
  return (
    <Card>
      <Card.Body>
        <p className="text-sm text-slate-500">
          Confidence Score
        </p>

        <h2
          className={`mt-3 text-4xl font-bold ${getConfidenceColor(
            confidence
          )}`}
        >
          {formatPercentage(
            confidence * 100,
            0
          )}
        </h2>

        <p className="mt-2 text-sm font-medium text-slate-600">
          {getConfidenceLabel(
            confidence
          )}
        </p>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{
              width: `${confidence * 100}%`,
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}