import { Search, Plus } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ProjectHeader({
  search,
  onSearch,
  onCreate,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <p className="mt-1 text-slate-500">
          Manage renewable energy projects.
        </p>
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Search projects..."
          aria-label="Search Projects"
          autoComplete="off"
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          leftIcon={<Search size={18} />}
        />

        <Button
          type="button"
          onClick={onCreate}
        >
          <Plus size={18} />
          New Project
        </Button>
      </div>
    </div>
  );
}