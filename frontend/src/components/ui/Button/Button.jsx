import { LoaderCircle } from "lucide-react";

import { buttonVariants } from "./buttonVariants";

import { cn } from "@/utils/cn";

export default function Button({
  type = "button",
  children,
  variant,
  size,
  loading = false,
  icon,
  className,
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        icon
      )}

      <span>{children}</span>
    </button>
  );
}