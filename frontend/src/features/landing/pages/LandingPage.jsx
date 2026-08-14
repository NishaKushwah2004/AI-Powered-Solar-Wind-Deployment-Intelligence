import {
  CTA,
  Capabilities,
  Workflow,
  Footer,
  Hero,
  Statistics,
  WhyChooseUs,
} from "../components";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <Hero />

      <Statistics />

      <Capabilities />

      <Workflow />

      <WhyChooseUs />

      <CTA />

      <Footer />

    </main>
  );
}