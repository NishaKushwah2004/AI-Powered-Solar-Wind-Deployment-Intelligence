import { useId } from "react";

export default function Checkbox({
  label,
  disabled = false,
  ...props
}) {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        className="h-4 w-4 accent-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />

      <label
        htmlFor={id}
        className="cursor-pointer text-sm disabled:cursor-not-allowed"
      >
        {label}
      </label>
    </div>
  );
}