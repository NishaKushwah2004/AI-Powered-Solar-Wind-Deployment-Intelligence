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

  const [selectedSite, setSelectedSite] = useState(null);

  const {
    data: sites = [],
    isLoading,
    isError,
    error,
  } = useSites();

  const deleteMutation = useDeleteSite();

  const filteredSites = useMemo(() => {
    return sites.filter((site) =>
      site.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [sites, search]);

  function handleCreate() {
    navigate(ROUTES.SITE_CREATE);
  }

  function handleEdit(site) {
    navigate(ROUTES.siteEdit(site.id));
  }

  function handleDelete(site) {
    setSelectedSite(site);
  }

  function confirmDelete() {
    deleteMutation.mutate(selectedSite.id);

    setSelectedSite(null);
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
        />
      </DataState>

      <DeleteSiteDialog
        open={!!selectedSite}
        siteName={selectedSite?.name}
        onClose={() => setSelectedSite(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}