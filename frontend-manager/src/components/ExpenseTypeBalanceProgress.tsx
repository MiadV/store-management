import React from "react";
import { Text, Box, Progress } from "@chakra-ui/react";
import currencyFormat from "../util/currencyFormat";
import { ExpenseBalanceType } from "../types";

const ExpenseTypeBalanceProgress: React.FC<{
    expenseBalance: ExpenseBalanceType;
}> = (props) => {
    const limit = props.expenseBalance.limit
        ? parseFloat(props.expenseBalance.limit)
        : null;
    const currentTotal = parseFloat(props.expenseBalance.currentTotal);
    const isStrict = props.expenseBalance.isStrict;

    if (limit === null) {
        return (
            <Text fontSize="sm">{`Spend: ${currencyFormat(
                currentTotal
            )}`}</Text>
        );
    }

    if (currentTotal > limit) {
        return (
            <Box>
                <Text fontSize="sm" color="red.500">
                    {`${currencyFormat(
                        currentTotal - limit
                    )} passed ${currencyFormat(limit)} limit`}
                </Text>
            </Box>
        );
    }

    return (
        <Box>
            <Progress variant="outline" value={(currentTotal / limit) * 100} />
            <Text fontSize="sm">
                {`${currencyFormat(currentTotal)} / ${currencyFormat(limit)} ${
                    isStrict ? "Capped" : ""
                }`}
            </Text>
        </Box>
    );
};

export default ExpenseTypeBalanceProgress;
