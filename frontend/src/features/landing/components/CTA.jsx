import {
  ArrowRight,
  LogIn,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";

import { ROUTES } from "@/config/navigation/routes";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold">
          Start Your Renewable Energy Journey
        </span>

        <h2 className="mt-8 text-4xl font-bold lg:text-5xl">
          Build Smarter Renewable Energy Projects
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90">
          Plan projects, analyze environmental conditions,
          evaluate renewable energy potential and generate
          AI-powered deployment recommendations from one
          integrated platform.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Link to={ROUTES.REGISTER}>
            <Button
              className="bg-white text-primary hover:bg-slate-100"
            >
              Get Started

              <ArrowRight size={18} />
            </Button>
          </Link>

          <Link to={ROUTES.LOGIN}>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <LogIn size={18} />

              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}