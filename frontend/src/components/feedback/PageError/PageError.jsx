import { AlertTriangle } from "lucide-react";

import Button from "@/components/ui/Button";

export default function PageError({
  title = "Something went wrong",
  message = "We couldn't load the requested data.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-8 py-12">

      <AlertTriangle
        size={56}
        className="text-red-500"
      />

      <h2 className="mt-5 text-2xl font-semibold text-red-600">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-center text-slate-600">
        {message}
      </p>

      {onRetry && (
        <Button
          className="mt-6"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}