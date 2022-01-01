import React from "react";
import { Flex, Text, Box, IconButton, Stack, Skeleton } from "@chakra-ui/react";
import { format } from "date-fns";
import { BiChevronRight } from "react-icons/bi";

import Card from "./Card";
import currencyFormat from "../util/currencyFormat";

type ReportListItemProps = {
    amount?: string;
    callback?: () => void;
    icon?: JSX.Element;
    date?: string;
    isLoading?: boolean;
};

const ReportListItem: React.FC<ReportListItemProps> = (props) => {
    const { amount, callback, icon, date, isLoading } = props;

    if (isLoading) {
        return (
            <Card padding={3}>
                <Stack>
                    <Skeleton height="10px" />
                    <Skeleton height="10px" />
                </Stack>
            </Card>
        );
    }

    if (!amount || !date) {
        return (
            <Card padding={3}>
                <Text>Nothing yet...ss</Text>
            </Card>
        );
    }

    return (
        <Card padding={3}>
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                    {icon && <Box boxSize="32px">{icon}</Box>}
                    <Flex direction={"column"} marginX={2}>
                        <Text fontSize="sm">
                            {format(new Date(date), "dd MMMM Y")}
                        </Text>
                        <Text fontSize="xl" fontWeight="semibold">
                            {currencyFormat(amount)}
                        </Text>
                    </Flex>
                </Flex>

                {callback && (
                    <IconButton
                        variant="outline"
                        aria-label="select store"
                        size="sm"
                        onClick={callback}
                        icon={<BiChevronRight size={24} />}
                    />
                )}
            </Flex>
        </Card>
    );
};

export default ReportListItem;

ReportListItem.defaultProps = {
    isLoading: false,
};
