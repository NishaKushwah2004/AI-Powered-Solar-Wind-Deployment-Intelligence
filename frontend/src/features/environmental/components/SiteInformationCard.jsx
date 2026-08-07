import Card from "@/components/ui/Card";

export default function SiteInformationCard({
  site,
}) {
  if (!site) return null;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-lg font-semibold">
          Site Information
        </h2>
      </Card.Header>

      <Card.Body>
        <div className="grid gap-5 md:grid-cols-2">
          <Info
            label="Site Name"
            value={site.name}
          />

          <Info
            label="Latitude"
            value={site.latitude}
          />

          <Info
            label="Longitude"
            value={site.longitude}
          />

          <Info
            label="Project ID"
            value={site.project_id}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="font-medium">
        {value ?? "-"}
      </p>
    </div>
  );
}