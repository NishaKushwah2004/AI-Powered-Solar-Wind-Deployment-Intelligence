import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ArrowLeft, Pencil, Trash2, Plus, MapPinned } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Button from "../../components/ui/Button.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import { Card, CardBody, CardHeader, CardTitle } from "../../components/ui/Card.jsx";
import { Table, THead, Th, TBody, Tr, Td } from "../../components/ui/Table.jsx";
import { deleteProject, getProject } from "../../api/projectApi.js";
import { getSitesByProject } from "../../api/siteApi.js";
import { formatDate } from "../../utils/formatters.js";
import { useAuth } from "../../hooks/useAuth.js";
import { hasRole, ROLES } from "../../utils/roles.js";
import { extractErrorMessage } from "../../api/axiosClient.js";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    data: project,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });

  const { data: sites, isLoading: sitesLoading } = useQuery({
    queryKey: ["project-sites", projectId],
    queryFn: () => getSitesByProject(projectId),
    enabled: Boolean(project),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      toast.success("Project deleted");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/projects");
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const canEdit = hasRole(user, ROLES.ADMIN, ROLES.PROJECT_MANAGER);
  const canDelete = hasRole(user, ROLES.ADMIN);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }
  if (isError) return <ErrorState error={error} onRetry={refetch} />;
  if (!project) return null;

  return (
    <div>
      <Link
        to="/projects"
        className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-ink-faint hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
      </Link>

      <PageHeader
        title={project.name}
        description={project.description || "No description provided."}
        actions={
          <>
            {canEdit && (
              <Link to={`/projects/${projectId}/edit`}>
                <Button variant="secondary" size="sm">
                  <Pencil className="h-4 w-4" /> Edit
                </Button>
              </Link>
            )}
            {canDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => setConfirmOpen(true)}
              >
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            )}
          </>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <InfoCard label="Region" value={project.region} />
        <InfoCard label="Sites" value={sites?.length ?? "\u2014"} />
        <InfoCard label="Created" value={formatDate(project.created_at)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sites in this project</CardTitle>
          {canEdit && (
            <Link to={`/sites/new?project_id=${projectId}`}>
              <Button variant="secondary" size="sm">
                <Plus className="h-4 w-4" /> Add site
              </Button>
            </Link>
          )}
        </CardHeader>
        <CardBody className="p-0">
          {sitesLoading && (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          )}
          {sites && sites.length === 0 && (
            <div className="p-5">
              <EmptyState
                icon={MapPinned}
                title="No sites yet"
                description="Add a site to this project to begin GIS enrichment and analysis."
              />
            </div>
          )}
          {sites && sites.length > 0 && (
            <Table>
              <THead>
                <Th>Site</Th>
                <Th>Region</Th>
                <Th>Land use</Th>
                <Th>Elevation</Th>
                <Th />
              </THead>
              <TBody>
                {sites.map((site) => (
                  <Tr key={site.id}>
                    <Td>
                      <Link
                        to={`/sites/${site.id}`}
                        className="font-medium text-ink hover:text-brand-700"
                      >
                        {site.name}
                      </Link>
                    </Td>
                    <Td className="text-ink-subtle">{site.region || "\u2014"}</Td>
                    <Td>
                      {site.land_use ? (
                        <Badge tone="info">{site.land_use}</Badge>
                      ) : (
                        <span className="text-ink-faint">Not enriched</span>
                      )}
                    </Td>
                    <Td className="text-ink-subtle">
                      {site.elevation ?? "\u2014"}
                    </Td>
                    <Td>
                      <Link
                        to={`/sites/${site.id}`}
                        className="text-xs font-medium text-brand-700 hover:underline"
                      >
                        View
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          )}
        </CardBody>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
        title="Delete this project?"
        description="This permanently removes the project. This action cannot be undone."
        confirmLabel="Delete project"
        danger
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-white p-4 shadow-card">
      <p className="text-xs text-ink-faint">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
