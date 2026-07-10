import Card from "@/components/ui/Card";

export default function KPICard({
  title,
  value,
  icon: Icon,
  color = "text-primary",
}) {
  return (
    <Card>
      <Card.Body>

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {value}
            </h2>

          </div>

          <Icon
            className={color}
            size={34}
          />

        </div>

      </Card.Body>
    </Card>
  );
}