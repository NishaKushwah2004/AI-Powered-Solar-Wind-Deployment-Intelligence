import {
  SeasonalEnergyChart,
} from "../charts";

import {
  WindAssessmentCard,
} from "../components";

export default function WindSection({
  assessment,
}) {
  if (!assessment) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Wind Potential Analysis
        </h2>

        <p className="mt-2 text-slate-500">
          Wind resource assessment,
          turbine suitability and seasonal
          energy forecasting.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <WindAssessmentCard
          assessment={assessment}
        />

        <SeasonalEnergyChart
          title="Wind Seasonal Forecast"
          forecast={
            assessment.seasonal_forecast
          }
        />
      </div>
    </section>
  );
}