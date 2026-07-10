import { cn } from "@/utils/cn";
import { badgeVariants} from "./badgeVariant.js";

export default function Badge({
  children,
  variant = "default",
  className,
}) {
  return (
    <span
      className={cn(
        badgeVariants(variant),
        className
      )}
    >
      {children}
    </span>
  );
}