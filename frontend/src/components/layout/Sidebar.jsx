import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    MapPinned,
    Map,
    User,
    LogOut,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
    const { logout } = useAuth();

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
            isActive
                ? "bg-teal-700 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <aside className="flex h-screen w-64 flex-col bg-slate-900">

            <div className="border-b border-slate-700 p-6">

                <h1 className="text-xl font-bold text-white">
                    Solar & Wind
                </h1>

                <p className="text-sm text-slate-400">
                    Intelligence Platform
                </p>

            </div>

            <nav className="flex-1 space-y-2 p-4">

                <NavLink to="/" className={linkClass}>
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink to="/projects" className={linkClass}>
                    <FolderKanban size={20} />
                    Projects
                </NavLink>

                <NavLink to="/sites" className={linkClass}>
                    <MapPinned size={20} />
                    Sites
                </NavLink>

                <NavLink to="/gis" className={linkClass}>
                    <Map size={20} />
                    GIS Map
                </NavLink>

                <NavLink to="/profile" className={linkClass}>
                    <User size={20} />
                    Profile
                </NavLink>

            </nav>

            <div className="border-t border-slate-700 p-4">

                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:bg-red-600 hover:text-white"
                >
                    <LogOut size={20} />
                    Logout
                </button>

            </div>

        </aside>
    );
}