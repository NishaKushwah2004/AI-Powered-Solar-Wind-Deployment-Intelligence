import { Table } from "@/components/ui";

import SiteTableRow from "./SiteTableRow";

export default function SiteTable({
  sites,
  onEdit,
  onDelete,
  onEnvironment,
  onAssessment,
  onPrediction,
}) {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>
            Site
          </Table.HeaderCell>

          <Table.HeaderCell>
            Description
          </Table.HeaderCell>

          <Table.HeaderCell>
            Latitude
          </Table.HeaderCell>

          <Table.HeaderCell>
            Longitude
          </Table.HeaderCell>

          <Table.HeaderCell>
            Project
          </Table.HeaderCell>

          <Table.HeaderCell>
            Actions
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {sites.map((site) => (
          <SiteTableRow
            key={site.id}
            site={site}
            onEdit={onEdit}
            onDelete={onDelete}
            onEnvironment={onEnvironment}
            onAssessment={onAssessment}
            onPrediction={onPrediction}
          />
        ))}
      </Table.Body>
    </Table>
  );
}