import {
    getPlannerDashboard,
} from "../api/plannerDashboardApi";


const plannerDashboardService = {

    async getDashboardData() {

        return await getPlannerDashboard();

    },

};


export default plannerDashboardService;