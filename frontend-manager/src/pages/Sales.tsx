import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { BiFile, BiMessageSquareAdd } from "react-icons/bi";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useLatestSaleReport from "../hooks/useLatestSaleReport";
import ReportListItem from "../components/ReportListItem";
import CustomLink from "../components/CustomLink";
import { useSelectedStore } from "../context/selectedStoreContext";
import LoadingOverlay from "../components/LoadingOverlay";

const SalesPage: React.FC<{}> = () => {
    const { selectedStore } = useSelectedStore();
    const { data: saleReport, isLoading } = useLatestSaleReport(
        selectedStore!.shopId,
        { enabled: !!selectedStore }
    );

    if (isLoading) {
        return <LoadingOverlay />;
    }

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
                <Text>Sales report</Text>

                <Box marginTop={4}>
                    <CustomLink
                        title="New Report"
                        icon={<BiMessageSquareAdd size={32} />}
                        toPath={`/sales/new`}
                    />
                </Box>
                <Text marginTop={8}>Latest report</Text>
                <Box marginTop={4}>
                    <ReportListItem
                        amount={saleReport?.TotalAmount}
                        date={saleReport?.reportDate}
                        icon={<BiFile size={32} />}
                        isLoading={isLoading}
                        toPath={`/sales/report/${saleReport?.saleId}`}
                    />
                </Box>
            </Box>
        </PageLayout>
    );
};

export default SalesPage;
