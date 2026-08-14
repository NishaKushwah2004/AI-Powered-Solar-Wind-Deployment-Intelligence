const SiteComparison = ({
    sites,
}) => {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
                Site Comparison
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                Compare GIS and environmental characteristics
                across deployment sites.
            </p>


            <div className="mt-5 overflow-x-auto">

                <table className="min-w-275 w-full text-sm">

                    <thead>

                        <tr className="border-b text-left">

                            <th className="px-3 py-3">
                                Site
                            </th>

                            <th className="px-3 py-3">
                                Suitability
                            </th>

                            <th className="px-3 py-3">
                                Land Use
                            </th>

                            <th className="px-3 py-3">
                                Slope
                            </th>

                            <th className="px-3 py-3">
                                Vegetation
                            </th>

                            <th className="px-3 py-3">
                                Road
                            </th>

                            <th className="px-3 py-3">
                                Substation
                            </th>

                            <th className="px-3 py-3">
                                Transmission
                            </th>

                            <th className="px-3 py-3">
                                Water
                            </th>

                            <th className="px-3 py-3">
                                Protected Area
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {sites.map((site) => (

                            <tr
                                key={site.site_id}
                                className="border-b"
                            >

                                <td className="px-3 py-3 font-medium">
                                    {site.site_name}
                                </td>

                                <td className="px-3 py-3">
                                    {site.suitability_score}
                                </td>

                                <td className="px-3 py-3">
                                    {site.land_use}
                                </td>

                                <td className="px-3 py-3">
                                    {site.land_slope}
                                </td>

                                <td className="px-3 py-3">
                                    {site.vegetation_index}
                                </td>

                                <td className="px-3 py-3">
                                    {site.road_distance}
                                </td>

                                <td className="px-3 py-3">
                                    {site.substation_distance}
                                </td>

                                <td className="px-3 py-3">
                                    {site.transmission_line_distance}
                                </td>

                                <td className="px-3 py-3">
                                    {site.water_body_distance}
                                </td>

                                <td className="px-3 py-3">
                                    {site.protected_area_distance}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};


export default SiteComparison;