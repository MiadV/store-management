import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth from "../hooks/useAuth";
import TaskItem from "../components/TaskItem";
import SalesIcon from "../assets/vectors/SalesIcon";
import ExpenseIcon from "../assets/vectors/ExpenseIcon";
import { PermissionsType } from "../types";
import { useSelectedStore } from "../context/selectedStoreContext";
import { Navigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";

const StoreDashboard: React.FC<{}> = () => {
    const { selectedStore } = useSelectedStore();
    const { data: authUser, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingOverlay />;
    }

    if (!selectedStore) {
        return <Navigate to={"/"} />;
    }

    return (
        <PageLayout>
            <Header title={selectedStore.title} />
            <Box padding={6}>
                <Text>Please select a task</Text>

                {authUser && (
                    <RenderTaskItems permissionsArray={authUser.permissions} />
                )}
            </Box>
        </PageLayout>
    );
};

export default StoreDashboard;

const RenderTaskItems: React.FC<{
    permissionsArray: PermissionsType;
}> = (props) => {
    const { permissionsArray } = props;

    return (
        <SimpleGrid columns={2} spacing={4} marginTop={4}>
            {permissionsArray.includes("SALES_REPORT") && (
                <TaskItem
                    taskTitle="Sales Report"
                    icon={<SalesIcon width="60px" />}
                    toPath={`/sales`}
                />
            )}
            {permissionsArray.includes("EXPENSE_REPORT") && (
                <TaskItem
                    taskTitle="Expense Report"
                    icon={<ExpenseIcon width="60px" />}
                    toPath={`/expenses`}
                />
            )}
        </SimpleGrid>
    );
};
