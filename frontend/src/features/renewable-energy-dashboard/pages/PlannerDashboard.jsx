import usePlannerDashboard
    from "../hooks/usePlannerDashboard";

import PlannerSummaryCards
    from "../components/PlannerSummaryCards";

import RecommendedSites
    from "../components/RecommendedSites";

import GenerationForecast
    from "../components/GenerationForecast";

import SuitabilityScores
    from "../components/SuitabilityScores";

import InvestmentRecommendations
    from "../components/InvestmentRecommendations";


const PlannerDashboard = () => {

    const {
        dashboard,
        loading,
    } = usePlannerDashboard();


    if (loading) {

        return (

            <div className="flex min-h-75 items-center justify-center">

                <p className="text-gray-500">
                    Loading planner dashboard...
                </p>

            </div>

        );

    }


    if (!dashboard) {

        return (

            <div className="rounded-xl border bg-white p-6">

                <p className="text-gray-500">
                    Planner dashboard data is unavailable.
                </p>

            </div>

        );

    }


    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-2xl font-bold">
                    Renewable Energy Planner Dashboard
                </h1>

                <p className="mt-1 text-gray-500">
                    Renewable deployment intelligence,
                    forecasting and investment insights.
                </p>

            </div>


            <PlannerSummaryCards
                summary={dashboard.summary}
            />


            <RecommendedSites
                sites={dashboard.recommended_sites}
            />


            <div className="grid gap-6 lg:grid-cols-2">

                <GenerationForecast
                    forecast={dashboard.generation_forecast}
                />

                <SuitabilityScores
                    sites={dashboard.suitability_scores}
                />

            </div>


            <InvestmentRecommendations
                recommendations={
                    dashboard.investment_recommendations
                }
            />

        </div>

    );

};


export default PlannerDashboard;