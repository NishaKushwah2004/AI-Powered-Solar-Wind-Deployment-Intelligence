import { useMutation } from "@tanstack/react-query";

import {
  evaluateSiteSuitability,
} from "../api/suitabilityApi";

export const useSiteSuitability = () => {
  return useMutation({
    mutationFn: ({
      siteId,
      intelligence,
    }) =>
      evaluateSiteSuitability(
        siteId,
        intelligence
      ),
  });
};