import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { useAuth } from "@/features/auth/context/useAuth";

import { profileService } from "../services/profileService";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { setUser } = useAuth();

  return useMutation({
    mutationFn: profileService.updateProfile,

    onSuccess: (updatedUser) => {
      // Update AuthContext immediately
      setUser(updatedUser);

      // Refresh profile query cache
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROFILE,
      });

      toast.success(
        "Profile updated successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.detail ||
          "Failed to update profile."
      );
    },
  });
}