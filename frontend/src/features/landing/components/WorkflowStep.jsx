import Card from "@/components/ui/Card";

export default function WorkflowStep({
  icon: Icon,
  step,
  title,
  description,
}) {
  return (
    <Card className="relative h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Card.Body>
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
          <Icon size={28} />
        </div>

        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Step {step}
        </span>

        <h3 className="mt-4 text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {description}
        </p>
      </Card.Body>
    </Card>
  );
}