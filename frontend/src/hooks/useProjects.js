import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import projectService from "../services/projectService";

export default function useProjects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProjects = useCallback(async () => {

        try {

            setLoading(true);

            const data =
                await projectService.getAllProjects();

            setProjects(data);

        } catch (error) {

            toast.error(
                error.response?.data?.detail ??
                "Failed to load projects."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadProjects();

    }, [loadProjects]);

    const createProject = async (project) => {

        try {

            await projectService.createProject(project);

            toast.success(
                "Project created successfully."
            );

            await loadProjects();

            return true;

        } catch (error) {

            toast.error(
                error.response?.data?.detail ??
                "Failed to create project."
            );

            return false;

        }

    };

    const updateProject = async (id, project) => {

        try {

            await projectService.updateProject(
                id,
                project,
            );

            toast.success(
                "Project updated successfully."
            );

            await loadProjects();

            return true;

        } catch (error) {

            toast.error(
                error.response?.data?.detail ??
                "Failed to update project."
            );

            return false;

        }

    };

    const deleteProject = async (id) => {

        try {

            await projectService.deleteProject(id);

            toast.success(
                "Project deleted successfully."
            );

            await loadProjects();

            return true;

        } catch (error) {

            toast.error(
                error.response?.data?.detail ??
                "Failed to delete project."
            );

            return false;

        }

    };

    return {

        projects,

        loading,

        loadProjects,

        createProject,

        updateProject,

        deleteProject,

    };

}