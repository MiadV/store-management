import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth, { PermissionsType } from "../hooks/useAuth";
import NoOptionsCard from "../components/NoOptionsCard";
import TaskItem from "../components/TaskItem";
import SalesIcon from "../assets/vectors/SalesIcon";
import ExpenseIcon from "../assets/vectors/ExpenseIcon";

const StoreDashboard: React.FC<{}> = () => {
    let { storeId } = useParams();
    const { data: authUser } = useAuth();

    // validate storeId
    if (!storeId || authUser?.shops[parseInt(storeId)] === undefined) {
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
            <Header title={authUser!.shops[parseInt(storeId!)].title} />
            <Box padding={6}>
                <Text>Please select a task</Text>

                <RenderTaskItems
                    permissionsArray={authUser.permissions}
                    storeId={parseInt(storeId)}
                />
            </Box>
        </PageLayout>
    );
};

export default StoreDashboard;

const RenderTaskItems: React.FC<{
    permissionsArray: PermissionsType;
    storeId: number;
}> = (props) => {
    const permissionsArray = props.permissionsArray;
    let navigate = useNavigate();

    return (
        <SimpleGrid columns={2} spacing={4} marginTop={4}>
            {permissionsArray.includes("SALES_REPORT") && (
                <TaskItem
                    taskTitle="Sales Report"
                    icon={<SalesIcon width="60px" />}
                    callback={() => navigate(`/sales/${props.storeId}`)}
                />
            )}
            {permissionsArray.includes("EXPENSE_REPORT") && (
                <TaskItem
                    taskTitle="Expense Report"
                    icon={<ExpenseIcon width="60px" />}
                    callback={() => navigate(`/expenses/${props.storeId}`)}
                />
            )}
        </SimpleGrid>
    );
};
