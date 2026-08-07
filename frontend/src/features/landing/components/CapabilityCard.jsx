import Card from "@/components/ui/Card";

export default function CapabilityCard({
  icon: Icon,
  title,
  description,
  features,
}) {
  return (
    <Card className="group h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <Card.Body className="flex h-full flex-col">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <Icon size={28} />
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {feature}
            </span>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}