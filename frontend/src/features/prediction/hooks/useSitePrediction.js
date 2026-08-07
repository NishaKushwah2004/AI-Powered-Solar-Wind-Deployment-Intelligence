import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";

import { predictionService } from "../services/predictionService";

export function useSitePrediction(siteId) {
  return useQuery({
    queryKey:
      QUERY_KEYS.PREDICTION_SITE(siteId),

    queryFn: () =>
      predictionService.getSitePrediction(
        siteId
      ),

    enabled: !!siteId,
  });
}