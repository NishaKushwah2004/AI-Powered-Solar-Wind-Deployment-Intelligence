import Card from "@/components/ui/Card";

export default function GISAssessmentCard({
  gis,
}) {
  if (!gis) return null;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          GIS Assessment
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">
              Land Use
            </p>

            <h3 className="font-semibold">
              {gis.land_use ?? "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Elevation
            </p>

            <h3 className="font-semibold">
              {gis.elevation ?? "-"} m
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Terrain
            </p>

            <h3 className="font-semibold">
              {gis.terrain_classification ??
                "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Land Slope
            </p>

            <h3 className="font-semibold">
              {gis.land_slope ?? "-"}°
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Vegetation Index
            </p>

            <h3 className="font-semibold">
              {gis.vegetation_index ??
                "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              GIS Score
            </p>

            <h3 className="font-semibold">
              {gis.gis_score ?? "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Infrastructure Score
            </p>

            <h3 className="font-semibold">
              {gis.infrastructure_score ??
                "-"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Road Distance
            </p>

            <h3 className="font-semibold">
              {gis.road_distance ?? "-"} km
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Substation Distance
            </p>

            <h3 className="font-semibold">
              {gis.nearest_substation_distance ??
                "-"}{" "}
              km
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Transmission Line
            </p>

            <h3 className="font-semibold">
              {gis.nearest_transmission_line_distance ??
                "-"}{" "}
              km
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Water Body Distance
            </p>

            <h3 className="font-semibold">
              {gis.water_body_distance ??
                "-"}{" "}
              km
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Protected Area
            </p>

            <h3 className="font-semibold">
              {gis.protected_area_distance ??
                "-"}{" "}
              km
            </h3>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-slate-500">
              Site Suitability
            </p>

            <h3 className="text-xl font-bold text-primary">
              {gis.site_suitability ??
                "-"}
            </h3>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}