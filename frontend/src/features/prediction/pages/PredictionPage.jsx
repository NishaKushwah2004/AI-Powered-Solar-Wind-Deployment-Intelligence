import { useParams } from "react-router-dom";

import DataState from "@/components/feedback/DataState";

import {
  PredictionHeader,
  PredictionOverview,
} from "../components";

import { useSitePrediction } from "../hooks/useSitePrediction";

export default function PredictionPage() {
  const { siteId } = useParams();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useSitePrediction(siteId);

  return (
    <>
      <PredictionHeader
        loading={isFetching}
        onRefresh={refetch}
      />

      <DataState
        isLoading={isLoading}
        isError={isError}
        error={error}
      >
        <PredictionOverview
          prediction={data}
        />
      </DataState>
    </>
  );
}