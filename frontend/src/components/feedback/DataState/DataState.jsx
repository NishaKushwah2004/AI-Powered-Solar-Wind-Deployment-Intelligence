import Spinner from "@/components/ui/Spinner";
import PageError from "../PageError";

export default function DataState({
  isLoading = false,
  isError = false,
  error = null,
  isEmpty = false,
  loading = null,
  empty = null,
  children,
}) {
  if (isLoading) {
    return (
      loading || (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      )
    );
  }

  if (isError) {
    return (
      <PageError
        message={
          error?.response?.data?.detail ||
          error?.message
        }
      />
    );
  }

  if (isEmpty) {
    return empty;
  }

  return children;
}