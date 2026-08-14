import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { dashboardService } from "../services/dashboardService";

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD,
    queryFn: dashboardService.getSummary,

    staleTime: 1000 * 60 * 5,      // 5 minutes
    gcTime: 1000 * 60 * 10,        // 10 minutes

    retry: 1,

    refetchOnWindowFocus: false,
  });
}