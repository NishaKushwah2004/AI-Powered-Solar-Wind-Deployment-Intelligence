import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { authService } from "../services/authService";
import { useAuth } from "@/features/auth/context/useAuth";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/config/navigation/routes";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    login,
    setLoading,
    logout,
  } = useAuth();

  return useMutation({
    mutationFn: authService.login,

    onMutate: () => {
      setLoading(true);
    },

    onSuccess: async (response) => {
      try {
        // Save JWT
        login(response.access_token);

        // Fetch and cache current user
        await queryClient.fetchQuery({
          queryKey: QUERY_KEYS.CURRENT_USER,
          queryFn: authService.getCurrentUser,
        });

        toast.success("Welcome back!");

        navigate(ROUTES.DASHBOARD, {
          replace: true,
        });
      } catch {
        logout();

        toast.error(
          "Unable to load your profile."
        );
      }
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.detail ??
          "Login failed."
      );
    },

    onSettled: () => {
      setLoading(false);
    },
  });
}