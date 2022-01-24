import React from "react";
import { Box } from "@chakra-ui/react";
import SimpleLayout from "../layouts/SimpleLayout";
import LoadingOverlay from "../components/LoadingOverlay";
import { ResponseErrorType } from "../types";
import ReportHistorySummaryItem from "../components/ReportHistorySummaryItem";
import NoReportHistorySummary from "../components/NoReportHistorySummary";
import { useReportSummaryByDate } from "../hooks/ReportsHooks";
import { useParams } from "react-router-dom";

const ReportHistorySummary: React.FC<{}> = () => {
    const { storeId, date } = useParams();
    const _storeId = storeId ? parseInt(storeId) : 0;
    const _date = date ? new Date(date) : new Date();
    const {
        data: reportHistorySummary,
        isLoading,
        error,
    } = useReportSummaryByDate(_storeId, _date, {
        staleTime: Infinity,
        enabled: !!(storeId && _date),
        retry: 0,
    });

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <SimpleLayout>
            <Box padding={6}>
                {reportHistorySummary ? (
                    <ReportHistorySummaryItem report={reportHistorySummary} />
                ) : (
                    <NoReportHistorySummary
                        message={
                            (error as ResponseErrorType).response.data.errors
                                .message[0] ??
                            "Something went wrong. try again."
                        }
                    />
                )}
            </Box>
        </SimpleLayout>
    );
};

export default ReportHistorySummary;
