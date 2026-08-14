import Card from "@/components/ui/Card";

export default function GISSummaryCard({
  gis,
}) {
  if (!gis) return null;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-lg font-semibold">
          Geographic Intelligence
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Metric
            label="Elevation"
            value={`${gis.elevation ?? "-"} m`}
          />

          <Metric
            label="Land Use"
            value={gis.land_use}
          />

          <Metric
            label="Terrain"
            value={gis.terrain_classification}
          />

          <Metric
            label="Slope"
            value={`${gis.land_slope ?? "-"}°`}
          />

          <Metric
            label="Vegetation Index"
            value={gis.vegetation_index}
          />

          <Metric
            label="Road Distance"
            value={`${gis.road_distance ?? "-"} km`}
          />

          <Metric
            label="Substation"
            value={`${gis.nearest_substation_distance ?? "-"} km`}
          />

          <Metric
            label="Transmission Line"
            value={`${gis.nearest_transmission_line_distance ?? "-"} km`}
          />

          <Metric
            label="Water Body"
            value={`${gis.water_body_distance ?? "-"} km`}
          />

          <Metric
            label="Protected Area"
            value={`${gis.protected_area_distance ?? "-"} km`}
          />

          <Metric
            label="Infrastructure Score"
            value={gis.infrastructure_score}
          />

          <Metric
            label="GIS Score"
            value={gis.gis_score}
          />

          <Metric
            label="Suitability"
            value={gis.site_suitability}
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