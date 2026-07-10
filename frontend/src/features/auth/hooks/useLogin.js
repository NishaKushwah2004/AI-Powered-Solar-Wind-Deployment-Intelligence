import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import { ROUTES } from "@/config/navigation/routes";

export function useLogin() {
  const navigate = useNavigate();

  const {
    login,
    setUser,
    setLoading,
  } = useAuth();

  return useMutation({
    mutationFn: authService.login,

    onMutate: () => {
      setLoading(true);
    },

    onSuccess: async (data) => {
      login(data.access_token);

      const user =
        await authService.getCurrentUser();

      setUser(user);

      toast.success("Welcome back!");

      navigate(
        ROUTES.DASHBOARD,
        {
          replace: true,
        }
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.detail ??
          "Login failed."
      );
    },

    onSettled: () => {
      setLoading(false);
    },
  });
}