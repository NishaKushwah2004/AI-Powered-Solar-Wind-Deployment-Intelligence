const EnvironmentalAnalytics = ({
    analytics,
}) => {

    const metrics = [

        {
            label: "Vegetation Index",
            value: analytics.average_vegetation_index,
        },

        {
            label: "Water Body Distance",
            value: `${analytics.average_water_body_distance} km`,
        },

        {
            label: "Protected Area Distance",
            value: `${analytics.average_protected_area_distance} km`,
        },

        {
            label: "Road Distance",
            value: `${analytics.average_road_distance} km`,
        },

        {
            label: "Substation Distance",
            value: `${analytics.average_substation_distance} km`,
        },

        {
            label: "Transmission Line Distance",
            value: `${analytics.average_transmission_line_distance} km`,
        },

    ];


    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
                Environmental Analytics
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                Aggregated environmental and infrastructure
                indicators from GIS enrichment.
            </p>


            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                {metrics.map((metric) => (

                    <div
                        key={metric.label}
                        className="rounded-lg border p-4"
                    >

                        <p className="text-sm text-gray-500">
                            {metric.label}
                        </p>

                        <p className="mt-2 text-xl font-bold">
                            {metric.value}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

};


export default EnvironmentalAnalytics;