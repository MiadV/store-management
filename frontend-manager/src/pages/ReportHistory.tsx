import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import { useSelectedStore } from "../context/selectedStoreContext";
import ReportHistoryForm from "../components/ReportHistoryForm";

const ReportHistory: React.FC<{}> = () => {
    const { selectedStore } = useSelectedStore();

    if (!selectedStore) {
        return <Navigate to={"/"} />;
    }

    return (
        <PageLayout>
            <Header
                title={selectedStore.title}
                goBackPath={`/store-dashboard`}
            />
            <Box padding={6}>
                <Text>Report history</Text>

                <Box marginTop={4}>
                    <ReportHistoryForm />
                </Box>
            </Box>
        </PageLayout>
    );
};

export default ReportHistory;
