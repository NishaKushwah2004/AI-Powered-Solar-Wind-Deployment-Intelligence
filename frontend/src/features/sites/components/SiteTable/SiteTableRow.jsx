import {
  Leaf,
  BarChart3,
  Zap,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button, Table } from "@/components/ui";

import { truncateText } from "@/utils/formatText";

export default function SiteTableRow({
  site,
  onEdit,
  onDelete,
  onEnvironment,
  onAssessment,
  onPrediction,
}) {
  const project =
    site.project?.name ??
    site.project_name ??
    site.project_id;

  return (
    <Table.Row>
      <Table.Cell>
        {site.name}
      </Table.Cell>

      <Table.Cell>
        {truncateText(site.description ?? "-")}
      </Table.Cell>

      <Table.Cell>
        {Number(site.latitude).toFixed(6)}
      </Table.Cell>

      <Table.Cell>
        {Number(site.longitude).toFixed(6)}
      </Table.Cell>

      <Table.Cell>
        {project}
      </Table.Cell>

      <Table.Cell>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            title="Edit Site"
            aria-label="Edit Site"
            onClick={() => onEdit(site)}
          >
            <Pencil size={16} />
          </Button>

          <Button
            size="sm"
            variant="success"
            title="Environmental Analysis"
            aria-label="Environmental Analysis"
            onClick={() => onEnvironment(site)}
          >
            <Leaf size={16} />
          </Button>

          <Button
            size="sm"
            variant="primary"
            title="Resource Assessment"
            aria-label="Resource Assessment"
            onClick={() => onAssessment(site)}
          >
            <BarChart3 size={16} />
          </Button>

          <Button
            size="sm"
            variant="secondary"
            title="Prediction"
            aria-label="Prediction"
            onClick={() => onPrediction(site)}
          >
            <Zap size={16} />
          </Button>

          <Button
            size="sm"
            variant="danger"
            title="Delete Site"
            aria-label="Delete Site"
            onClick={() => onDelete(site)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}