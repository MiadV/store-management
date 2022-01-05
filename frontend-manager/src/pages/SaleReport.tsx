import React from "react";
import { Box } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import SaleReportItem from "../components/SaleReportItem";
import useSaleReportById from "../hooks/useSaleReportById";
import LoadingOverlay from "../components/LoadingOverlay";

const SaleReport: React.FC<{}> = () => {
    let { reportId } = useParams();
    const sanitizedReportId = reportId ? parseInt(reportId) : 0;
    const { data: saleReport, isLoading } =
        useSaleReportById(sanitizedReportId);

    if (isLoading) {
        return <LoadingOverlay />;
    }

    if (!saleReport) {
        return <Navigate to="/404" replace />;
    }

    return (
        <SimpleLayout>
            <Box padding={6}>{<SaleReportItem report={saleReport} />}</Box>
        </SimpleLayout>
    );
};

export default SaleReport;
