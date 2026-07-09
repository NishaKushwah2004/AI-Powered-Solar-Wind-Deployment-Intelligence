import api from "../axios";

export async function getGeoJsonSites() {
    const response = await api.get(
        "/gis/sites"
    );

    return response.data;
}

export async function getMapConfig() {
    const response = await api.get(
        "/gis/config"
    );

    return response.data;
}