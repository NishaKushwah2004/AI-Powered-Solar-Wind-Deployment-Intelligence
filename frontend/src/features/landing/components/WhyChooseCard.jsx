import Card from "@/components/ui/Card";

export default function WhyChooseCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <Card className="group h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Card.Body>
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          <Icon size={28} />
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-slate-600">
          {description}
        </p>
      </Card.Body>
    </Card>
  );
}