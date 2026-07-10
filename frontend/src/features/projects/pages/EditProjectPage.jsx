import { useNavigate, useParams } from "react-router-dom";

import Spinner from "@/components/ui/Spinner";

import DataState from "@/components/feedback/DataState";

import { Card } from "@/components/ui";

import { ROUTES } from "@/config/navigation/routes";

import { useProject } from "../hooks/useProject";
import { useUpdateProject } from "../hooks/useUpdateProject";

import { ProjectForm } from "../components";

export default function EditProjectPage() {
  const { projectId } = useParams();

  const navigate = useNavigate();

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useProject(projectId);

  const updateProject = useUpdateProject();

  const handleSubmit = (data) => {
    updateProject.mutate(
      {
        id: projectId,
        data,
      },
      {
        onSuccess: () => {
          navigate(ROUTES.PROJECTS);
        },
      }
    );
  };

  return (
    <DataState
      isLoading={isLoading}
      isError={isError}
      error={error}
      loading={<Spinner />}
    >
      <Card>

        <Card.Header>

          <h1 className="text-2xl font-bold">
            Edit Project
          </h1>

        </Card.Header>

        <Card.Body>

          <ProjectForm
            defaultValues={project}
            loading={updateProject.isPending}
            submitLabel="Update Project"
            onSubmit={handleSubmit}
          />

        </Card.Body>

      </Card>
    </DataState>
  );
}