import { useQuery } from "@tanstack/react-query";

import { siteService } from "../services/siteService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useSite(id) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.SITES,
      id,
    ],

    queryFn: () =>
      siteService.getSite(id),

    enabled: !!id,
  });
}