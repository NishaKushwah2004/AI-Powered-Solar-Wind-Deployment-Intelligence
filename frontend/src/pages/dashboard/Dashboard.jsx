import {
    FolderKanban,
    MapPinned,
    User,
    Activity,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useDashboard from "../../hooks/useDashboard";

import DashboardGrid from "../../components/dashboard/DashboardGrid";
import StatCard from "../../components/dashboard/StatCard";
import LoadingState from "../../components/common/LoadingState";

export default function Dashboard() {

    const { user } = useAuth();

    const {
        summary,
        loading,
    } = useDashboard();

    if (loading) {
        return <LoadingState />;
    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-2 text-slate-500">
                    Welcome back,{" "}
                    <span className="font-semibold">
                        {user?.full_name}
                    </span>
                </p>

            </div>

            <DashboardGrid>

                <StatCard
                    title="Projects"
                    value={summary.totalProjects}
                    icon={<FolderKanban size={24} />}
                />

                <StatCard
                    title="Sites"
                    value={summary.totalSites}
                    icon={<MapPinned size={24} />}
                    color="bg-blue-600"
                />

                <StatCard
                    title="Current Role"
                    value={user?.role?.name}
                    icon={<User size={24} />}
                    color="bg-purple-600"
                />

                <StatCard
                    title="System Status"
                    value={summary.systemStatus}
                    icon={<Activity size={24} />}
                    color="bg-green-600"
                />

            </DashboardGrid>

        </div>

    );

}