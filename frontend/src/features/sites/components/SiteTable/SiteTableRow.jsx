import { Pencil, Trash2 } from "lucide-react";

import { Button, Table } from "@/components/ui";

import { truncateText } from "@/utils/formatText";

export default function SiteTableRow({
  site,
  onEdit,
  onDelete,
}) {
  return (
    <Table.Row>

      <Table.Cell>{site.name}</Table.Cell>

      <Table.Cell>
        {truncateText(site.description)}
      </Table.Cell>

      <Table.Cell>
        {site.latitude}
      </Table.Cell>

      <Table.Cell>
        {site.longitude}
      </Table.Cell>

      <Table.Cell>
        {site.project_id}
      </Table.Cell>

      <Table.Cell>

        <div className="flex gap-2">

          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(site)}
          >
            <Pencil size={16} />
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() =>
              onDelete(site)
            }
          >
            <Trash2 size={16} />
          </Button>

        </div>

      </Table.Cell>

    </Table.Row>
  );
}