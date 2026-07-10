import { cn } from "@/utils/cn";
import { pageContainerVariants } from "./pageContainerVariants";

export default function PageContainer({
  children,
  size = "xl",
  className,
}) {
  return (
    <main
      className={cn(
        pageContainerVariants(size),
        className
      )}
    >
      {children}
    </main>
  );
}