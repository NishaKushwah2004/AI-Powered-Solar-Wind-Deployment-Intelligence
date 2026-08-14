import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { gisService } from "../services/gisService";

export function useSitesGeoJSON() {
  return useQuery({
    queryKey: QUERY_KEYS.GIS_SITES,

    queryFn: gisService.getSites,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}