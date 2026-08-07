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
      toast.success("Account created successfully.");

      navigate(ROUTES.LOGIN, {
        replace: true,
      });
    },

    onError: (error) => {
      const status = error?.response?.status;
      const detail = error?.response?.data?.detail;

      if (status === 422) {
        toast.error(detail || "Please check the entered information.");
        return;
      }

      if (status === 409) {
        toast.error(detail || "An account with this email already exists.");
        return;
      }

      toast.error(detail || "Registration failed. Please try again.");
    },
  });
}