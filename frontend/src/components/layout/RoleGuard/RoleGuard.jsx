import { Navigate } from "react-router-dom";

import LoadingScreen from "@/components/feedback/LoadingScreen";

import { ROUTES } from "@/config/navigation/routes";
import { useAuth } from "@/features/auth/context/useAuth";

export default function RoleGuard({
  allowedRoles = [],
  children,
}) {
  const {
    loading,
    isAuthenticated,
    user,
  } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // User is not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  const role =
    user?.role?.name ?? user?.role;

  // Logged in but role hasn't been loaded yet.
  // Avoid redirecting to login.
  if (!role) {
    return <LoadingScreen />;
  }

  // Logged in but not authorized.
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