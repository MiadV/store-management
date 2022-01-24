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
import PageLayout from "../layouts/PageLayout";
import { ExpenseReportType } from "../types";
import ExpenseReportListItem from "../components/ExpenseReportListItem";
import Card from "../components/Card";
import CustomSelectShop from "../components/CustomSelectShop";
import { useInfiniteQuery } from "react-query";
import { getCurrentMonthExpenses } from "../hooks/useCurrentMonthExpenses";

const ExpenseList: React.FC<{}> = () => {
    const [storeId, setStoreId] = useState<number>(0);
    const [expenseList, setExpenseList] = useState<ExpenseReportType[]>([]);

    const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery(
            ["currntMonthExpenses", storeId],
            ({ pageParam = 1 }) => getCurrentMonthExpenses(storeId, pageParam),
            {
                getNextPageParam: (lastPage) =>
                    lastPage.links.next
                        ? lastPage.meta.current_page + 1
                        : undefined,
                staleTime: Infinity,
                enabled: storeId !== 0,
            }
        );

    useEffect(() => {
        if (data?.pages && storeId !== 0) {
            let pages = data?.pages;
            let reports: ExpenseReportType[] = [];

            pages.forEach((page) => {
                const newReports = page.data.map((report) => report);
                reports = [...reports, ...newReports];
            });

            setExpenseList(reports);
        } else {
            setExpenseList([]);
        }
    }, [data, setExpenseList, storeId]);

    return (
        <PageLayout>
            <Box padding={6}>
                <Text>Current month expenses</Text>
                <VStack marginTop={4}>
                    <CustomSelectShop
                        onChange={(e) => {
                            let val = !isNaN(parseInt(e.target.value))
                                ? parseInt(e.target.value)
                                : 0;
                            setStoreId(val);
                        }}
                    />
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
