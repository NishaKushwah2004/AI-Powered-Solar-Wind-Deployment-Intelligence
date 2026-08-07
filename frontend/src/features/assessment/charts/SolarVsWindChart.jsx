import Card from "@/components/ui/Card";

export default function SolarVsWindChart({
  metrics,
}) {
  const solar = metrics?.solar_score ?? 0;

  const wind = metrics?.wind_score ?? 0;

  return (
    <Card>

      <Card.Body>

        <h3 className="mb-6 text-lg font-semibold">
          Solar vs Wind Potential
        </h3>

        <div className="space-y-6">

          <div>

            <div className="mb-2 flex justify-between">

              <span>Solar</span>

              <span>{solar}%</span>

            </div>

            <div className="h-4 rounded-full bg-slate-200">

              <div
                className="h-4 rounded-full bg-yellow-500"
                style={{
                  width: `${solar}%`,
                }}
              />

            </div>

          </div>

          <div>

            <div className="mb-2 flex justify-between">

              <span>Wind</span>

              <span>{wind}%</span>

            </div>

            <div className="h-4 rounded-full bg-slate-200">

              <div
                className="h-4 rounded-full bg-sky-500"
                style={{
                  width: `${wind}%`,
                }}
              />

            </div>

          </div>

        </div>

      </Card.Body>

    </Card>
  );
}