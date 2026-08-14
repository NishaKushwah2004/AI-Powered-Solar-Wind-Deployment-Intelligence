import {
  SeasonalEnergyChart,
} from "../charts";

import {
  SolarAssessmentCard,
} from "../components";

export default function SolarSection({
  assessment,
}) {
  if (!assessment) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Solar Potential Analysis
        </h2>

        <p className="mt-2 text-slate-500">
          Solar irradiance assessment,
          expected generation and seasonal
          forecasting.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SolarAssessmentCard
          assessment={assessment}
        />

        <SeasonalEnergyChart
          title="Solar Seasonal Forecast"
          forecast={
            assessment.seasonal_forecast
          }
        />
      </div>
    </section>
  );
}