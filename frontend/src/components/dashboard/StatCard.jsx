export default function StatCard({
    title,
    value,
    icon,
    color = "bg-teal-600",
}) {
    return (

        <div className="rounded-xl bg-white p-6 shadow">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        {value}

                    </h2>

                </div>

                <div
                    className={`rounded-full p-4 text-white ${color}`}
                >
                    {icon}
                </div>

            </div>

        </div>

    );
}