import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { authService } from "../services/authService";
import { useAuth } from "@/features/auth/context/useAuth";

export function useCurrentUser() {
  const {
    token,
    setUser,
    logout,
  } = useAuth();

  const query = useQuery({
    queryKey: QUERY_KEYS.CURRENT_USER,
    queryFn: authService.getCurrentUser,
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.isError) {
      logout();
    }
  }, [query.isError, logout]);

  return query;
}