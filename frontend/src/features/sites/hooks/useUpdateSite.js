import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { siteService } from "../services/siteService";

export function useUpdateSite() {
  const queryClient = useQueryClient();
  
  

  return useMutation({
    mutationFn: ({ id, data }) =>
      siteService.updateSite(id, data),

    onSuccess: (_, variables) => {
      toast.success(
        "Site updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SITES,
      });

      queryClient.invalidateQueries({
        queryKey: [
          ...QUERY_KEYS.SITES,
          variables.id,
        ],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.detail ??
          "Unable to update site."
      );
    },
  });
}