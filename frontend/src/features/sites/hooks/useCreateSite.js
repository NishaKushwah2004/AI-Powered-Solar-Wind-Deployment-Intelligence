import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { siteService } from "../services/siteService";

export function useCreateSite() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      siteService.createSite,

    onSuccess: () => {
      toast.success(
        "Site created successfully."
      );

      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.SITES,
      });
    },
  });
}