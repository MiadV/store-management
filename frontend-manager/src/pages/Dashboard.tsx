import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";
import useAuth from "../hooks/useAuth";
import TaskItem from "../components/TaskItem";
import SalesIcon from "../assets/vectors/SalesIcon";
import ExpenseIcon from "../assets/vectors/ExpenseIcon";
import ReportHistoryIcon from "../assets/vectors/ReportHistoryIcon";
import { PermissionType } from "../types";

import LoadingOverlay from "../components/LoadingOverlay";

const Dashboard: React.FC<{}> = () => {
    const { data: authUser, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <PageLayout>
            <Box padding={6}>
                <Text>Please select a task</Text>

                {authUser && (
                    <RenderTaskItems permissionsArray={authUser.permissions} />
                )}
            </Box>
        </PageLayout>
    );
};

export default Dashboard;

const RenderTaskItems: React.FC<{
    permissionsArray: PermissionType[];
}> = (props) => {
    const { permissionsArray } = props;

    const permNames = permissionsArray.map((i) => i.name);

    return (
        <SimpleGrid columns={2} spacing={4} marginTop={4}>
            {permNames.includes("SALES_REPORT") && (
                <TaskItem
                    taskTitle="Sales Report"
                    icon={<SalesIcon width="60px" />}
                    toPath={`/sales`}
                />
            )}
            {permNames.includes("EXPENSE_REPORT") && (
                <TaskItem
                    taskTitle="Expense Report"
                    icon={<ExpenseIcon width="60px" />}
                    toPath={`/expenses`}
                />
            )}
            {permNames.includes("REPORT_HISTORY") && (
                <TaskItem
                    taskTitle="Report History"
                    icon={<ReportHistoryIcon width="60px" />}
                    toPath={`/history`}
                />
            )}
        </SimpleGrid>
    );
};
