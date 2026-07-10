import {
  FolderKanban,
  MapPinned,
  Users,
  Activity,
} from "lucide-react";

import KPICard from "./KPICard";

export default function KPIGrid({
  summary,
}) {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <KPICard
        title="Projects"
        value={summary.total_projects}
        icon={FolderKanban}
      />

      <KPICard
        title="Sites"
        value={summary.total_sites}
        icon={MapPinned}
      />

      <KPICard
        title="Users"
        value={summary.total_users}
        icon={Users}
      />

      <KPICard
        title="System"
        value={summary.system_status}
        icon={Activity}
      />

    </div>
  );
}