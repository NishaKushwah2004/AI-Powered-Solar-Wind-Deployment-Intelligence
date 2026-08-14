import { useMutation } from "@tanstack/react-query";

import {
  optimizeDeployment,
} from "../api/deploymentOptimizationApi";


export const useDeploymentOptimization = () => {
  return useMutation({
    mutationFn: ({
      siteId,
      intelligence,
    }) =>
      optimizeDeployment(
        siteId,
        intelligence
      ),
  });
};