import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { X } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import { Card, CardBody, CardHeader, CardTitle } from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { getGisSites } from "../../api/gisApi.js";
import { getSite } from "../../api/siteApi.js";
import { formatNumber } from "../../utils/formatters.js";
import { Link } from "react-router-dom";

// Default Leaflet marker icons don't resolve correctly under Vite's bundler
// without this explicit reassignment.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const DEFAULT_CENTER = [20.5937, 78.9629]; // India centroid fallback
const DEFAULT_ZOOM = 5;

function FitToFeatures({ features }) {
  const map = useMap();
  useMemo(() => {
    if (!features?.length) return;
    const bounds = L.latLngBounds(
      features.map((f) => [f.geometry.coordinates[1], f.geometry.coordinates[0]])
    );
    if (bounds.isValid()) map.fitBounds(bounds.pad(0.2));
  }, [features, map]);
  return null;
}

export default function GISAnalyst() {
  const [selectedSiteId, setSelectedSiteId] = useState(null);

  const { data: collection, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["gis-sites"],
    queryFn: getGisSites,
  });

  const { data: selectedSite, isLoading: siteLoading } = useQuery({
    queryKey: ["site", selectedSiteId],
    queryFn: () => getSite(selectedSiteId),
    enabled: Boolean(selectedSiteId),
  });

  const features = collection?.features || [];

  return (
    <div>
      <PageHeader
        title="GIS Analysis"
        description="Interactive terrain and infrastructure map for all enriched sites."
      />

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}
      {isError && <ErrorState error={error} onRetry={refetch} />}

      {collection && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="h-[560px] overflow-hidden lg:col-span-2">
            <MapContainer
              center={DEFAULT_CENTER}
              zoom={DEFAULT_ZOOM}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FitToFeatures features={features} />
              {features.map((feature) => {
                const [lng, lat] = feature.geometry.coordinates;
                return (
                  <Marker
                    key={feature.id}
                    position={[lat, lng]}
                    eventHandlers={{
                      click: () => setSelectedSiteId(feature.id),
                    }}
                  >
                    <Popup>
                      <div className="text-xs">
                        <p className="font-semibold">{feature.properties?.popup?.title}</p>
                        <p className="text-ink-faint">
                          {lat.toFixed(4)}, {lng.toFixed(4)}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Site details</CardTitle>
              {selectedSiteId && (
                <button
                  onClick={() => setSelectedSiteId(null)}
                  className="rounded-md p-1 text-ink-faint hover:bg-surface-muted"
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </CardHeader>
            <CardBody className="max-h-[490px] overflow-y-auto">
              {!selectedSiteId && (
                <p className="text-sm text-ink-faint">
                  Select a marker on the map to view its GIS enrichment data.
                </p>
              )}
              {selectedSiteId && siteLoading && (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              )}
              {selectedSite && (
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-ink">{selectedSite.name}</p>
                    {selectedSite.land_use && (
                      <Badge tone="info" className="mt-1">
                        {selectedSite.land_use}
                      </Badge>
                    )}
                  </div>
                  <Detail label="Elevation" value={fmtM(selectedSite.elevation)} />
                  <Detail label="Land slope" value={fmtRaw(selectedSite.land_slope)} />
                  <Detail
                    label="Vegetation index"
                    value={fmtRaw(selectedSite.vegetation_index)}
                  />
                  <Detail label="Road distance" value={fmtM(selectedSite.road_distance)} />
                  <Detail
                    label="Substation distance"
                    value={fmtM(selectedSite.nearest_substation_distance)}
                  />
                  <Detail
                    label="Transmission line distance"
                    value={fmtM(selectedSite.nearest_transmission_line_distance)}
                  />
                  <Detail
                    label="Water body distance"
                    value={fmtM(selectedSite.water_body_distance)}
                  />
                  <Detail
                    label="Protected area distance"
                    value={fmtM(selectedSite.protected_area_distance)}
                  />
                  <Link
                    to={`/sites/${selectedSite.id}`}
                    className="mt-2 inline-block text-xs font-medium text-brand-700 hover:underline"
                  >
                    Open full site page \u2192
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}

function fmtM(v) {
  return v != null ? `${formatNumber(v)} m` : "\u2014";
}
function fmtRaw(v) {
  return v != null ? formatNumber(v, { maximumFractionDigits: 2 }) : "\u2014";
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-1.5 last:border-0">
      <span className="text-ink-faint">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
