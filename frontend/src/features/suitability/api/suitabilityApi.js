import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const evaluateSiteSuitability = async (
  siteId,
  intelligence
) => {
  const response = await api.post(
    API_ENDPOINTS.SUITABILITY.SITES(siteId).EVALUATE,
    intelligence
  );

  return response.data;
};