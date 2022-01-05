import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import NewSaleForm from "../components/NewSaleForm";
import { useSelectedStore } from "../context/selectedStoreContext";
import { Navigate } from "react-router-dom";

const NewSalesReport: React.FC<{}> = () => {
    const { selectedStore } = useSelectedStore();

    if (!selectedStore) {
        return <Navigate to={"/"} />;
    }

    return (
        <PageLayout>
            <Header title={selectedStore?.title} goBackPath={`/sales`} />
            <Box padding={6}>
                <Text>Daily sale form</Text>
                <VStack marginTop={4}>
                    <NewSaleForm storeId={selectedStore?.shopId} />
                </VStack>
            </Box>
        </PageLayout>
    );
};

export default NewSalesReport;
