import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { projectService } from "../services/projectService";

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      projectService.updateProject(id, data),

    onSuccess: (_, variables) => {
      toast.success("Project updated successfully.");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECT(variables.id),
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.detail ??
          "Unable to update project."
      );
    },
  });
}