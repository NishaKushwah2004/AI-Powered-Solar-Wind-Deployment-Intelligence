import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui";
import { ROUTES } from "@/config/navigation/routes";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50">

      {/* Background Decoration */}

      <div className="absolute inset-0 opacity-20">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-300 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-300 blur-3xl" />

      </div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-20">

        <div className="max-w-3xl">

          <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700">

            Renewable Energy Intelligence Platform

          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900 lg:text-6xl">

            AI-Powered{" "}

            <span className="text-teal-600">

              Solar & Wind

            </span>

            <br />

            Deployment Intelligence

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">

            Plan, monitor, and visualize renewable energy
            infrastructure using GIS-powered mapping,
            project management, site intelligence, and
            secure collaboration.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link to={ROUTES.REGISTER}>

              <Button>

                Get Started

                <ArrowRight size={18} />

              </Button>

            </Link>

            <Link to={ROUTES.LOGIN}>

              <Button variant="outline">

                Login

              </Button>

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}