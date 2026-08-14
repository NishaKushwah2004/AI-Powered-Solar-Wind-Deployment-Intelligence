import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";


export async function getProjectManagerDashboard() {

    const response = await api.get(
        API_ENDPOINTS.PROJECT_MANAGER_DASHBOARD
    );

    return response.data;
}