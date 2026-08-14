import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import FitBounds from "./FitBounds";

import SiteMarkerPopup from "../SiteMarkerPopup";
import MapLegend from "../MapLegend";

const DEFAULT_CENTER = [20.5937, 78.9629]; // India
const DEFAULT_ZOOM = 5;

export default function GISMap({
  config,
  featureCollection,
}) {
  const features =
    featureCollection?.features ?? [];

  return (
    <div className="relative h-175 overflow-hidden rounded-2xl">
      <MapContainer
        center={
          config?.default_center ??
          DEFAULT_CENTER
        }
        zoom={
          config?.default_zoom ??
          DEFAULT_ZOOM
        }
        minZoom={config?.min_zoom ?? 3}
        maxZoom={config?.max_zoom ?? 18}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {features.map((feature, index) => {
          const coordinates =
            feature?.geometry?.coordinates;

          if (
            !coordinates ||
            coordinates.length !== 2
          ) {
            return null;
          }

          return (
            <Marker
              key={
                feature.properties?.id ??
                index
              }
              position={[
                coordinates[1],
                coordinates[0],
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
          );
        })}

        <FitBounds features={features} />
      </MapContainer>

      <MapLegend />
    </div>
  );
}