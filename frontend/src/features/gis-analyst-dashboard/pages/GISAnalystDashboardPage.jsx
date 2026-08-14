import useGISAnalystDashboard
    from "../hooks/useGISAnalystDashboard";

import GISSummaryCards
    from "../components/GISSummaryCards";

import GISVisualization
    from "../components/GISVisualization";

import EnvironmentalAnalytics
    from "../components/EnvironmentalAnalytics";

import TerrainMap
    from "../components/TerrainMap";

import SiteComparison
    from "../components/SiteComparison";


const GISAnalystDashboard = () => {

    const {
        dashboard,
        loading,
    } = useGISAnalystDashboard();


    if (loading) {

        return (

            <div className="flex min-h-75 items-center justify-center">

                <p className="text-gray-500">
                    Loading GIS Analyst Dashboard...
                </p>

            </div>

        );

    }


    if (!dashboard) {

        return (

            <div className="rounded-xl border bg-white p-6">

                <p className="text-gray-500">
                    GIS dashboard data is unavailable.
                </p>

            </div>

        );

    }


    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-2xl font-bold">
                    GIS Analyst Dashboard
                </h1>

                <p className="mt-1 text-gray-500">
                    Spatial, environmental and terrain
                    intelligence for renewable site analysis.
                </p>

            </div>


            <GISSummaryCards
                summary={dashboard.summary}
            />


            <GISVisualization
                sites={
                    dashboard.visualization_sites
                }
            />


            <EnvironmentalAnalytics
                analytics={
                    dashboard.environmental_analytics
                }
            />


            <TerrainMap
                sites={
                    dashboard.terrain_sites
                }
            />


            <SiteComparison
                sites={
                    dashboard.site_comparison
                }
            />

        </div>

    );

};


export default GISAnalystDashboard;