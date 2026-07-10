import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui";

import { ROUTES } from "@/config/navigation/routes";

import { useCreateSite } from "../hooks/useCreateSite";

import { SiteForm } from "../components";

export default function CreateSitePage() {
  const navigate = useNavigate();

  const createSite = useCreateSite();

  function handleSubmit(data) {
    createSite.mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.SITES);
      },
    });
  }

  return (
    <Card>
      <Card.Header>

        <h1 className="text-2xl font-bold">
          Create Site
        </h1>

      </Card.Header>

      <Card.Body>

        <SiteForm
          submitLabel="Create Site"
          loading={createSite.isPending}
          onSubmit={handleSubmit}
        />

      </Card.Body>
    </Card>
  );
}