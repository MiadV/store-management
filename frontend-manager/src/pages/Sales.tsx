import React from "react";
import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { BiMessageSquareAdd } from "react-icons/bi";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useLatestSaleReport from "../hooks/useLatestSaleReport";
import ReportListItem from "../components/SaleReportListItem";
import CustomLink from "../components/CustomLink";
import { useSelectedStore } from "../context/selectedStoreContext";
import Card from "../components/Card";

const SalesPage: React.FC<{}> = () => {
    const { selectedStore } = useSelectedStore();
    const { data: saleReport, isLoading } = useLatestSaleReport(
        selectedStore!.shopId,
        { enabled: !!selectedStore }
    );

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
                    {isLoading || !saleReport ? (
                        <Card padding={3}>
                            <Stack>
                                <Skeleton height="10px" />
                                <Skeleton height="10px" />
                            </Stack>
                        </Card>
                    ) : (
                        <ReportListItem report={saleReport} />
                    )}
                </Box>
            </Box>
        </PageLayout>
    );
};

export default SalesPage;
