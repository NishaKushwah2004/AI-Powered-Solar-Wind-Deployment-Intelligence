import Card from "@/components/ui/Card";

export default function SolarAssessmentCard({
  assessment,
}) {
  if (!assessment) return null;

  const m = assessment.metrics;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          Solar Assessment
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">
              Annual Irradiance
            </p>

            <h3 className="text-lg font-semibold">
              {m.annual_irradiance?.toFixed(2) ??
                "-"}{" "}
              kWh/m²
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Peak Sun Hours
            </p>

            <h3 className="text-lg font-semibold">
              {m.peak_sun_hours?.toFixed(2) ??
                "-"}{" "}
              hrs
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Capacity Factor
            </p>

            <h3 className="text-lg font-semibold">
              {m.capacity_factor != null
                ? `${(
                    m.capacity_factor * 100
                  ).toFixed(1)}%`
                : "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Panel Efficiency
            </p>

            <h3 className="text-lg font-semibold">
              {assessment.panel_efficiency != null
                ? `${(
                    assessment.panel_efficiency *
                    100
                  ).toFixed(1)}%`
                : "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Performance Ratio
            </p>

            <h3 className="text-lg font-semibold">
              {m.performance_ratio != null
                ? `${(
                    m.performance_ratio * 100
                  ).toFixed(0)}%`
                : "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Shading Factor
            </p>

            <h3 className="text-lg font-semibold">
              {assessment.shading_factor != null
                ? `${(
                    assessment.shading_factor *
                    100
                  ).toFixed(0)}%`
                : "-"}
            </h3>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-slate-500">
              Expected Annual Energy Output
            </p>

            <h3 className="text-xl font-bold text-primary">
              {m.expected_energy_output?.toFixed(
                2
              ) ?? "-"}{" "}
              kWh
            </h3>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}