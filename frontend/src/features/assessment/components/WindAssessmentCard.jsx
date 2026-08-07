import Card from "@/components/ui/Card";

export default function WindAssessmentCard({
  assessment,
}) {
  if (!assessment) return null;

  const m = assessment.metrics;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          Wind Assessment
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">
              Wind Speed
            </p>

            <h3 className="text-lg font-semibold">
              {m.average_wind_speed?.toFixed(
                2
              ) ?? "-"}{" "}
              m/s
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Wind Power Density
            </p>

            <h3 className="text-lg font-semibold">
              {m.wind_power_density?.toFixed(
                2
              ) ?? "-"}{" "}
              W/m²
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
              Turbulence
            </p>

            <h3 className="text-lg font-semibold">
              {assessment.turbulence_intensity ??
                "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Turbine Suitability
            </p>

            <h3 className="text-lg font-semibold">
              {assessment.turbine_suitability ??
                "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Suitability Score
            </p>

            <h3 className="text-lg font-semibold">
              {m.suitability_score?.toFixed(
                1
              ) ?? "-"}
            </h3>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-slate-500">
              Expected Annual Energy Production
            </p>

            <h3 className="text-xl font-bold text-primary">
              {m.expected_annual_energy?.toFixed(
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