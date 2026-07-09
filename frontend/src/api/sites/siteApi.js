import api from "../axios";

export async function getSites() {
    const response = await api.get("/sites");
    return response.data;
}

export async function getSite(id) {
    const response = await api.get(`/sites/${id}`);
    return response.data;
}

export async function createSite(data) {
    const response = await api.post("/sites", data);
    return response.data;
}

export async function updateSite(id, data) {
    const response = await api.put(`/sites/${id}`, data);
    return response.data;
}

export async function deleteSite(id) {
    await api.delete(`/sites/${id}`);
}