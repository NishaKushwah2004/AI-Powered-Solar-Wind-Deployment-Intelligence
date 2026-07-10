import { cn } from "@/utils/cn";

export default function FormSection({
  title,
  description,
  children,
  className,
}) {
  return (
    <section
      className={cn(
        "space-y-6 rounded-2xl border border-slate-200 bg-white p-6",
        className
      )}
    >
      {(title || description) && (
        <div className="border-b border-slate-200 pb-4">
          {title && (
            <h2 className="text-lg font-semibold text-slate-900">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}