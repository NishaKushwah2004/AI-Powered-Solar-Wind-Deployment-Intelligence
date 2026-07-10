import { Navigate } from "react-router-dom";

import { ROUTES } from "@/config/navigation/routes";

import { useAuth } from "@/features/auth/context/AuthContext";

export default function RoleGuard({
  allowedRoles,
  children,
}) {
  const { user } = useAuth();

  if (!user) return null;

  const role = user.role?.name;

  if (!allowedRoles.includes(role)) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
      />
    );
  }

  return children;
}