import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";


import FitBounds from "./FitBounds";

import SiteMarkerPopup from "../SiteMarkerPopup";

import MapLegend from "../MapLegend";

export default function GISMap({
  config,
  featureCollection,
}) {
  const features =
    featureCollection?.features || [];

  return (
    <div className="relative h-[700px] overflow-hidden rounded-2xl">

      <MapContainer
        center={config.default_center}
        zoom={config.default_zoom}
        minZoom={config.min_zoom}
        maxZoom={config.max_zoom}
        className="h-full w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {features.map((feature) => (
          <Marker
            key={feature.properties.id}
            position={[
              feature.geometry.coordinates[1],
              feature.geometry.coordinates[0],
            ]}
          >
            <Popup>

              <SiteMarkerPopup
                properties={
                  feature.properties
                }
              />

            </Popup>
          </Marker>
        ))}

        <FitBounds
          features={features}
        />

      </MapContainer>

      <MapLegend />

    </div>
  );
}