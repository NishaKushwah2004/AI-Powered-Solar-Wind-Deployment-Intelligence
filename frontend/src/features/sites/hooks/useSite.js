import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { siteService } from "../services/siteService";

QUERY_KEYS.SITE = (id) => [...QUERY_KEYS.SITES, id];

export function useSite(id) {
  
  return useQuery({
    queryKey: QUERY_KEYS.SITE(id),

    queryFn: () =>
      siteService.getSite(id),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}