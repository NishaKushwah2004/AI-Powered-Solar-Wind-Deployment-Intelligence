import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { authService } from "../services/authService";

import { ROUTES } from "@/config/navigation/routes";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,

    onSuccess: () => {
      toast.success(
        "Account created successfully."
      );

      navigate(
        ROUTES.LOGIN,
        {
          replace: true,
        }
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.detail ??
          "Registration failed."
      );
    },
  });
}