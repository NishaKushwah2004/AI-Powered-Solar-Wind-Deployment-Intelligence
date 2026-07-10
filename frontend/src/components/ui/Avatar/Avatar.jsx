import { cn } from "@/utils/cn";

export default function Avatar({
  name = "",
  size = "md",
  className,
}) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary text-white font-semibold",
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}