import React from "react";
import {
    Box,
    Flex,
    IconButton,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { BiArrowBack } from "react-icons/bi";
import ReportHistoryIcon from "../assets/vectors/ReportHistoryIcon";
import { ReportHistoryType } from "../types";
import currencyFormat from "../util/currencyFormat";

const ReportHistorySummaryItem: React.FC<{ report: ReportHistoryType }> = ({
    report,
}) => {
    const bgColor = useColorModeValue("gray.200", "gray.700");
    const { saleReport, expenseReports, sumOfExpenses, balance } = report;

    return (
        <Box>
            <Flex alignItems={"center"}>
                <Link to="/history" replace={true}>
                    <IconButton
                        variant="ghost"
                        isRound
                        aria-label="Go back one page"
                        icon={<BiArrowBack size={32} />}
                    />
                </Link>
            </Flex>
            <Flex justifyContent="center" marginTop={8} marginBottom={2}>
                <Flex
                    bg="green.400"
                    width="130px"
                    height="130px"
                    borderRadius="100%"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ReportHistoryIcon
                        fill="white"
                        width="80px"
                        height="80px"
                    />
                </Flex>
            </Flex>
            <Flex justifyContent="center" direction="column" marginBottom={2}>
                <Flex justifyContent={"center"}>
                    <Text fontWeight={"bold"} fontSize="large">
                        {saleReport.shop?.title}
                    </Text>
                </Flex>
                <Flex justifyContent={"center"}>
                    <Text fontWeight={"bold"} fontSize="md">
                        {format(
                            new Date(saleReport.reportDate),
                            "dd MMMM yyyy"
                        )}
                    </Text>
                </Flex>
            </Flex>
            <Flex
                direction="column"
                textAlign="center"
                padding={4}
                borderRadius={8}
                bg={bgColor}
            >
                <Flex direction="column" gap={1}>
                    <Flex justifyContent={"center"} borderBottom="1px">
                        <Text fontWeight={"semibold"}>Sales</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>Cash</Text>
                        <Text>{currencyFormat(saleReport.cashAmount)}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>Card</Text>
                        <Text>{currencyFormat(saleReport.cardAmount)}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>Online Transfer</Text>
                        <Text>
                            {currencyFormat(saleReport.onlineTransferAmount)}
                        </Text>
                    </Flex>

                    <Flex justifyContent={"space-between"} borderTop="1px">
                        <Text fontWeight={"semibold"}>Total</Text>
                        <Text fontWeight={"semibold"}>
                            {currencyFormat(saleReport.TotalAmount)}
                        </Text>
                    </Flex>
                    <Flex
                        justifyContent={"center"}
                        borderBottom="1px"
                        marginTop={2}
                    >
                        <Text fontWeight={"semibold"}>Expenses</Text>
                    </Flex>
                    {expenseReports.map((item) => (
                        <Flex
                            justifyContent={"space-between"}
                            key={item.expenseId}
                        >
                            <Text>{item.expenseType.title}</Text>
                            <Text>{currencyFormat(item.amount)}</Text>
                        </Flex>
                    ))}

                    <Flex justifyContent={"space-between"} borderTop="1px">
                        <Text fontWeight={"semibold"}>Total</Text>
                        <Text fontWeight={"semibold"}>
                            {currencyFormat(sumOfExpenses)}
                        </Text>
                    </Flex>
                    <Flex
                        justifyContent={"space-between"}
                        borderBottom="1px"
                        borderTop="1px"
                        marginTop={2}
                    >
                        <Text fontWeight={"semibold"}>Balance</Text>
                        <Text
                            fontWeight={"semibold"}
                            color={balance >= 0 ? "" : "red"}
                        >
                            {currencyFormat(balance)}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default ReportHistorySummaryItem;
