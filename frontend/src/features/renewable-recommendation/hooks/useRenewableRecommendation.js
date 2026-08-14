import { useMutation } from "@tanstack/react-query";

import {
  getRenewableRecommendation,
} from "../api/renewableRecommendationApi";


export const useRenewableRecommendation = () => {
  return useMutation({
    mutationFn: ({
      siteId,
      intelligence,
    }) =>
      getRenewableRecommendation(
        siteId,
        intelligence
      ),
  });
};