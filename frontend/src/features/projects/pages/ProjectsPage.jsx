import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DataState from "@/components/feedback/DataState";

import { ROUTES } from "@/config/navigation/routes";

import { useProjects } from "../hooks/useProjects";
import { useDeleteProject } from "../hooks/useDeleteProject";

import {
  ProjectHeader,
  ProjectTable,
  EmptyProjects,
  DeleteProjectDialog,
} from "../components";

export default function ProjectsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [selectedProject, setSelectedProject] =
    useState(null);

  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useProjects();

  const deleteMutation =
    useDeleteProject();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [projects, search]);

  const handleCreate = () => {
    navigate(ROUTES.PROJECT_CREATE);
  };

  const handleEdit = (project) => {
    navigate(ROUTES.projectEdit(project.id));
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(selectedProject.id);

    setSelectedProject(null);
  };

  return (
    <>
      <ProjectHeader
        search={search}
        onSearch={setSearch}
        onCreate={handleCreate}
      />

      <DataState
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={!filteredProjects.length}
        empty={<EmptyProjects />}
      >
        <ProjectTable
          projects={filteredProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </DataState>

      <DeleteProjectDialog
        open={!!selectedProject}
        projectName={
          selectedProject?.name
        }
        onClose={() =>
          setSelectedProject(null)
        }
        onConfirm={confirmDelete}
      />
    </>
  );
}