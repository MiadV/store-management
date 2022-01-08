import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { BiChevronRight, BiImages, BiReceipt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ExpenseReportType } from "../types";
import currencyFormat from "../util/currencyFormat";
import Card from "./Card";

const ExpenseReportListItem: React.FC<{ report: ExpenseReportType }> = ({
    report,
}) => {
    const { reportDate, amount, expenseType, images } = report;
    return (
        <Card padding={3}>
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                    <Box boxSize="32px">
                        <BiReceipt size={32} />
                    </Box>
                    <Flex direction={"column"} marginX={2}>
                        <Text fontSize="sm">
                            {format(new Date(reportDate), "dd MMMM Y")}
                        </Text>
                        <Text fontSize="xl" fontWeight="semibold">
                            {currencyFormat(amount)}
                        </Text>
                        <Flex alignItems={"center"}>
                            <Text
                                fontSize="sm"
                                fontWeight="semibold"
                                marginRight={1}
                            >
                                {expenseType.title}
                            </Text>
                            {images.length > 0 && <BiImages />}
                        </Flex>
                    </Flex>
                </Flex>

                <IconButton
                    variant="outline"
                    aria-label="select store"
                    size="sm"
                    to={`/expenses/report/${report.expenseId}`}
                    as={Link}
                    icon={<BiChevronRight size={24} />}
                />
            </Flex>
        </Card>
    );
};

export default ExpenseReportListItem;
