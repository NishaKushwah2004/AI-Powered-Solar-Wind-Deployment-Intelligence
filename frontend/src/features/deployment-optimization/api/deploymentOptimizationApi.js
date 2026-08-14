import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const optimizeDeployment = async (
  siteId,
  intelligence
) => {
  const response = await api.post(
    API_ENDPOINTS.DEPLOYMENT_OPTIMIZATION.SITES(siteId),
    intelligence
  );

  return response.data;
};