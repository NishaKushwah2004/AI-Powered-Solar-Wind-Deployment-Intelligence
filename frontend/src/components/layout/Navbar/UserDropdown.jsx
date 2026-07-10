import {
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "@/config/navigation/routes";

import { useAuth } from "@/features/auth/context/AuthContext";

export default function UserDropdown({
  closeDropdown,
}) {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    closeDropdown?.();

    navigate(ROUTES.LOGIN, {
      replace: true,
    });
  };

  return (
    <div className="absolute right-0 top-14 w-56 rounded-xl border bg-white shadow-lg">

      <Link
        to={ROUTES.PROFILE}
        onClick={closeDropdown}
        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
      >
        <User size={18} />

        Profile
      </Link>

      <button
        disabled
        className="flex w-full items-center gap-3 px-4 py-3 text-slate-400"
      >
        <Settings size={18} />

        Settings

        <span className="ml-auto text-xs">

          Soon

        </span>

      </button>

      <hr />

      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
      >
        <LogOut size={18} />

        Logout
      </button>

    </div>
  );
}