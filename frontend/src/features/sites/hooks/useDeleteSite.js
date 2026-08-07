import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { siteService } from "../services/siteService";

export function useDeleteSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: siteService.deleteSite,

    onSuccess: () => {
      toast.success(
        "Site deleted successfully."
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SITES,
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.detail ??
          "Unable to delete site."
      );
    },
  });
}