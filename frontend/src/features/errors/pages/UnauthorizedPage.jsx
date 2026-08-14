import { Link } from "react-router-dom";
import { Home, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui";
import { ROUTES } from "@/config/navigation/routes";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-lg text-center">
        <ShieldAlert
          size={72}
          className="mx-auto text-red-500"
        />

        <h1 className="mt-6 text-4xl font-bold text-slate-900">
          Access Denied
        </h1>

        <p className="mt-4 text-slate-600">
          You don't have permission to access this page.
          Please contact your administrator if you believe this is an error.
        </p>

        <div className="mt-8">
          <Link to={ROUTES.DASHBOARD}>
            <Button type="button">
              <Home size={18} />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}