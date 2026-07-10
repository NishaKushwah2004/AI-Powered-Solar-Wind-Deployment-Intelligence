import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

import { breadcrumbs } from "@/config/navigation/breadcrumbs";

export default function Breadcrumb() {
  const location = useLocation();

  const items =
    breadcrumbs[location.pathname] || [];

  return (
    <nav
      className="flex items-center gap-2 text-sm text-slate-500"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex items-center gap-2"
        >
          <span>{item.label}</span>

          {index < items.length - 1 && (
            <ChevronRight size={15} />
          )}
        </div>
      ))}
    </nav>
  );
}