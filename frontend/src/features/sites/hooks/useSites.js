import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { siteService } from "../services/siteService";

export function useSites() {
  return useQuery({
    queryKey: QUERY_KEYS.SITES,
    queryFn: siteService.getSites,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}