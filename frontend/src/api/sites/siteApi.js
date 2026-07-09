import api from "../axios";

export async function getSites() {
    const response = await api.get(
        "/sites"
    );

    return response.data;
}