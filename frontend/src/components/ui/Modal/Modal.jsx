import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { modalVariants } from "./modalVariants";

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
}) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={cn(modalVariants(size))}>
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}