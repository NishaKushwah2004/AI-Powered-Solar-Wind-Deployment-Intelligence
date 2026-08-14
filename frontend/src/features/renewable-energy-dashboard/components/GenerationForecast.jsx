const GenerationForecast = ({
    forecast,
}) => {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
                Energy Generation Forecast
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                Forecast renewable energy production.
            </p>


            <div className="mt-5 space-y-4">

                {forecast.map((item) => (

                    <div
                        key={item.period}
                        className="flex items-center justify-between border-b pb-3"
                    >

                        <div>

                            <p className="font-medium">
                                {item.period}
                            </p>

                            <p className="text-xs text-gray-500">
                                {item.technology}
                            </p>

                        </div>


                        <p className="font-semibold">
                            {item.generation_mwh.toLocaleString()}
                            {" "}MWh
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

};


export default GenerationForecast;