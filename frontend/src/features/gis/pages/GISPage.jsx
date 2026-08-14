import DataState from "@/components/feedback/DataState";

import {
  GISHeader,
  GISMap,
  GISStatistics,
} from "../components";

import { useMapConfig } from "../hooks/useMapConfig";
import { useMapSummary } from "../hooks/useMapSummary";
import { useSitesGeoJSON } from "../hooks/useSitesGeoJSON";

export default function GISPage() {
  const {
    data: config,
    isLoading: configLoading,
    isError: configError,
    error: configErrorObject,
    refetch: refetchConfig,
  } = useMapConfig();

  const {
    data: summary,
    isLoading: summaryLoading,
    refetch: refetchSummary,
  } = useMapSummary();

  const {
    data: geojson,
    isLoading: sitesLoading,
    isError: sitesError,
    error: sitesErrorObject,
    refetch: refetchSites,
  } = useSitesGeoJSON();

  const loading =
    configLoading ||
    summaryLoading ||
    sitesLoading;

  const error =
    configErrorObject ??
    sitesErrorObject;

  async function handleRefresh() {
    await Promise.all([
      refetchConfig(),
      refetchSummary(),
      refetchSites(),
    ]);
  }

  return (
    <>
      <GISHeader
        loading={loading}
        onRefresh={handleRefresh}
      />

      <DataState
        isLoading={loading}
        isError={
          configError ||
          sitesError
        }
        error={error}
      >
        <GISStatistics
          summary={summary}
        />

        {config && geojson && (
          <GISMap
            config={config}
            featureCollection={geojson}
          />
        )}
      </DataState>
    </>
  );
}