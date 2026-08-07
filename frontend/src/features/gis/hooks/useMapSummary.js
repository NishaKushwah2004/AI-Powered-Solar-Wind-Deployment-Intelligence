import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { gisService } from "../services/gisService";

export function useMapSummary() {
  return useQuery({
    queryKey: QUERY_KEYS.GIS_SUMMARY,

    queryFn: gisService.getSummary,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}