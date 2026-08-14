import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";


export async function getPlannerDashboard() {

    const response = await api.get(
        API_ENDPOINTS.PLANNER_DASHBOARD
    );

    return response.data;
}