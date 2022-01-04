import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { BiFile, BiMessageSquareAdd } from "react-icons/bi";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth from "../hooks/useAuth";
import useLatestSaleReport from "../hooks/useLatestSaleReport";
import ReportListItem from "../components/ReportListItem";
import CustomLink from "../components/CustomLink";

const SalesPage: React.FC<{}> = () => {
    let { storeId } = useParams();
    const sanitizedStoreId = storeId ? parseInt(storeId) : 0;
    const { data: authUser } = useAuth();
    const { data: saleReport, isLoading } =
        useLatestSaleReport(sanitizedStoreId);

    return (
        <PageLayout>
            <Header
                title={authUser!.shops[sanitizedStoreId].title}
                goBackPath={`/store/${storeId}`}
            />
            <Box padding={6}>
                <Text>Sales report</Text>

                <Box marginTop={4}>
                    <CustomLink
                        title="New Report"
                        icon={<BiMessageSquareAdd size={32} />}
                        toPath={`/sales/new/${sanitizedStoreId}`}
                    />
                </Box>
                <Text marginTop={8}>Latest report</Text>
                <Box marginTop={4}>
                    <ReportListItem
                        amount={saleReport?.TotalAmount}
                        date={saleReport?.reportDate}
                        icon={<BiFile size={32} />}
                        isLoading={isLoading}
                        toPath={`/sales/${storeId}/report/${saleReport?.saleId}`}
                    />
                </Box>
            </Box>
        </PageLayout>
    );
};

export default SalesPage;
