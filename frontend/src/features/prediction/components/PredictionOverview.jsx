import {
  ExecutivePredictionSummary,
  HybridPredictionCard,
  PredictionMetricsGrid,
  SolarPredictionCard,
  WindPredictionCard,
} from ".";

import { PredictionChartsSection } from "../charts";

import {
  AnalyticsHighlights,
  EnergyComparisonTable,
  PredictionInsights,
  PredictionRecommendations,
  PredictionStatusCard,
  PredictionSummary,
  TechnologyRecommendationCard,
} from "../sections";

export default function PredictionOverview({
  prediction,
}) {
  if (!prediction) {
    return (
      <div className="rounded-lg border p-6">
        <p className="text-sm text-gray-500">
          Prediction data is not available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ExecutivePredictionSummary
        prediction={prediction}
      />

      <PredictionSummary
        prediction={prediction}
      />

      <AnalyticsHighlights
        prediction={prediction}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <PredictionStatusCard
          prediction={prediction}
        />

        <TechnologyRecommendationCard
          prediction={prediction}
        />
      </div>

      <EnergyComparisonTable
        prediction={prediction}
      />

      <PredictionChartsSection
        prediction={prediction}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SolarPredictionCard
          prediction={
            prediction.solar_prediction
          }
        />

        <WindPredictionCard
          prediction={
            prediction.wind_prediction
          }
        />
      </div>

      <HybridPredictionCard
        prediction={
          prediction.hybrid_prediction
        }
      />

      <PredictionMetricsGrid
        prediction={prediction}
      />

      <PredictionInsights
        prediction={prediction}
      />

      <PredictionRecommendations
        prediction={prediction}
      />
    </div>
  );
}