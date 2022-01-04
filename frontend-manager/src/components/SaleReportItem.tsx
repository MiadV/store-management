import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ReportCheckIcon from "../assets/vectors/ReportCheckIcon";
import { SaleReportType } from "../types";
import currencyFormat from "../util/currencyFormat";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const SaleReportItem: React.FC<{ report: SaleReportType }> = ({ report }) => {
    const {
        reportDate,
        shop,
        cardAmount,
        cashAmount,
        onlineTransferAmount,
        TotalAmount,
    } = report;
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
                    <Flex justifyContent={"center"} color={"gray.500"}>
                        <Text fontWeight={"semibold"}>{shop?.title}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} color={"gray.500"}>
                        <Text>Cash</Text>
                        <Text>{currencyFormat(cashAmount)}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} color={"gray.500"}>
                        <Text>Card</Text>
                        <Text>{currencyFormat(cardAmount)}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} color={"gray.500"}>
                        <Text>Online Transfer</Text>
                        <Text>{currencyFormat(onlineTransferAmount)}</Text>
                    </Flex>
                    <Flex
                        justifyContent={"space-between"}
                        color={"gray.500"}
                        borderTop="1px"
                    >
                        <Text fontWeight={"semibold"}>Total Sale</Text>
                        <Text fontWeight={"semibold"}>
                            {currencyFormat(TotalAmount)}
                        </Text>
                    </Flex>
                </Flex>

                <Box marginTop={8}>
                    <Button
                        variant="outline"
                        colorScheme="teal"
                        onClick={() =>
                            navigate(`/store/${shop?.shopId}`, {
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

export default SaleReportItem;
