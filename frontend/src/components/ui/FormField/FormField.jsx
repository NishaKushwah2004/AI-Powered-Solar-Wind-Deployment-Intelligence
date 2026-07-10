import { cn } from "@/utils/cn";

export default function FormField({
  id,
  label,
  required = false,
  error,
  helperText,
  children,
  className,
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <p
          className="text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      ) : (
        helperText && (
          <p className="text-sm text-slate-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}