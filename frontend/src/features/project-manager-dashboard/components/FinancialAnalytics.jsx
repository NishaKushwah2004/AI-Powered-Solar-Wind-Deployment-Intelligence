const FinancialAnalytics = ({
    financial,
}) => {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
                Financial Analytics
            </h2>


            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                <div>

                    <p className="text-sm text-gray-500">
                        Total CAPEX
                    </p>

                    <p className="mt-1 text-xl font-bold">
                        ₹{financial.total_capex.toLocaleString()}
                    </p>

                </div>


                <div>

                    <p className="text-sm text-gray-500">
                        Annual OPEX
                    </p>

                    <p className="mt-1 text-xl font-bold">
                        ₹{financial.total_annual_opex.toLocaleString()}
                    </p>

                </div>


                <div>

                    <p className="text-sm text-gray-500">
                        Annual Revenue
                    </p>

                    <p className="mt-1 text-xl font-bold">
                        ₹{financial.total_annual_revenue.toLocaleString()}
                    </p>

                </div>


                <div>

                    <p className="text-sm text-gray-500">
                        Net Cash Flow
                    </p>

                    <p className="mt-1 text-xl font-bold">
                        ₹{financial.total_net_cash_flow.toLocaleString()}
                    </p>

                </div>


                <div>

                    <p className="text-sm text-gray-500">
                        Average ROI
                    </p>

                    <p className="mt-1 text-xl font-bold">
                        {financial.average_roi_percentage.toFixed(2)}%
                    </p>

                </div>


                <div>

                    <p className="text-sm text-gray-500">
                        Average Payback
                    </p>

                    <p className="mt-1 text-xl font-bold">
                        {financial.average_payback_period_years !== null
                            ? `${financial.average_payback_period_years} years`
                            : "N/A"}
                    </p>

                </div>

            </div>

        </div>

    );

};


export default FinancialAnalytics;