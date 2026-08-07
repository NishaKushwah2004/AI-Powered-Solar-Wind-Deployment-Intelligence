import Card from "@/components/ui/Card";

export default function SolarResourceCard({
  solar,
}) {
  if (!solar) return null;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-lg font-semibold">
          Solar Resource
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="grid gap-5 md:grid-cols-2">
          <Metric
            label="GHI"
            value={solar.ghi}
          />

          <Metric
            label="DNI"
            value={solar.dni}
          />

          <Metric
            label="DHI"
            value={solar.dhi}
          />

          <Metric
            label="Solar Irradiance"
            value={solar.solar_irradiance}
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
        {value ?? "-"}
      </p>
    </div>
  );
}