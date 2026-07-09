import api from "../axios";

export async function getProjects() {
    const response = await api.get(
        "/projects"
    );

    return response.data;
}