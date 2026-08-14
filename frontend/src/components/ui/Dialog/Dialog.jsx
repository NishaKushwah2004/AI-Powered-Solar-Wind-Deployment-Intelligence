import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function Dialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <p className="mb-6 text-slate-600">
        {description}
      </p>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          loading={loading}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}