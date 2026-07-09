export default function EmptyState({
    title = "No Data",
    message = "Nothing to display.",
}) {
    return (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">

            <h3 className="text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-slate-500">
                {message}
            </p>

        </div>
    );
}