import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const getRenewableRecommendation = async (
  siteId,
  intelligence
) => {
  const response = await api.post(
    API_ENDPOINTS.RENEWABLE_RECOMMENDATION.SITES(siteId),
    intelligence
  );

  return response.data;
};