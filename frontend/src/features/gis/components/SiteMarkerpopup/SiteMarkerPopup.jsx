export default function SiteMarkerPopup({
  properties,
}) {
  const project =
    properties.project?.name ??
    properties.project_name ??
    properties.project_id ??
    "-";

  return (
    <div className="min-w-56">
      <h2 className="text-lg font-semibold">
        {properties.name}
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        {properties.description ||
          "No description available."}
      </p>

      <hr className="my-3" />

      <div className="space-y-2 text-sm">
        <p>
          <strong>Latitude:</strong>{" "}
          {properties.latitude != null
            ? Number(
                properties.latitude
              ).toFixed(6)
            : "-"}
        </p>

        <p>
          <strong>Longitude:</strong>{" "}
          {properties.longitude != null
            ? Number(
                properties.longitude
              ).toFixed(6)
            : "-"}
        </p>

        <p>
          <strong>Project:</strong>{" "}
          {project}
        </p>
      </div>
    </div>
  );
}