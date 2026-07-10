import Table from "@/components/ui/Table";

import ProjectTableRow from "./ProjectTableRow";

export default function ProjectTable({
  projects,
  onEdit,
  onDelete,
}) {
  return (
    <Table>

      <Table.Head>

        <Table.Row>

          <Table.HeaderCell>
            Project
          </Table.HeaderCell>

          <Table.HeaderCell>
            Region
          </Table.HeaderCell>

          <Table.HeaderCell>
            Description
          </Table.HeaderCell>

          <Table.HeaderCell>
            Created By
          </Table.HeaderCell>

          <Table.HeaderCell>
            Actions
          </Table.HeaderCell>

        </Table.Row>

      </Table.Head>

      <Table.Body>

        {projects.map((project) => (
          <ProjectTableRow
            key={project.id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

      </Table.Body>

    </Table>
  );
}