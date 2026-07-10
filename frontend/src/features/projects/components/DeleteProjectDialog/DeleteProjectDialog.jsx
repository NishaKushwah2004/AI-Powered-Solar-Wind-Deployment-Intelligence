import Dialog from "@/components/ui/Dialog";

export default function DeleteProjectDialog({
  open,
  onClose,
  onConfirm,
  projectName,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Project"
      description={`Are you sure you want to delete "${projectName}"?`}
    />
  );
}