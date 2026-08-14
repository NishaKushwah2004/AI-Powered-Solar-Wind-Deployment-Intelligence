import Card from "@/components/ui/Card";

export default function SeasonalEnergyChart({
  title,
  forecast,
}) {
  if (!forecast) return null;

  const values = Object.values(forecast);

  const max = Math.max(...values);

  return (
    <Card>

      <Card.Body>

        <h3 className="mb-6 text-lg font-semibold">
          {title}
        </h3>

        <div className="flex h-56 items-end justify-between gap-4">

          {Object.entries(forecast).map(
            ([season, value]) => (

              <div
                key={season}
                className="flex flex-1 flex-col items-center"
              >

                <div
                  className="w-full rounded-t-lg bg-primary transition-all"
                  style={{
                    height: `${(value / max) * 170}px`,
                  }}
                />

                <p className="mt-3 capitalize">
                  {season}
                </p>

              </div>

            )
          )}

        </div>

      </Card.Body>

    </Card>
  );
}