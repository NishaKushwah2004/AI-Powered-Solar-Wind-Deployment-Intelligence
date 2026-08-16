import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, UserCog, Server, Wrench } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import { Card, CardBody, CardHeader, CardTitle } from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import * as authApi from "../../api/authApi.js";
import { useAuth } from "../../hooks/useAuth.js";
import { ALL_ROLES } from "../../utils/roles.js";

export default function AdminDashboard() {
  const { user } = useAuth();

  const {
    data: admin,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: authApi.getAdminDashboard,
  });

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Platform-wide administration overview."
      />

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {isError && <ErrorState error={error} onRetry={refetch} />}

      {admin && (
        <div className="space-y-4">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <Badge tone="navy">
                <ShieldCheck className="h-3 w-3" /> Admin access
              </Badge>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-ink">{admin.message}</p>
            </CardBody>
          </Card>

          {/* Current user / role */}
          <Card>
            <CardHeader>
              <CardTitle>Current User &amp; Role</CardTitle>
            </CardHeader>
            <CardBody className="grid gap-3 sm:grid-cols-2">
              <InfoRow icon={UserCog} label="Signed in as" value={admin.user} />
              <InfoRow
                icon={ShieldCheck}
                label="Role"
                value={admin.role}
                badge
              />
              {user?.email && (
                <InfoRow label="Email" value={user.email} />
              )}
            </CardBody>
          </Card>

          {/* System information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <Server className="h-4 w-4 text-ink-faint" />
            </CardHeader>
            <CardBody className="space-y-2 text-sm">
              <Row label="Platform" value="Helios Grid" />
              <Row label="Access level" value="Administrator" />
              <Row
                label="Platform roles"
                value={ALL_ROLES.join(", ")}
              />
            </CardBody>
          </Card>

          {/* Future administration area */}
          <Card>
            <CardHeader>
              <CardTitle>Future Administration Area</CardTitle>
              <Wrench className="h-4 w-4 text-ink-faint" />
            </CardHeader>
            <CardBody>
              <EmptyState
                icon={Wrench}
                title="More administrative tools coming soon"
                description="User management, role management, and other administrative capabilities will appear here once they are available on the backend."
              />
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, badge }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border p-3">
      {Icon && (
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-muted text-ink-subtle">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <div>
        <p className="text-xs text-ink-faint">{label}</p>
        {badge ? (
          <Badge tone="navy" className="mt-0.5">
            {value}
          </Badge>
        ) : (
          <p className="text-sm font-medium text-ink">{value}</p>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-1.5 last:border-0">
      <span className="text-ink-faint">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}