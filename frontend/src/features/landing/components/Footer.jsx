import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Solar & Wind AI
          </h2>

          <p className="mt-5 leading-7 text-slate-400">
            AI-powered renewable energy intelligence
            platform combining GIS, environmental
            analytics and machine learning for
            smarter deployment decisions.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Platform
          </h3>

          <ul className="space-y-3 text-slate-400">
            <li>Projects</li>
            <li>Sites</li>
            <li>GIS Intelligence</li>
            <li>Environmental Analysis</li>
            <li>Resource Assessment</li>
            <li>Prediction Engine</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Intelligence
          </h3>

          <ul className="space-y-3 text-slate-400">
            <li>Solar Analytics</li>
            <li>Wind Analytics</li>
            <li>Hybrid Prediction</li>
            <li>Site Suitability</li>
            <li>Deployment Planning</li>
            <li>Investment Insights</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Connect
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>India</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>support@renewable-ai.com</span>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="rounded-xl bg-slate-800 p-3 transition hover:bg-primary">
                <FaGithub size={20} />
              </button>

              <button className="rounded-xl bg-slate-800 p-3 transition hover:bg-primary">
                <FaLinkedin size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-slate-500 md:flex-row">
          <p>
            © {year} AI-Powered Solar & Wind Deployment
            Intelligence Platform.
          </p>

          <p>
            Built with React, FastAPI and GIS Intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}