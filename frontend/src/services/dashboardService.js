import projectService from "./projectService";
import siteService from "./siteService";

class DashboardService {

    async getDashboardData() {

        const [projects, sites] = await Promise.all([
            projectService.getAllProjects(),
            siteService.getAllSites(),
        ]);

        return {
            totalProjects: projects.length,
            totalSites: sites.length,
            projects,
            sites,
            systemStatus: "Online",
        };
    }
}

export default new DashboardService();