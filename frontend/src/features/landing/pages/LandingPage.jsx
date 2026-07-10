import {
  CTA,
  Features,
  Footer,
  Hero,
  Modules,
} from "../components";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <Hero />

      <Features />

      <Modules />

      <CTA />

      <Footer />

    </main>
  );
}