import { Pencil, Trash2 } from "lucide-react";

import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";

import { truncateText } from "@/utils/formatText";

export default function ProjectTableRow({
  project,
  onEdit,
  onDelete,
}) {
  const createdBy =
    project.created_by_name ??
    project.created_by?.full_name ??
    project.created_by ??
    "-";

  return (
    <Table.Row>
      <Table.Cell>
        {project.name}
      </Table.Cell>

      <Table.Cell>
        {project.region}
      </Table.Cell>

      <Table.Cell>
        {truncateText(project.description ?? "-")}
      </Table.Cell>

      <Table.Cell>
        {createdBy}
      </Table.Cell>

      <Table.Cell>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            title="Edit Project"
            aria-label="Edit Project"
            onClick={() => onEdit(project)}
          >
            <Pencil size={16} />
          </Button>

          <Button
            size="sm"
            variant="danger"
            title="Delete Project"
            aria-label="Delete Project"
            onClick={() => onDelete(project)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}