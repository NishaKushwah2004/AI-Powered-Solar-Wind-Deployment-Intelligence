const InvestmentRiskCard = ({
  risk,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Investment Risk
      </h2>

      <p className="mt-3 text-2xl font-bold">
        {risk.overall_risk}
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">

        <div>
          <p className="text-sm text-gray-500">
            Financial Risk Score
          </p>

          <p className="text-xl font-bold">
            {risk.financial_risk_score}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Site Risk Score
          </p>

          <p className="text-xl font-bold">
            {risk.site_risk_score}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Resource Risk Score
          </p>

          <p className="text-xl font-bold">
            {risk.resource_risk_score}
          </p>
        </div>

      </div>

      <p className="mt-4 text-sm text-gray-600">
        {risk.explanation}
      </p>

    </div>
  );
};

export default InvestmentRiskCard;