import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { drawerVariants } from "./drawerVariants";

export default function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
}) {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/40"
      onClick={onClose}
    >
      <div
        className={drawerVariants(side)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="rounded-md p-1 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}