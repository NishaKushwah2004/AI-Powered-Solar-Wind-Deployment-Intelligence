const RecommendedSites = ({
    sites,
}) => {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-semibold">
                        Recommended Deployment Sites
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Highest-ranked renewable deployment
                        opportunities.
                    </p>

                </div>

            </div>


            <div className="mt-5 overflow-x-auto">

                <table className="w-full text-sm">

                    <thead>

                        <tr className="border-b text-left">

                            <th className="px-3 py-3">
                                Site
                            </th>

                            <th className="px-3 py-3">
                                Technology
                            </th>

                            <th className="px-3 py-3">
                                Suitability
                            </th>

                            <th className="px-3 py-3">
                                Score
                            </th>

                            <th className="px-3 py-3">
                                Status
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {sites.map((site) => (

                            <tr
                                key={site.site_id}
                                className="border-b"
                            >

                                <td className="px-3 py-3">

                                    <div className="font-medium">
                                        {site.site_name}
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        Site #{site.site_id}
                                    </div>

                                </td>


                                <td className="px-3 py-3">
                                    {site.technology}
                                </td>


                                <td className="px-3 py-3">
                                    {site.suitability_category}
                                </td>


                                <td className="px-3 py-3 font-semibold">
                                    {site.suitability_score}
                                </td>


                                <td className="px-3 py-3">
                                    {site.deployment_status}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};


export default RecommendedSites;