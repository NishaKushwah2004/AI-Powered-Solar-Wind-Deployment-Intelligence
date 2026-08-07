import {
  ArrowRight,
  PlayCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui";

import { ROUTES } from "@/config/navigation/routes";

import HeroBadge from "./HeroBadge";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-cyan-50">
      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">
        <div>
          <HeroBadge>
            AI Powered Renewable Intelligence
          </HeroBadge>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">
            Smarter
            <span className="text-primary">
              {" "}
              Solar &
              <br />
              Wind
            </span>
            {" "}Deployment
            <br />
            Intelligence
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            An AI-powered platform that combines
            GIS intelligence, environmental
            analytics, satellite imagery,
            weather forecasting, and machine
            learning to recommend optimal
            renewable energy deployment sites.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to={ROUTES.REGISTER}>
              <Button>
                Get Started

                <ArrowRight
                  size={18}
                />
              </Button>
            </Link>

            <Link to={ROUTES.LOGIN}>
              <Button variant="outline">
                <PlayCircle
                  size={18}
                />

                Login
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <h2 className="text-3xl font-bold">
                AI
              </h2>

              <p className="text-sm text-slate-500">
                Prediction Models
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                GIS
              </h2>

              <p className="text-sm text-slate-500">
                Spatial Intelligence
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                ML
              </h2>

              <p className="text-sm text-slate-500">
                Decision Support
              </p>
            </div>
          </div>
        </div>

        <HeroIllustration />
      </div>
    </section>
  );
}