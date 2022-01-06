import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { BiListUl, BiMessageSquareAdd } from "react-icons/bi";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import CustomLink from "../components/CustomLink";
import { useSelectedStore } from "../context/selectedStoreContext";

const ExpensesPage: React.FC<{}> = () => {
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
                <Text>Expense report</Text>

                <Box marginTop={4}>
                    <CustomLink
                        title="New Report"
                        icon={<BiMessageSquareAdd size={32} />}
                        toPath={`/expenses/new`}
                    />
                </Box>
                <Text marginTop={8}>Report history</Text>
                <Box marginTop={4}>
                    <CustomLink
                        title="View Reports"
                        icon={<BiListUl size={32} />}
                        // toPath={`/expenses/list`}
                        toPath={`/expenses/report/7`}
                    />
                </Box>
            </Box>
        </PageLayout>
    );
};

export default ExpensesPage;
