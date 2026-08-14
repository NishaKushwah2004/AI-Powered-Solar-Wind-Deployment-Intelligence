import useProjectManagerDashboard
    from "../hooks/useProjectManagerDashboard";

import ProjectOverview
    from "../components/ProjectOverview";

import FinancialAnalytics
    from "../components/FinancialAnalytics";

import RiskAssessment
    from "../components/RiskAssessment";

import ExecutiveSummary
    from "../components/ExecutiveSummary";


const ProjectManagerDashboard = () => {

    const {
        dashboard,
        loading,
    } = useProjectManagerDashboard();


    if (loading) {

        return (

            <div className="flex min-h-75 items-center justify-center">

                <p className="text-gray-500">
                    Loading Project Manager Dashboard...
                </p>

            </div>

        );

    }


    if (!dashboard) {

        return (

            <div className="rounded-xl border bg-white p-6">

                <p className="text-gray-500">
                    Project Manager dashboard data
                    is unavailable.
                </p>

            </div>

        );

    }


    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-2xl font-bold">
                    Project Manager Dashboard
                </h1>

                <p className="mt-1 text-gray-500">
                    Portfolio overview, financial analytics,
                    risk assessment and executive insights.
                </p>

            </div>


            <ProjectOverview
                overview={
                    dashboard.project_overview
                }
            />


            <FinancialAnalytics
                financial={
                    dashboard.financial_analytics
                }
            />


            <RiskAssessment
                risk={
                    dashboard.risk_assessment
                }
            />


            <ExecutiveSummary
                summary={
                    dashboard.executive_summary
                }
            />

        </div>

    );

};


export default ProjectManagerDashboard;