import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { projectService } from "../services/projectService";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.deleteProject,

    onSuccess: () => {
      toast.success("Project deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS,
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.detail ??
          "Unable to delete project."
      );
    },
  });
}