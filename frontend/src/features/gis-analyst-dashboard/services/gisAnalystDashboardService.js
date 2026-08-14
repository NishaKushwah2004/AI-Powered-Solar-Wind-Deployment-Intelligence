import { getGISAnalystDashboard } from "../api/gisAnalystDashboardApi"

const gisAnalystDashboardService = {

    async getDashboardData() {

        return await getGISAnalystDashboard();

    },

};


export default gisAnalystDashboardService;