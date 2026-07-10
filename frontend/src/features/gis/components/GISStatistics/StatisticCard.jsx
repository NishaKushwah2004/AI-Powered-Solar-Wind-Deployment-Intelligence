import { Card } from "@/components/ui";

export default function StatisticCard({
  title,
  value,
}) {
  return (
    <Card>

      <Card.Body>

        <p className="text-sm text-slate-500">

          {title}

        </p>

        <h2 className="mt-2 text-3xl font-bold">

          {value}

        </h2>

      </Card.Body>

    </Card>
  );
}