import { cn } from "@/utils/cn";

export const badgeVariants = (variant = "default") =>
  cn(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
    {
      "bg-red-100 text-red-700": variant === "admin",

      "bg-blue-100 text-blue-700":
        variant === "manager",

      "bg-emerald-100 text-emerald-700":
        variant === "analyst",

      "bg-amber-100 text-amber-700":
        variant === "planner",

      "bg-slate-100 text-slate-700":
        variant === "default",

      "bg-green-100 text-green-700":
        variant === "success",

      "bg-yellow-100 text-yellow-700":
        variant === "warning",

      "bg-red-100 text-red-700":
        variant === "danger",
    }
  );