import { Link } from "react-router-dom";

import { Button } from "@/components/ui";

import { ROUTES } from "@/config/navigation/routes";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-teal-600 to-cyan-600 py-24 text-white">

      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-4xl font-bold">

          Ready to Start Planning?

        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-teal-100">

          Manage renewable energy projects,
          visualize sites on GIS maps,
          and streamline deployment planning.

        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link to={ROUTES.REGISTER}>

            <Button variant="secondary">

              Create Account

            </Button>

          </Link>

          <Link to={ROUTES.LOGIN}>

            <Button variant="outline">

              Login

            </Button>

          </Link>

        </div>

      </div>

    </section>
  );
}