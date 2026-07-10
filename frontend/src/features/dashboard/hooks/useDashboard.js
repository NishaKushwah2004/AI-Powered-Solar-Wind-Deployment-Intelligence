import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "../services/dashboardService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD,
    queryFn: dashboardService.getSummary,
    staleTime: 1000 * 60 * 5,
  });
}