import { useQuery } from "@tanstack/react-query";

import { environmentalService } from "../services/environmentalService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useSiteEnvironment(siteId) {
  return useQuery({
    queryKey: QUERY_KEYS.SITE_ENVIRONMENT(siteId),

    queryFn: () =>
      environmentalService.getSiteEnvironment(
        siteId
      ),

    enabled: Boolean(siteId),

    staleTime: 1000 * 60 * 5,
  });
}