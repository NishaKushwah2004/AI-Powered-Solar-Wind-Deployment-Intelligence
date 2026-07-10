export default function Footer() {
  return (
    <footer className="border-t bg-white">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">

        <div>

          <h3 className="font-semibold">

            AI-Powered Solar & Wind Deployment Intelligence

          </h3>

          <p className="mt-2 text-sm text-slate-500">

            Renewable Energy Planning Platform

          </p>

        </div>

        <div className="text-sm text-slate-500">

          © {new Date().getFullYear()} AI-Powered Solar & Wind Deployment Intelligence.

        </div>

      </div>

    </footer>
  );
}