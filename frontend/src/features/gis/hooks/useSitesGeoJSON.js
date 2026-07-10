import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { gisService } from "../services/gisService";

export function useSitesGeoJSON() {
  return useQuery({
    queryKey: QUERY_KEYS.GIS_SITES,

    queryFn: gisService.getSites,
  });
}