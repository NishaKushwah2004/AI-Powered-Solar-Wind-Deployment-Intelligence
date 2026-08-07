import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

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
    error,
    refetch,
  } = useDashboard();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Card>
        <Card.Body className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Dashboard Unavailable
          </h2>

          <p className="text-slate-500">
            {error?.response?.data?.detail ??
              "Failed to load dashboard summary."}
          </p>

          <Button onClick={refetch}>
            Retry
          </Button>
        </Card.Body>
      </Card>
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