export default function SiteMarkerPopup({
  properties,
}) {
  return (
    <div className="min-w-52">

      <h2 className="text-lg font-semibold">

        {properties.name}

      </h2>

      <p className="mt-2 text-sm">

        {properties.description ||
          "No description"}

      </p>

      <hr className="my-3" />

      <div className="space-y-1 text-sm">

        <p>

          <strong>Latitude:</strong>{" "}

          {properties.latitude}

        </p>

        <p>

          <strong>Longitude:</strong>{" "}

          {properties.longitude}

        </p>

        <p>

          <strong>Project ID:</strong>{" "}

          {properties.project_id}

        </p>

      </div>

    </div>
  );
}