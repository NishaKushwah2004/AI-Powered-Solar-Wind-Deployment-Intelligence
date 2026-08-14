import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { assessmentService } from "../services/assessmentService";

export function useProjectAssessment(
  projectId
) {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT_ASSESSMENT(projectId),

    queryFn: () =>
      assessmentService.getProjectReport(
        projectId
      ),

    enabled: Boolean(projectId),

    staleTime: 1000 * 60 * 10,
  });
}