import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { projectService } from "../services/projectService";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.createProject,

    onSuccess: () => {
      toast.success("Project created successfully.");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS,
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.detail ??
          "Unable to create project."
      );
    },
  });
}