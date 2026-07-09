import ActionButtons from "../common/ActionButtons";

export default function ProjectRow({
    project,
    onView,
    onEdit,
    onDelete,
}) {
    return (
        <tr className="border-b">

            <td className="px-6 py-4">
                {project.name}
            </td>

            <td className="px-6 py-4">
                {project.region}
            </td>

            <td className="px-6 py-4">
                {project.description}
            </td>

            <td className="px-6 py-4">
                <ActionButtons
                    onView={() => onView(project)}
                    onEdit={() => onEdit(project)}
                    onDelete={() => onDelete(project)}
                />
            </td>

        </tr>
    );
}