import { Navigate } from "react-router-dom";

import LoadingScreen from "@/components/feedback/LoadingScreen";

import { ROUTES } from "@/config/navigation/routes";

import { useAuth } from "@/features/auth/context/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  return children;
}
