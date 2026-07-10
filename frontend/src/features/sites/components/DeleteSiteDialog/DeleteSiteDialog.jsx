import Dialog from "@/components/ui/Dialog";

export default function DeleteSiteDialog({
  open,
  onClose,
  onConfirm,
  siteName,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Site"
      description={`Are you sure you want to delete "${siteName}"?`}
    />
  );
}