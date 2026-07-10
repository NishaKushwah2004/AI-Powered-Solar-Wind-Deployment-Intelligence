import { cn } from "@/utils/cn";

export const drawerVariants = (side = "right") =>
  cn(
    "fixed top-0 h-screen w-full max-w-md bg-white shadow-xl transition-all",
    {
      "right-0": side === "right",
      "left-0": side === "left",
    }
  );