import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { predictionService } from "../services/predictionService";

export function useProjectPrediction(
  projectId
) {
  return useQuery({
    queryKey:
      QUERY_KEYS.PREDICTION_PROJECT(
        projectId
      ),

    queryFn: () =>
      predictionService.getProjectPrediction(
        projectId
      ),

    enabled: !!projectId,
  });
}