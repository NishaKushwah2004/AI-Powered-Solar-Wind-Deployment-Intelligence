const RiskAssessment = ({
    risk,
}) => {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
                Risk Assessment
            </h2>


            <div className="mt-5">

                <p className="text-sm text-gray-500">
                    Overall Portfolio Risk
                </p>

                <p className="mt-2 text-3xl font-bold">
                    {risk.overall_risk}
                </p>

            </div>


            <div className="mt-6 grid gap-4 md:grid-cols-3">

                <div className="rounded-lg border p-4">

                    <p className="text-sm text-gray-500">
                        Low Risk
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                        {risk.low_risk_projects}
                    </p>

                </div>


                <div className="rounded-lg border p-4">

                    <p className="text-sm text-gray-500">
                        Medium Risk
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                        {risk.medium_risk_projects}
                    </p>

                </div>


                <div className="rounded-lg border p-4">

                    <p className="text-sm text-gray-500">
                        High Risk
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                        {risk.high_risk_projects}
                    </p>

                </div>

            </div>


            <div className="mt-6">

                <p className="text-sm text-gray-500">
                    Risk Score
                </p>

                <p className="mt-1 text-xl font-bold">
                    {risk.risk_score}
                </p>

            </div>


            <p className="mt-4 text-sm text-gray-600">
                {risk.risk_summary}
            </p>

        </div>

    );

};


export default RiskAssessment;