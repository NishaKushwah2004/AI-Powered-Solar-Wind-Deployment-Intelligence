import { cn } from "@/utils/cn";

export const pageContainerVariants = (size = "xl") =>
  cn("mx-auto w-full px-4 py-6 sm:px-6 lg:px-8", {
    "max-w-3xl": size === "sm",
    "max-w-5xl": size === "md",
    "max-w-6xl": size === "lg",
    "max-w-7xl": size === "xl",
    "max-w-full": size === "full",
  });