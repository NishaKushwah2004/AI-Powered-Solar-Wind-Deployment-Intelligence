const ProjectOverview = ({
    overview,
}) => {

    const cards = [

        {
            label: "Total Projects",
            value: overview.total_projects,
        },

        {
            label: "Active Projects",
            value: overview.active_projects,
        },

        {
            label: "Total Sites",
            value: overview.total_sites,
        },

        {
            label: "Recommended Sites",
            value: overview.recommended_sites,
        },

        {
            label: "Total Capacity",
            value: `${overview.total_capacity_mw} MW`,
        },

        {
            label: "Annual Generation",
            value: `${overview.total_generation_mwh.toLocaleString()} MWh`,
        },

    ];


    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
                Project Overview
            </h2>


            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                {cards.map((card) => (

                    <div
                        key={card.label}
                        className="rounded-lg border p-4"
                    >

                        <p className="text-sm text-gray-500">
                            {card.label}
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                            {card.value}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

};


export default ProjectOverview;