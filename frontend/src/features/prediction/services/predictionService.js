import { predictionApi } from "../api/predictionApi";

export const predictionService = {
  async getSitePrediction(siteId) {
    const { data } =
      await predictionApi.getSitePrediction(
        siteId
      );

    return data;
  },

  async getProjectPrediction(projectId) {
    const { data } =
      await predictionApi.getProjectPrediction(
        projectId
      );

    return data;
  },
};