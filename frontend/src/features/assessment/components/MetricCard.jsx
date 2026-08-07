import Card from "@/components/ui/Card";

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <Card className="h-full">
      <Card.Body>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">
              {title}
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              {value}
            </h3>

            {subtitle && (
              <p className="mt-2 text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {Icon && (
            <div className="rounded-xl bg-primary/10 p-3">
              <Icon
                size={26}
                className="text-primary"
              />
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}