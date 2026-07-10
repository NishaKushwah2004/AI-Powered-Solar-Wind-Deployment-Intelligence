import { FolderOpen } from "lucide-react";

export default function EmptyProjects() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed py-20">

      <FolderOpen
        size={60}
        className="text-slate-400"
      />

      <h2 className="mt-5 text-xl font-semibold">

        No Projects Found

      </h2>

      <p className="mt-2 text-slate-500">

        Create your first renewable energy project.

      </p>

    </div>
  );
}