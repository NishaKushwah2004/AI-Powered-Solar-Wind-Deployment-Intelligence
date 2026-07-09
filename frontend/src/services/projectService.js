import {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from "../api/projects/projectApi";

class ProjectService {
    async getAllProjects() {
        return await getProjects();
    }

    async getProjectById(id) {
        return await getProject(id);
    }

    async createProject(project) {
        return await createProject(project);
    }

    async updateProject(id, project) {
        return await updateProject(id, project);
    }

    async deleteProject(id) {
        return await deleteProject(id);
    }
}

export default new ProjectService();