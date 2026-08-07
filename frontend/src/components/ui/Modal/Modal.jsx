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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className={cn(modalVariants(size))}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button
            type="button"
            aria-label="Close modal"
            className="rounded-md p-1 transition hover:bg-slate-100"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}