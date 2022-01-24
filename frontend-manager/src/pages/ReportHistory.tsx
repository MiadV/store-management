import React from "react";
import { Box, Text } from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";
import ReportSummaryForm from "../components/Forms/ReportSummaryForm";

const ReportHistory: React.FC<{}> = () => {
    return (
        <PageLayout>
            <Box padding={6}>
                <Text>Report Summary</Text>

                <Box marginTop={4}>
                    <ReportSummaryForm />
                </Box>
            </Box>
        </PageLayout>
    );
};

export default ReportHistory;
