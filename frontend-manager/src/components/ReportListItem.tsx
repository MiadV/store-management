import React from "react";
import { Flex, Text, Box, IconButton } from "@chakra-ui/react";
import { format } from "date-fns";
import { BiChevronRight } from "react-icons/bi";

import Card from "./Card";

type ReportListItemProps = {
    amount: string;
    callback?: () => void;
    icon?: JSX.Element;
    date: string;
};

const ReportListItem: React.FC<ReportListItemProps> = (props) => {
    const { amount, callback, icon, date } = props;

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
                            RM {amount}
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
