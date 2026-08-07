import {
  Cloud,
  Droplets,
  Gauge,
  Thermometer,
  Wind,
} from "lucide-react";

import MetricCard from "../components/MetricCard";

import {
  formatTemperature,
  formatPercentage,
  formatWindSpeed,
} from "../utils/assessmentFormatter";

export default function EnvironmentalSection({
  weather,
}) {
  if (!weather) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Environmental Analysis
        </h2>

        <p className="mt-2 text-slate-500">
          Current environmental conditions used
          for renewable resource assessment.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          title="Temperature"
          value={formatTemperature(weather.temperature)}
          icon={Thermometer}
        />

        <MetricCard
          title="Humidity"
          value={formatPercentage(weather.humidity, 0)}
          icon={Droplets}
        />

        <MetricCard
          title="Wind Speed"
          value={formatWindSpeed(weather.wind_speed)}
          icon={Wind}
        />

        <MetricCard
          title="Cloud Cover"
          value={formatPercentage(weather.cloud_cover, 0)}
          icon={Cloud}
        />

        <MetricCard
          title="Pressure"
          value={
            weather.pressure
              ? `${weather.pressure} hPa`
              : "-"
          }
          icon={Gauge}
        />

        <MetricCard
          title="Rainfall"
          value={
            weather.rainfall != null
              ? `${weather.rainfall} mm`
              : "-"
          }
          icon={Droplets}
        />
      </div>
    </section>
  );
}