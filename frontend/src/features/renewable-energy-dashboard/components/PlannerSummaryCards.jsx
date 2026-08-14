const PlannerSummaryCards = ({
    summary,
}) => {

    const cards = [

        {
            label: "Recommended Sites",
            value: summary.recommendedSites,
        },

        {
            label: "Total Forecast",
            value: `${summary.totalForecastMwh.toLocaleString()} MWh`,
        },

        {
            label: "Average Suitability",
            value: `${summary.averageSuitability}%`,
        },

        {
            label: "Investment Opportunities",
            value: summary.investmentOpportunities,
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


export default PlannerSummaryCards;