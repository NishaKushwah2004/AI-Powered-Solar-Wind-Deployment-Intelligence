import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";

import { useAuth } from "@/features/auth/context/useAuth";

import { ROUTES } from "@/config/navigation/routes";

export default function QuickActions() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const role = user?.role?.name;

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4">
        {(role === "Admin" ||
          role === "Project Manager") && (
          <>
            <Button
              onClick={() =>
                navigate(ROUTES.PROJECTS)
              }
            >
              Projects
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                navigate(ROUTES.SITES)
              }
            >
              Sites
            </Button>
          </>
        )}

        {(role === "Admin" ||
          role === "GIS Analyst" ||
          role ===
            "Renewable Energy Planner") && (
          <>
            <Button
              variant="outline"
              onClick={() =>
                navigate(ROUTES.GIS)
              }
            >
              GIS
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                navigate(ROUTES.SITES)
              }
            >
              Environmental
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                navigate(ROUTES.SITES)
              }
            >
              Assessment
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                navigate(ROUTES.SITES)
              }
            >
              Prediction
            </Button>
          </>
        )}
      </div>
    </div>
  );
}