import { useQuery } from "@tanstack/react-query";

import { siteService } from "../services/siteService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useSites() {
  return useQuery({
    queryKey: QUERY_KEYS.SITES,
    queryFn: siteService.getSites,
  });
}