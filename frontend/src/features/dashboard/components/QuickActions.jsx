import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";

import { ROUTES } from "@/config/navigation/routes";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="mb-8">

      <h2 className="mb-4 text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4">

        <Button
          onClick={() =>
            navigate(ROUTES.PROJECTS)
          }
        >
          New Project
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            navigate(ROUTES.SITES)
          }
        >
          Add Site
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            navigate(ROUTES.GIS)
          }
        >
          Open GIS
        </Button>

      </div>

    </div>
  );
}