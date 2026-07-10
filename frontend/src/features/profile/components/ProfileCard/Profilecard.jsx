import { Card } from "@/components/ui";

export default function ProfileCard({
  children,
}) {
  return (
    <Card>

      <Card.Body>

        {children}

      </Card.Body>

    </Card>
  );
}