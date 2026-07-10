import { cn } from "@/utils/cn";

export default function Skeleton({
  className,
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gray-200",
        className
      )}
      aria-hidden="true"
    />
  );
}