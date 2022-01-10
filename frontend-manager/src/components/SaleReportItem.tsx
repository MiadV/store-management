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
import ReportCheckIcon from "../assets/vectors/ReportCheckIcon";
import { SaleReportType } from "../types";
import currencyFormat from "../util/currencyFormat";

const SaleReportItem: React.FC<{ report: SaleReportType }> = ({ report }) => {
    const bgColor = useColorModeValue("gray.200", "gray.700");
    const {
        reportDate,
        shop,
        cardAmount,
        cashAmount,
        onlineTransferAmount,
        TotalAmount,
        description,
        user,
    } = report;

    return (
        <Box>
            <Flex alignItems={"center"}>
                <Link to="/sales" replace={true}>
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
                    <ReportCheckIcon fill="white" width="80px" />
                </Flex>
            </Flex>
            <Flex justifyContent="center" direction="column" marginBottom={2}>
                <Flex justifyContent={"center"}>
                    <Text fontWeight={"bold"} fontSize="large">
                        {shop?.title}
                    </Text>
                </Flex>
                <Flex justifyContent={"center"}>
                    <Text fontWeight={"bold"} fontSize="md">
                        {format(new Date(reportDate), "dd MMMM yyyy")}
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
                    <Flex justifyContent={"space-between"}>
                        <Text>Cash</Text>
                        <Text>{currencyFormat(cashAmount)}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>Card</Text>
                        <Text>{currencyFormat(cardAmount)}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>Online Transfer</Text>
                        <Text>{currencyFormat(onlineTransferAmount)}</Text>
                    </Flex>
                    <Flex
                        justifyContent={"space-between"}
                        borderTop="1px"
                        borderBottom="1px"
                    >
                        <Text fontWeight={"semibold"}>Total Sale</Text>
                        <Text fontWeight={"semibold"}>
                            {currencyFormat(TotalAmount)}
                        </Text>
                    </Flex>

                    {description && (
                        <Flex direction={"column"}>
                            <Text fontWeight={"bold"}>Notes</Text>
                            <Text alignSelf={"start"}>{description}</Text>
                        </Flex>
                    )}

                    <Flex
                        justifyContent={"space-between"}
                        fontSize={"sm"}
                        marginTop={2}
                    >
                        <Text>Submitted by</Text>
                        <Text>{user?.name}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default SaleReportItem;
