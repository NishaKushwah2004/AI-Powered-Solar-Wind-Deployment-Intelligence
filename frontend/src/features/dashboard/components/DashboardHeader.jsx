import { useAuth } from "@/features/auth/context/useAuth";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">
        {getGreeting()},
        {" "}
        {user?.full_name ?? "User"}
      </h1>

      <p className="mt-2 text-slate-500">
        AI-Powered Solar & Wind Deployment Intelligence Platform
      </p>

      <p className="mt-1 text-sm text-slate-400">
        Welcome back. Use the dashboard to manage projects,
        analyze sites, generate assessments and renewable
        energy predictions.
      </p>
    </div>
  );
}