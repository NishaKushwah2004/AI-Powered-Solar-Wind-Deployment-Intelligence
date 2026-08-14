const MonthlyForecastTable = ({
  forecast,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Monthly Energy Forecast
      </h2>

      <div className="mt-4 overflow-x-auto">

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b text-left">

              <th className="px-3 py-3">
                Month
              </th>

              <th className="px-3 py-3">
                Solar (MWh)
              </th>

              <th className="px-3 py-3">
                Wind (MWh)
              </th>

              <th className="px-3 py-3">
                Total (MWh)
              </th>

            </tr>
          </thead>

          <tbody>

            {forecast.map((item) => (
              <tr
                key={item.month}
                className="border-b"
              >

                <td className="px-3 py-3">
                  {item.month_name}
                </td>

                <td className="px-3 py-3">
                  {item.solar_generation_mwh.toLocaleString()}
                </td>

                <td className="px-3 py-3">
                  {item.wind_generation_mwh.toLocaleString()}
                </td>

                <td className="px-3 py-3 font-medium">
                  {item.total_generation_mwh.toLocaleString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MonthlyForecastTable;