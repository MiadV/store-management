import React from "react";
import { Box } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import useExpenseReportById from "../hooks/useExpenseReportById";
import LoadingOverlay from "../components/LoadingOverlay";
import ExpenseReportItem from "../components/ExpenseReportItem";

const ExpenseReport: React.FC<{}> = () => {
    let { reportId } = useParams();
    const sanitizedReportId = reportId ? parseInt(reportId) : 0;
    const { data: expenseReport, isLoading } =
        useExpenseReportById(sanitizedReportId);

    if (isLoading) {
        return <LoadingOverlay />;
    }

    if (!expenseReport) {
        return <Navigate to="/404" replace />;
    }

    return (
        <SimpleLayout>
            <Box padding={6}>
                <ExpenseReportItem report={expenseReport} />
            </Box>
        </SimpleLayout>
    );
};

export default ExpenseReport;
