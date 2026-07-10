import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { projectService } from "../services/projectService";

export function useProjects() {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECTS,

    queryFn: projectService.getProjects,

    staleTime: 1000 * 60 * 5,
  });
}