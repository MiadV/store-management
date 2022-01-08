import React from "react";
import { Flex, Text, Box, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { BiChevronRight, BiFile } from "react-icons/bi";
import Card from "./Card";
import currencyFormat from "../util/currencyFormat";
import { SaleReportType } from "../types";

const ReportListItem: React.FC<{ report: SaleReportType }> = ({ report }) => {
    const { saleId, reportDate, TotalAmount } = report;

    return (
        <Card padding={3}>
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                    <Box boxSize="32px">
                        <BiFile size={32} />
                    </Box>
                    <Flex direction={"column"} marginX={2}>
                        <Text fontSize="sm">
                            {format(new Date(reportDate), "dd MMMM Y")}
                        </Text>
                        <Text fontSize="xl" fontWeight="semibold">
                            {currencyFormat(TotalAmount)}
                        </Text>
                    </Flex>
                </Flex>

                <IconButton
                    variant="outline"
                    aria-label="select store"
                    size="sm"
                    to={`/sales/report/${saleId}`}
                    as={Link}
                    icon={<BiChevronRight size={24} />}
                />
            </Flex>
        </Card>
    );
};

export default ReportListItem;
