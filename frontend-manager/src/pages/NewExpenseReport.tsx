import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import { useSelectedStore } from "../context/selectedStoreContext";
import { Navigate } from "react-router-dom";
import NewExpenseForm from "../components/NewExpenseForm";

const NewExpenseReport: React.FC<{}> = () => {
    const { selectedStore } = useSelectedStore();

    if (!selectedStore) {
        return <Navigate to={"/"} />;
    }

    return (
        <PageLayout>
            <Header title={selectedStore?.title} goBackPath={`/sales`} />
            <Box padding={6}>
                <Text>Daily expense form</Text>
                <VStack marginTop={4}>
                    <NewExpenseForm storeId={selectedStore?.shopId} />
                </VStack>
            </Box>
        </PageLayout>
    );
};

export default NewExpenseReport;
