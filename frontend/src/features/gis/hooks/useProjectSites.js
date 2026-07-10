import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { gisService } from "../services/gisService";

export function useProjectSites(projectId) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.GIS_SITES,
      projectId,
    ],

    queryFn: () =>
      gisService.getProjectSites(projectId),

    enabled: !!projectId,
  });
}