import { useMutation } from "@tanstack/react-query";

import {
  evaluateInvestment,
} from "../api/investmentRecommendationApi";


export const useInvestmentRecommendation = () => {
  return useMutation({
    mutationFn: ({
      siteId,
      intelligence,
    }) =>
      evaluateInvestment(
        siteId,
        intelligence
      ),
  });
};