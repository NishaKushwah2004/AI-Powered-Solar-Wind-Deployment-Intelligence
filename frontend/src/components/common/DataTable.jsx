import EmptyState from "./EmptyState";

export default function DataTable({
    columns,
    data,
    renderRow,
}) {
    if (!data.length) {
        return (
            <EmptyState
                title="No Records Found"
                message="Create your first record."
            />
        );
    }

    return (
        <div className="overflow-hidden rounded-xl bg-white shadow">

            <table className="min-w-full">

                <thead className="bg-slate-100">

                    <tr>

                        {columns.map((column) => (
                            <th
                                key={column}
                                className="px-6 py-4 text-left text-sm font-semibold text-slate-700"
                            >
                                {column}
                            </th>
                        ))}

                    </tr>

                </thead>

                <tbody>

                    {data.map(renderRow)}

                </tbody>

            </table>

        </div>
    );
}