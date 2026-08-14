import { Bell } from "lucide-react";

import Breadcrumb from "@/components/layout/Breadcrumb";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
      <Breadcrumb />

      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 transition hover:bg-slate-100"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
}