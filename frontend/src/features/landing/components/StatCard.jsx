import Card from "@/components/ui/Card";

export default function StatCard({
  value,
  label,
  description,
}) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Card.Body>
        <h3 className="text-4xl font-bold text-primary">
          {value}
        </h3>

        <p className="mt-3 text-lg font-semibold text-slate-900">
          {label}
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </Card.Body>
    </Card>
  );
}