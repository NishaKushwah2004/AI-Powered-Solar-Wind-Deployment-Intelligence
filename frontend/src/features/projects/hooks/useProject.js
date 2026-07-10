import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { projectService } from "../services/projectService";

export function useProject(id) {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT(id),

    queryFn: () =>
      projectService.getProject(id),

    enabled: !!id,
  });
}