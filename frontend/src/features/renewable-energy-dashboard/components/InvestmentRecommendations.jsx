const InvestmentRecommendations = ({
    recommendations,
}) => {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
                Investment Recommendations
            </h2>

            <div className="mt-5 space-y-4">

                {recommendations.map((item) => (

                    <div
                        key={item.site_id}
                        className="rounded-lg border p-4"
                    >

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="font-semibold">
                                    {item.site_name}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {item.technology}
                                </p>

                            </div>


                            <span className="text-sm font-semibold">
                                {item.investment_score}
                            </span>

                        </div>


                        <div className="mt-3">

                            <p className="text-sm">
                                Recommendation:
                            </p>

                            <p className="font-medium">
                                {item.recommendation}
                            </p>

                        </div>


                        <p className="mt-2 text-sm text-gray-500">
                            {item.feasibility_status}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

};


export default InvestmentRecommendations;