import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const calculateSiteScore = async (
  siteId,
  suitabilityData
) => {
  const response = await api.post(
    API_ENDPOINTS.SITE_SCORING.SITES(siteId),
    suitabilityData
  );

  return response.data;
};