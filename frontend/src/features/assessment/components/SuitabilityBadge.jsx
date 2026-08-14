import Badge from "@/components/ui/Badge";

import {
  getSuitabilityLabel,
  getSuitabilityVariant,
} from "../utils/assessmentHelpers";

export default function SuitabilityBadge({
  score,
}) {
  return (
    <Badge
      variant={getSuitabilityVariant(score)}
    >
      {getSuitabilityLabel(score)}
    </Badge>
  );
}