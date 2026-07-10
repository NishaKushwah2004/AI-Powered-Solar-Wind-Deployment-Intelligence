import { useAuth } from "@/features/auth/context/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">
        Welcome, {user.full_name}
      </h1>

      <p className="mt-2 text-slate-500">
        Renewable Energy Deployment Intelligence Dashboard
      </p>

      <p className="mt-1 text-sm text-slate-400">
        Role: {user.role.name}
      </p>
    </div>
  );
}