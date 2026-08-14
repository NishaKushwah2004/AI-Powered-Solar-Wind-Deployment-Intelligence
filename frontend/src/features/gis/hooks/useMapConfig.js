import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { gisService } from "../services/gisService";

export function useMapConfig() {
  return useQuery({
    queryKey: QUERY_KEYS.GIS_CONFIG,

    queryFn: gisService.getConfig,

    staleTime: Infinity,
    gcTime: Infinity,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}