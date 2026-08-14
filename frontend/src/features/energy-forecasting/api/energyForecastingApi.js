import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const forecastSiteEnergy = async (
  siteId,
  intelligence
) => {
  const response = await api.post(
    API_ENDPOINTS.ENERGY_FORECASTING.SITES(siteId),
    intelligence
  );

  return response.data;
};