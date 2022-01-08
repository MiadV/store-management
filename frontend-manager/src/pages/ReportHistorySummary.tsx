import React from "react";
import { Box } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import LoadingOverlay from "../components/LoadingOverlay";
import useReportHistoryByDate from "../hooks/useReportHistoryByDate";
import { useSelectedStore } from "../context/selectedStoreContext";
import { ResponseErrorType } from "../types";

const ReportHistorySummary: React.FC<{}> = () => {
    let { date } = useParams();
    const sanitizedDate = new Date(date!);
    const { selectedStore } = useSelectedStore();
    const {
        data: reportHistorySummary,
        isLoading,
        error,
    } = useReportHistoryByDate(
        selectedStore!.shopId,
        sanitizedDate.getFullYear(),
        sanitizedDate.getMonth() + 1,
        sanitizedDate.getDate(),
        {
            staleTime: Infinity,
            enabled: !!(selectedStore && sanitizedDate.getFullYear()),
            retry: 0,
        }
    );

    if (isLoading) {
        return <LoadingOverlay />;
    }

    if (!selectedStore) {
        return <Navigate to="/404" replace />;
    }

    return (
        <SimpleLayout>
            <Box padding={6}>
                {reportHistorySummary
                    ? JSON.stringify(reportHistorySummary)
                    : (error as ResponseErrorType).response.data.errors
                          .message[0] ?? "Something went wrong. try again."}
            </Box>
        </SimpleLayout>
    );
};

export default ReportHistorySummary;
