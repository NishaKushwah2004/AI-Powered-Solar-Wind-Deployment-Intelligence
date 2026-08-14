import {
    getProjectManagerDashboard,
} from "../api/projectManagerDashboardApi";


const projectManagerDashboardService = {

    async getDashboardData() {

        return await getProjectManagerDashboard();

    },

};


export default projectManagerDashboardService;