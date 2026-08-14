import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DataState from "@/components/feedback/DataState";

import { ROUTES } from "@/config/navigation/routes";

import { useSites } from "../hooks/useSites";
import { useDeleteSite } from "../hooks/useDeleteSite";

import {
  SiteHeader,
  SiteTable,
  EmptySites,
  DeleteSiteDialog,
} from "../components";

export default function SitesPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [selectedSite, setSelectedSite] =
    useState(null);

  const {
    data: sites = [],
    isLoading,
    isError,
    error,
  } = useSites();

  const deleteMutation = useDeleteSite();

  const filteredSites = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sites;

    return sites.filter((site) => {
      return (
        site.name?.toLowerCase().includes(query) ||
        site.description?.toLowerCase().includes(query) ||
        site.project_name?.toLowerCase().includes(query)
      );
    });
  }, [sites, search]);

  function handleCreate() {
    navigate(ROUTES.SITE_CREATE);
  }

  function handleEdit(site) {
    navigate(
      ROUTES.siteEdit(site.id)
    );
  }

  function handleEnvironment(site) {
    navigate(
      ROUTES.environment(site.id)
    );
  }

  function handleAssessment(site) {
    navigate(
      ROUTES.assessment(site.id)
    );
  }

  function handlePrediction(site) {
    navigate(
      ROUTES.prediction(site.id)
    );
  }

  function handleDelete(site) {
    setSelectedSite(site);
  }

  function confirmDelete() {
    if (!selectedSite) return;

    deleteMutation.mutate(selectedSite.id, {
      onSuccess: () => {
        setSelectedSite(null);
      },
    });
  }

  return (
    <>
      <SiteHeader
        search={search}
        onSearch={setSearch}
        onCreate={handleCreate}
      />

      <DataState
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={!filteredSites.length}
        empty={<EmptySites />}
      >
        <SiteTable
          sites={filteredSites}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onEnvironment={
            handleEnvironment
          }
          onAssessment={
            handleAssessment
          }
          onPrediction={
            handlePrediction
          }
        />
      </DataState>

      <DeleteSiteDialog
        open={!!selectedSite}
        siteName={selectedSite?.name}
        onClose={() =>
          setSelectedSite(null)
        }
        onConfirm={confirmDelete}
      />
    </>
  );
}