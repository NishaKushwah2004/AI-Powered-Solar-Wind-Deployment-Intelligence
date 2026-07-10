export default function Footer() {
  return (
    <footer className="border-t bg-white">

      <div className="flex items-center justify-between px-6 py-4 text-sm text-slate-500">

        <p>

          © 2026 Solar & Wind Deployment Intelligence

        </p>

        <div className="flex gap-6">

          <span>

            Version {import.meta.env.VITE_APP_VERSION}

          </span>

          <span>

            API Connected

          </span>

        </div>

      </div>

    </footer>
  );
}