import { useEffect } from "react";

import { useMap } from "react-leaflet";

export default function FitBounds({
  features,
}) {
  const map = useMap();

  useEffect(() => {
    if (!features.length) return;

    const bounds = features.map(
      (feature) => [
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0],
      ]
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
    });

  }, [features, map]);

  return null;
}