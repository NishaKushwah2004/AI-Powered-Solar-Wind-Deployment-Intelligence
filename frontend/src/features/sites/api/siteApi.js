import axiosClient from "@/services/axios";

const BASE_URL = "/sites";

export const siteApi = {
  getAll() {
    return axiosClient.get(BASE_URL);
  },

  getById(id) {
    return axiosClient.get(`${BASE_URL}/${id}`);
  },

  getByProject(projectId) {
    return axiosClient.get(
      `${BASE_URL}/project/${projectId}`
    );
  },

  create(data) {
    return axiosClient.post(
      BASE_URL,
      data
    );
  },

  update(id, data) {
    return axiosClient.put(
      `${BASE_URL}/${id}`,
      data
    );
  },

  remove(id) {
    return axiosClient.delete(
      `${BASE_URL}/${id}`
    );
  },
};