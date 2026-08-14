import { useMutation } from "@tanstack/react-query";

import {
  calculateSiteScore,
} from "../api/siteScoringApi";


export const useSiteScoring = () => {
  return useMutation({
    mutationFn: ({
      siteId,
      suitabilityData,
    }) =>
      calculateSiteScore(
        siteId,
        suitabilityData
      ),
  });
};