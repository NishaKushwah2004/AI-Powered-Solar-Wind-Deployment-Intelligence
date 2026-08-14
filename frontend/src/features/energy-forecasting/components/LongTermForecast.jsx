const LongTermForecast = ({
  forecast,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Long-Term Energy Forecast
      </h2>

      <div className="mt-4 overflow-x-auto">

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b text-left">

              <th className="px-3 py-3">
                Year
              </th>

              <th className="px-3 py-3">
                Generation (MWh)
              </th>

              <th className="px-3 py-3">
                Revenue
              </th>

            </tr>
          </thead>

          <tbody>

            {forecast.map((item) => (
              <tr
                key={item.year}
                className="border-b"
              >

                <td className="px-3 py-3">
                  Year {item.year}
                </td>

                <td className="px-3 py-3">
                  {item.estimated_generation_mwh.toLocaleString()}
                </td>

                <td className="px-3 py-3">
                  ₹
                  {item.estimated_revenue.toLocaleString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default LongTermForecast;