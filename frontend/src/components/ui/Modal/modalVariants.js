import { cn } from "@/utils/cn";

export const modalVariants = (size = "md") =>
  cn("w-full rounded-2xl bg-white shadow-xl", {
    "max-w-sm": size === "sm",
    "max-w-lg": size === "md",
    "max-w-2xl": size === "lg",
    "max-w-4xl": size === "xl",
  });