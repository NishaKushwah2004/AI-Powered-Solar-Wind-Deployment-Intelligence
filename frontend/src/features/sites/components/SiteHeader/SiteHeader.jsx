import { Plus, Search } from "lucide-react";

import { Button, Input } from "@/components/ui";

export default function SiteHeader({
  search,
  onSearch,
  onCreate,
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold">
          Sites
        </h1>

        <p className="mt-1 text-slate-500">
          Manage project sites.
        </p>
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Search sites..."
          aria-label="Search Sites"
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
          Add Site
        </Button>
      </div>
    </div>
  );
}