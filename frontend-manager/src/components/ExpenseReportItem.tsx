import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ReportCheckIcon from "../assets/vectors/ReportCheckIcon";
import { ExpenseReportType } from "../types";
import currencyFormat from "../util/currencyFormat";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const ExpenseReportItem: React.FC<{ report: ExpenseReportType }> = ({
    report,
}) => {
    const { reportDate, shop, description, amount, expenseType, images, user } =
        report;
    const navigate = useNavigate();

    return (
        <Box marginTop={8}>
            <Flex justifyContent="center">
                <Flex
                    bg="green.400"
                    width="130px"
                    height="130px"
                    borderRadius="100%"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ReportCheckIcon fill="white" width="80px" />
                </Flex>
            </Flex>
            <Flex direction="column" textAlign="center" marginTop={4}>
                <Text fontSize="lg" fontWeight="bold">
                    Sales Report Summary
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                    {format(new Date(reportDate), "dd MMMM yyyy")}
                </Text>

                <Flex direction="column" paddingX={6} marginTop={8} gap={1}>
                    <Flex justifyContent={"center"}>
                        <Text fontWeight={"semibold"}>{shop?.title}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>Type</Text>
                        <Text>{expenseType.title}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>Added By</Text>
                        <Text>{user?.name}</Text>
                    </Flex>
                    <Flex
                        justifyContent={"space-between"}
                        borderTop="1px"
                        borderBottom="1px"
                    >
                        <Text fontWeight={"semibold"}>Amount</Text>
                        <Text fontWeight={"semibold"}>
                            {currencyFormat(amount)}
                        </Text>
                    </Flex>

                    <Flex justifyContent={"space-between"} marginTop={4}>
                        {description}
                    </Flex>

                    {JSON.stringify(images)}
                </Flex>

                <Box marginTop={8}>
                    <Button
                        variant="outline"
                        colorScheme="teal"
                        onClick={() =>
                            navigate(`/store-dashboard`, {
                                replace: true,
                            })
                        }
                    >
                        Back to Dashboard
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default ExpenseReportItem;
