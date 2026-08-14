const GISSummaryCards = ({
    summary,
}) => {

    const cards = [

        {
            label: "Total Sites",
            value: summary.total_sites,
        },

        {
            label: "GIS Enriched",
            value: summary.enriched_sites,
        },

        {
            label: "Average Slope",
            value: `${summary.average_slope}°`,
        },

        {
            label: "Average Vegetation Index",
            value: summary.average_vegetation_index,
        },

    ];


    return (

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => (

                <div
                    key={card.label}
                    className="rounded-xl border bg-white p-5 shadow-sm"
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

    );

};


export default GISSummaryCards;