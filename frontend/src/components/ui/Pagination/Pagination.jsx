import Button from "@/components/ui/Button";

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex items-center justify-end gap-3">

      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={page === 1}
      >
        Previous
      </Button>

      <span>
        {page} / {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={page === totalPages}
      >
        Next
      </Button>

    </div>
  );
}