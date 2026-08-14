import Card from "@/components/ui/Card";

export default function WeatherCard({
  weather,
}) {
  if (!weather) return null;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-lg font-semibold">
          Weather Conditions
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Metric
            label="Temperature"
            value={`${weather.temperature ?? "-"} °C`}
          />

          <Metric
            label="Humidity"
            value={`${weather.humidity ?? "-"} %`}
          />

          <Metric
            label="Wind Speed"
            value={`${weather.wind_speed ?? "-"} m/s`}
          />

          <Metric
            label="Wind Direction"
            value={`${weather.wind_direction ?? "-"}°`}
          />

          <Metric
            label="Rainfall"
            value={`${weather.rainfall ?? 0} mm`}
          />

          <Metric
            label="Cloud Cover"
            value={`${weather.cloud_cover ?? "-"} %`}
          />

          <Metric
            label="Pressure"
            value={`${weather.pressure ?? "-"} hPa`}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

function Metric({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="font-semibold">
        {value}
      </p>
    </div>
  );
}