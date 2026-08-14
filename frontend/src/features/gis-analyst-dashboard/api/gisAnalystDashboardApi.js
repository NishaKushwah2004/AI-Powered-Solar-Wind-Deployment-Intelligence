import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";


export async function getGISAnalystDashboard() {

    const response = await api.get(
        API_ENDPOINTS.GIS_ANALYST_DASHBOARD
    );

    return response.data;
}