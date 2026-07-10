import { TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ErrorCard({
  message,
  onRetry,
}) {
  return (
    <div className="rounded-2xl border bg-white p-8 text-center">

      <TriangleAlert className="mx-auto mb-4 text-red-500" />

      <p>{message}</p>

      {onRetry && (
        <Button
          className="mt-5"
          onClick={onRetry}
        >
          Retry
        </Button>
      )}

    </div>
  );
}