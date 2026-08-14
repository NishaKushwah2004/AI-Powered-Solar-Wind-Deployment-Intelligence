const SuitabilityScores = ({
    sites,
}) => {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
                Site Suitability Scores
            </h2>


            <div className="mt-5 space-y-5">

                {sites.map((site) => (

                    <div key={site.site_id}>

                        <div className="mb-2 flex justify-between">

                            <span className="text-sm font-medium">
                                {site.site_name}
                            </span>

                            <span className="text-sm font-semibold">
                                {site.score}%
                            </span>

                        </div>


                        <div className="h-2 w-full rounded-full bg-gray-200">

                            <div
                                className="h-2 rounded-full bg-blue-600"
                                style={{
                                    width: `${Math.min(
                                        100,
                                        Math.max(
                                            0,
                                            site.score
                                        )
                                    )}%`,
                                }}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};


export default SuitabilityScores;