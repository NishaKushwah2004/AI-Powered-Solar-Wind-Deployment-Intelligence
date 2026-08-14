const ExecutiveSummary = ({
    summary,
}) => {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
                Executive Summary
            </h2>


            <p className="mt-4 text-gray-700">
                {summary.headline}
            </p>


            <div className="mt-6 grid gap-6 md:grid-cols-3">

                <div>

                    <h3 className="font-semibold">
                        Key Strengths
                    </h3>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">

                        {summary.key_strengths.map(
                            (item, index) => (

                                <li key={index}>
                                    {item}
                                </li>

                            )
                        )}

                    </ul>

                </div>


                <div>

                    <h3 className="font-semibold">
                        Key Concerns
                    </h3>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">

                        {summary.key_concerns.map(
                            (item, index) => (

                                <li key={index}>
                                    {item}
                                </li>

                            )
                        )}

                    </ul>

                </div>


                <div>

                    <h3 className="font-semibold">
                        Recommended Actions
                    </h3>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">

                        {summary.recommended_actions.map(
                            (item, index) => (

                                <li key={index}>
                                    {item}
                                </li>

                            )
                        )}

                    </ul>

                </div>

            </div>

        </div>

    );

};


export default ExecutiveSummary;