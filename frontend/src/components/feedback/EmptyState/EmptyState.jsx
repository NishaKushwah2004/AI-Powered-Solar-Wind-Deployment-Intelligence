import Button from "@/components/ui/Button";

export default function EmptyState({
  icon,
  title,
  description,
  buttonText,
  onClick,
}) {
  const Icon = icon;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-10 text-center">

      {Icon && <Icon className="mb-4 h-12 w-12 text-gray-400" />}

      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {description}
      </p>

      {buttonText && (
        <Button
          className="mt-6"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      )}

    </div>
  );
}