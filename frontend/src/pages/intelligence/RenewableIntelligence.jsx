import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Select from "../../components/ui/Select.jsx";
import Tabs from "../../components/ui/Tabs.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { getAllSites } from "../../api/siteApi.js";

import PredictionPanel from "../../components/intelligence/PredictionPanel.jsx";
import SuitabilityPanel from "../../components/intelligence/SuitabilityPanel.jsx";
import RecommendationPanel from "../../components/intelligence/RecommendationPanel.jsx";
import OptimizationPanel from "../../components/intelligence/OptimizationPanel.jsx";
import ForecastPanel from "../../components/intelligence/ForecastPanel.jsx";
import InvestmentPanel from "../../components/intelligence/InvestmentPanel.jsx";

const TABS = [
  { value: "prediction", label: "ML Prediction" },
  { value: "suitability", label: "Suitability" },
  { value: "recommendation", label: "Recommendation" },
  { value: "optimization", label: "Deployment Optimization" },
  { value: "forecast", label: "Energy Forecast" },
  { value: "investment", label: "Investment" },
];

export default function RenewableIntelligence() {
  const [searchParams, setSearchParams] = useSearchParams();
  const siteId = searchParams.get("site_id") || "";
  const [tab, setTab] = useState("prediction");

  const { data: sites, isLoading } = useQuery({
    queryKey: ["sites"],
    queryFn: getAllSites,
  });

  const onSelectSite = (value) => {
    if (value) setSearchParams({ site_id: value });
    else setSearchParams({});
  };

  return (
    <div>
      <PageHeader
        title="Renewable Intelligence"
        description="ML-driven predictions, suitability, deployment, forecasting, and investment insight for a selected site."
      />

      <div className="mb-6 max-w-sm">
        <Select
          label="Site"
          value={siteId}
          onChange={(e) => onSelectSite(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Select a site to analyze</option>
          {sites?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </Select>
      </div>

      {!siteId && (
        <EmptyState
          icon={Sparkles}
          title="Select a site to run intelligence"
          description="Choose a site above to generate ML predictions, suitability scoring, technology recommendations, deployment optimization, energy forecasts, and investment analysis."
        />
      )}

      {siteId && (
        <>
          <Tabs tabs={TABS} active={tab} onChange={setTab} />
          <div className="mt-5">
            {tab === "prediction" && <PredictionPanel siteId={siteId} />}
            {tab === "suitability" && <SuitabilityPanel siteId={siteId} />}
            {tab === "recommendation" && <RecommendationPanel siteId={siteId} />}
            {tab === "optimization" && <OptimizationPanel siteId={siteId} />}
            {tab === "forecast" && <ForecastPanel siteId={siteId} />}
            {tab === "investment" && <InvestmentPanel siteId={siteId} />}
          </div>
        </>
      )}
    </div>
  );
}
