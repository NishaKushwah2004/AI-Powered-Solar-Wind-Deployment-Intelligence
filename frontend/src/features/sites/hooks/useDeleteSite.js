import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { siteService } from "../services/siteService";

export function useDeleteSite() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      siteService.deleteSite,

    onSuccess: () => {
      toast.success(
        "Site deleted successfully."
      );

      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.SITES,
      });
    },
  });
}