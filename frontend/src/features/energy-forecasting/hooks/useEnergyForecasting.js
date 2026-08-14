import { useMutation } from "@tanstack/react-query";

import {
  forecastSiteEnergy,
} from "../api/energyForecastingApi";


export const useEnergyForecasting = () => {
  return useMutation({
    mutationFn: ({
      siteId,
      intelligence,
    }) =>
      forecastSiteEnergy(
        siteId,
        intelligence
      ),
  });
};