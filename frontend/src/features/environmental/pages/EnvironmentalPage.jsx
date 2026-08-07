import { useParams } from "react-router-dom";

import DataState from "@/components/feedback/DataState";

import {
  EnvironmentalHeader,
  EnvironmentalOverview,
} from "../components";

import { useSiteEnvironment } from "../hooks/useSiteEnvironment";

export default function EnvironmentalPage() {
  const { siteId } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useSiteEnvironment(siteId);

  return (
    <>
      <EnvironmentalHeader
        loading={isFetching}
        onRefresh={refetch}
      />

      <DataState
        isLoading={isLoading}
        isError={isError}
        error={error}
      >
        <EnvironmentalOverview
          data={data}
        />
      </DataState>
    </>
  );
}