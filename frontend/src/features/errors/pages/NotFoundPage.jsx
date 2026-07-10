import { Link } from "react-router-dom";
import { Home } from "lucide-react";

import { Button } from "@/components/ui";
import { ROUTES } from "@/config/navigation/routes";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

      <div className="max-w-lg text-center">

        <h1 className="text-8xl font-extrabold text-teal-600">
          404
        </h1>

        <h2 className="mt-6 text-3xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-600">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8">

          <Link to={ROUTES.DASHBOARD}>

            <Button>

              <Home size={18} />

              Back to Dashboard

            </Button>

          </Link>

        </div>

      </div>

    </div>
  );
}