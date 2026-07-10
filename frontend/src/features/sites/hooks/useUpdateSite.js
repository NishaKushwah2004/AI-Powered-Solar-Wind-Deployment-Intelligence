import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { siteService } from "../services/siteService";

export function useUpdateSite() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }) =>
      siteService.updateSite(
        id,
        data
      ),

    onSuccess: () => {
      toast.success(
        "Site updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.SITES,
      });
    },
  });
}