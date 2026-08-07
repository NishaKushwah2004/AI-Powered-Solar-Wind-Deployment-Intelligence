import Button from "@/components/ui/Button";

export default function PlaceholderModule({
  icon,
  title,
  milestone,
  description,
}) {
  const Icon = icon;

  return (
    <div className="rounded-2xl border bg-white p-8">

      {Icon && (
        <Icon className="mb-4 h-10 w-10 text-primary" />
      )}

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 text-gray-500">
        {description}
      </p>

      <Button
          type="button"
          variant="outline"
          disabled
          className="mt-6"
      >
          Available in Milestone {milestone}
      </Button>

    </div>
  );
}