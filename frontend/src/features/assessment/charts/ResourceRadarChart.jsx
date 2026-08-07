import Card from "@/components/ui/Card";

export default function ResourceRadarChart({
  metrics,
}) {
  return (
    <Card>

      <Card.Body>

        <h3 className="mb-6 text-lg font-semibold">
          Resource Comparison
        </h3>

        <div className="flex h-72 items-center justify-center rounded-xl border border-dashed text-slate-500">

          Radar Chart
          <br />
          (Solar · Wind · GIS · Environment · Infrastructure)

        </div>

      </Card.Body>

    </Card>
  );
}