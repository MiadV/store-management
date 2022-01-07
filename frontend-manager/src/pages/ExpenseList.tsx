import React from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import { useSelectedStore } from "../context/selectedStoreContext";
import useCurrntMonthExpenses from "../hooks/useCurrentMonthExpenses";

const ExpenseList: React.FC<{}> = () => {
    const { selectedStore } = useSelectedStore();
    const { status, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useCurrntMonthExpenses(selectedStore?.shopId!);

    console.log(data);

    if (!selectedStore) {
        return <Navigate to={"/"} />;
    }

    return (
        <PageLayout>
            <Header title={selectedStore?.title} goBackPath={`/expenses`} />
            <Box padding={6}>
                <Text>Current month expenses</Text>
                <VStack marginTop={4}>
                    <Text>{status}</Text>
                    <br />
                    <Text>{JSON.stringify(data)}</Text>

                    <Button
                        isDisabled={!hasNextPage || isFetchingNextPage}
                        isLoading={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                    >
                        Load More
                    </Button>
                </VStack>
            </Box>
        </PageLayout>
    );
};

export default ExpenseList;
