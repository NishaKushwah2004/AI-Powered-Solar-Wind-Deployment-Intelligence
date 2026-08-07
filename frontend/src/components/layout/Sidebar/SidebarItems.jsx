import { NavLink } from "react-router-dom";

import { cn } from "@/utils/cn";

export default function SidebarItems({ item }) {
  const Icon = item.icon;

  if (item.disabled) {
    return (
      <div
        aria-disabled="true"
        className={cn(
          "flex items-center gap-3 rounded-xl px-4 py-3",
          "cursor-not-allowed text-slate-400 opacity-60"
        )}
      >
        <Icon size={20} />

        <span className="flex-1">
          {item.title}
        </span>

        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs">
          Soon
        </span>
      </div>
    );
  }

  return (
    <NavLink
      aria-label={item.title}
      to={item.path}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors",
          isActive
            ? "bg-primary text-white"
            : "text-slate-700 hover:bg-slate-100"
        )
      }
    >
      <Icon size={20} />

      <span>{item.title}</span>
    </NavLink>
  );
}