import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth from "../hooks/useAuth";
import NoOptionsCard from "../components/NoOptionsCard";
import TaskItem from "../components/TaskItem";
import SalesIcon from "../assets/vectors/SalesIcon";
import ExpenseIcon from "../assets/vectors/ExpenseIcon";
import { PermissionsType, ShopType } from "../types";
import SimpleLayout from "../layouts/SimpleLayout";

const StoreDashboard: React.FC<{}> = () => {
    const [selectedStore, setSelectedStore] = useState<ShopType | undefined>();
    let { storeId } = useParams();
    const { data: authUser, isLoading } = useAuth();

    useEffect(() => {
        if (authUser && storeId) {
            setSelectedStore(
                authUser.shops.find((s) => s.shopId === parseInt(storeId!))
            );
        }
    }, [isLoading, authUser, storeId, setSelectedStore]);

    if (isLoading) {
        return (
            <SimpleLayout>
                <VStack justifyContent={"center"} align={"center"}>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="teal.300"
                        size="xl"
                    />
                </VStack>
            </SimpleLayout>
        );
    }

    // validate storeId
    if (!storeId || !selectedStore) {
        return (
            <PageLayout>
                <Header title="No Store!" goBackPath="/" />
                <NoOptionsCard
                    title="Oops!"
                    subtitle="Something went wrong. Try again."
                />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Header title={selectedStore.title} />
            <Box padding={6}>
                <Text>Please select a task</Text>

                {authUser && (
                    <RenderTaskItems
                        permissionsArray={authUser.permissions}
                        storeId={parseInt(storeId)}
                    />
                )}
            </Box>
        </PageLayout>
    );
};

export default StoreDashboard;

const RenderTaskItems: React.FC<{
    permissionsArray: PermissionsType;
    storeId: number;
}> = (props) => {
    const { permissionsArray } = props;

    return (
        <SimpleGrid columns={2} spacing={4} marginTop={4}>
            {permissionsArray.includes("SALES_REPORT") && (
                <TaskItem
                    taskTitle="Sales Report"
                    icon={<SalesIcon width="60px" />}
                    toPath={`/sales/${props.storeId}`}
                />
            )}
            {permissionsArray.includes("EXPENSE_REPORT") && (
                <TaskItem
                    taskTitle="Expense Report"
                    icon={<ExpenseIcon width="60px" />}
                    toPath={`/expenses/${props.storeId}`}
                />
            )}
        </SimpleGrid>
    );
};
