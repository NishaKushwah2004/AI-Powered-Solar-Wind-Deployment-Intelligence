import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { assessmentService } from "../services/assessmentService";

export function useSiteAssessment(siteId) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.ASSESSMENT,
      "site",
      siteId,
    ],

    queryFn: () =>
      assessmentService.getSiteReport(siteId),

    enabled: Boolean(siteId),

    staleTime: 1000 * 60 * 10,
  });
}