import { useQuery } from "@tanstack/react-query";

import { environmentalService } from "../services/environmentalService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useProjectEnvironment(
  projectId
) {
  return useQuery({
    queryKey:
      QUERY_KEYS.PROJECT_ENVIRONMENT(
        projectId
      ),

    queryFn: () =>
      environmentalService.getProjectEnvironment(
        projectId
      ),

    enabled: Boolean(projectId),

    staleTime: 1000 * 60 * 5,
  });
}