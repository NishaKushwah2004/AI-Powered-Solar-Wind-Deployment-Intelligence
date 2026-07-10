import Spinner from "@/components/ui/Spinner";

import {
  DashboardHeader,
  KPIGrid,
  QuickActions,
} from "../components";

import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = useDashboard();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />

      <KPIGrid summary={data} />

      <QuickActions />
    </>
  );
}