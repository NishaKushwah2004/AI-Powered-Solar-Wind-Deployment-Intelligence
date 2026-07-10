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
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className={drawerVariants(side)}>
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="font-semibold">{title}</h2>

          <button onClick={onClose}>
            <X />
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