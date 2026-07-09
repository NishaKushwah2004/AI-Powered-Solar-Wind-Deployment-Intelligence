import { Pencil, Trash2, Eye } from "lucide-react";

export default function ActionButtons({
    onView,
    onEdit,
    onDelete,
}) {
    return (
        <div className="flex items-center gap-2">

            {onView && (
                <button
                    onClick={onView}
                    className="rounded p-2 text-blue-600 hover:bg-blue-100"
                    title="View"
                >
                    <Eye size={18} />
                </button>
            )}

            {onEdit && (
                <button
                    onClick={onEdit}
                    className="rounded p-2 text-yellow-600 hover:bg-yellow-100"
                    title="Edit"
                >
                    <Pencil size={18} />
                </button>
            )}

            {onDelete && (
                <button
                    onClick={onDelete}
                    className="rounded p-2 text-red-600 hover:bg-red-100"
                    title="Delete"
                >
                    <Trash2 size={18} />
                </button>
            )}

        </div>
    );
}