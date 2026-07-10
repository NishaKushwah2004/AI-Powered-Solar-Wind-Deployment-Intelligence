import { Navigate } from "react-router-dom";

import { ROUTES } from "@/config/navigation/routes";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function RoleGuard({
  allowedRoles,
  children,
}) {
  const { user } = useAuth();

  const role = user?.role?.name;

  if (!role) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  if (!allowedRoles.includes(role)) {
    return (
      <Navigate
        to={ROUTES.UNAUTHORIZED}
        replace
      />
    );
  }

  return children;
}