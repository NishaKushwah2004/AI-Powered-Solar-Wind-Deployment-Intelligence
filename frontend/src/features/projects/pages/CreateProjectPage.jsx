import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui";

import { ROUTES } from "@/config/navigation/routes";

import { useCreateProject } from "../hooks/useCreateProject";

import { ProjectForm } from "../components";

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const createProject = useCreateProject();

  const handleSubmit = (data) => {
    createProject.mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.PROJECTS);
      },
    });
  };

  return (
    <Card>

      <Card.Header>

        <h1 className="text-2xl font-bold">
          Create Project
        </h1>

      </Card.Header>

      <Card.Body>

        <ProjectForm
          onSubmit={handleSubmit}
          loading={createProject.isPending}
          submitLabel="Create Project"
        />

      </Card.Body>

    </Card>
  );
}