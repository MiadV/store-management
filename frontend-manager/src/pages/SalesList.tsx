import React, { useState } from "react";
import { Box, Skeleton, Stack, Text, VStack } from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";
import CustomSelectShop from "../components/CustomSelectShop";
import useLatestSaleReport from "../hooks/useLatestSaleReport";
import SalesReportListItem from "../components/SaleReportListItem";
import Card from "../components/Card";

const SalesList: React.FC<{}> = () => {
    const [storeId, setStoreId] = useState<number>(0);
    const { data: report, isLoading } = useLatestSaleReport(storeId, {
        enabled: storeId !== 0,
    });

    return (
        <PageLayout>
            <Box padding={6}>
                <Text>View latest sales report</Text>
                <VStack marginTop={4} spacing={4}>
                    <CustomSelectShop
                        onChange={(e) => {
                            let val = !isNaN(parseInt(e.target.value))
                                ? parseInt(e.target.value)
                                : 0;
                            setStoreId(val);
                        }}
                    />
                    <Box width={"full"}>
                        {isLoading ? (
                            <Card padding={3}>
                                <Stack>
                                    <Skeleton height="10px" />
                                    <Skeleton height="10px" />
                                </Stack>
                            </Card>
                        ) : report ? (
                            <SalesReportListItem report={report} />
                        ) : null}
                    </Box>
                </VStack>
            </Box>
        </PageLayout>
    );
};

export default SalesList;
