import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { authService } from "../services/authService";

import { useAuth } from "../context/AuthContext";

export function useCurrentUser() {
  const {
    token,
    setUser,
    logout,
  } = useAuth();

  return useQuery({
    queryKey: QUERY_KEYS.CURRENT_USER,

    queryFn: authService.getCurrentUser,

    enabled: !!token,

    retry: false,

    staleTime: 1000 * 60 * 10,

    onSuccess: (user) => {
      setUser(user);
    },

    onError: () => {
      logout();
    },
  });
}