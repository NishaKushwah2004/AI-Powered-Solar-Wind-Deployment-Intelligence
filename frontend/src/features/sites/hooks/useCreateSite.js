import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { siteService } from "../services/siteService";

export function useCreateSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: siteService.createSite,

    onSuccess: () => {
      toast.success(
        "Site created successfully."
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SITES,
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.detail ??
          "Unable to create site."
      );
    },
  });
}