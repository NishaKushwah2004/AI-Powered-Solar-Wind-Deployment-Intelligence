import {
  ChevronDown,
} from "lucide-react";

import { useState } from "react";

import Avatar from "@/components/ui/Avatar";

import { useAuth } from "@/features/auth/context/AuthContext";

import UserDropdown from "./UserDropdown";

export default function UserMenu() {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-100"
      >
        <Avatar
          name={user?.full_name || "User"}
        />

        <div className="hidden text-left md:block">

          <p className="text-sm font-semibold">

            {user?.full_name || "User"}

          </p>

          <p className="text-xs text-slate-500">

            {user?.role?.name || "-"}

          </p>

        </div>

        <ChevronDown
          size={18}
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />

      </button>

      {open && (
        <UserDropdown
          closeDropdown={() => setOpen(false)}
        />
      )}

    </div>
  );
}