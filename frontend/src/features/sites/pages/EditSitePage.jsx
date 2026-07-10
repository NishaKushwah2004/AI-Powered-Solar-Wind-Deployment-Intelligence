import { useNavigate, useParams } from "react-router-dom";

import Spinner from "@/components/ui/Spinner";
import DataState from "@/components/feedback/DataState";

import { Card } from "@/components/ui";

import { ROUTES } from "@/config/navigation/routes";

import { useSite } from "../hooks/useSite";
import { useUpdateSite } from "../hooks/useUpdateSite";

import { SiteForm } from "../components";

export default function EditSitePage() {
  const { siteId } = useParams();

  const navigate = useNavigate();

  const {
    data: site,
    isLoading,
    isError,
    error,
  } = useSite(siteId);

  const updateSite = useUpdateSite();

  function handleSubmit(data) {
    updateSite.mutate(
      {
        id: siteId,
        data,
      },
      {
        onSuccess: () => {
          navigate(ROUTES.SITES);
        },
      }
    );
  }

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
            Edit Site
          </h1>

        </Card.Header>

        <Card.Body>

          <SiteForm
            defaultValues={site}
            submitLabel="Update Site"
            loading={updateSite.isPending}
            onSubmit={handleSubmit}
          />

        </Card.Body>

      </Card>
    </DataState>
  );
}