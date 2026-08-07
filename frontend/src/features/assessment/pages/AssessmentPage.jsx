import { useParams } from "react-router-dom";

import DataState from "@/components/feedback/DataState";

import {
  AssessmentHeader,
  AssessmentOverview,
} from "../components";

import { useSiteAssessment } from "../hooks/useSiteAssessment";

export default function AssessmentPage() {
  const { siteId } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useSiteAssessment(siteId);

  return (
    <>
      <AssessmentHeader
        loading={isFetching}
        onRefresh={refetch}
      />

      <DataState
        isLoading={isLoading}
        isError={isError}
        error={error}
      >
        <AssessmentOverview
          report={data}
        />
      </DataState>
    </>
  );
}