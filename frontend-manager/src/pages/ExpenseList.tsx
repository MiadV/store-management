import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    List,
    ListItem,
    Skeleton,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import { useSelectedStore } from "../context/selectedStoreContext";
import useCurrntMonthExpenses from "../hooks/useCurrentMonthExpenses";
import { ExpenseReportType } from "../types";
import ExpenseReportListItem from "../components/ExpenseReportListItem";
import Card from "../components/Card";

const ExpenseList: React.FC<{}> = () => {
    const { selectedStore } = useSelectedStore();
    const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useCurrntMonthExpenses(selectedStore?.shopId!);
    const [expenseList, setExpenseList] = useState<ExpenseReportType[]>([]);

    useEffect(() => {
        if (data?.pages) {
            let pages = data?.pages;
            let reports: ExpenseReportType[] = [];

            pages.forEach((page) => {
                const newReports = page.data.map((report) => report);
                reports = [...reports, ...newReports];
            });

            setExpenseList(reports);
        }
    }, [data, setExpenseList]);

    if (!selectedStore) {
        return <Navigate to={"/"} />;
    }

    return (
        <PageLayout>
            <Header title={selectedStore?.title} goBackPath={`/expenses`} />
            <Box padding={6}>
                <Text>Current month expenses</Text>
                <VStack marginTop={4}>
                    <RenderExpenseList
                        expenseList={expenseList}
                        isLoading={isLoading}
                    />

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

const RenderExpenseList: React.FC<{
    expenseList: ExpenseReportType[];
    isLoading: boolean;
}> = ({ expenseList, isLoading }) => {
    return (
        <List spacing={3} width={"100%"}>
            {expenseList.map((report) => (
                <ListItem key={report.expenseId}>
                    <ExpenseReportListItem report={report} />
                </ListItem>
            ))}
            {isLoading && (
                <Card padding={3}>
                    <Stack>
                        <Skeleton height="10px" />
                        <Skeleton height="10px" />
                    </Stack>
                </Card>
            )}
        </List>
    );
};
