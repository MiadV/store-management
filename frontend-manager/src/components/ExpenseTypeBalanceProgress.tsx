import React, { useState, useEffect } from "react";
import { Text, Box, Progress, Skeleton } from "@chakra-ui/react";
import currencyFormat from "../util/currencyFormat";
import useExpenseBalance from "../hooks/useExpenseBalance";

type StateType = {
    limit: number | null;
    currentTotal: number;
    isStrict: boolean;
};
const initState = { limit: null, currentTotal: 0, isStrict: false };

const ExpenseTypeBalanceProgress: React.FC<{
    expenseRuleId: number;
}> = ({ expenseRuleId = 0 }) => {
    const [state, setState] = useState<StateType>(initState);

    const { data: expenseBalance, isLoading } = useExpenseBalance(
        expenseRuleId,
        {
            enabled: expenseRuleId !== 0,
            staleTime: 10 * 60 * 1000,
        }
    );

    useEffect(() => {
        if (expenseBalance) {
            const limit = expenseBalance.limit
                ? parseFloat(expenseBalance.limit)
                : null;
            const currentTotal = parseFloat(expenseBalance.currentTotal);
            const isStrict = expenseBalance.isStrict;

            setState({ limit, currentTotal, isStrict });
        }
    }, [expenseBalance, setState]);

    return (
        <Skeleton isLoaded={!isLoading}>
            {state.limit === null ? (
                <Text fontSize="sm">{`Spend: ${currencyFormat(
                    state.currentTotal
                )}`}</Text>
            ) : state.currentTotal > state.limit ? (
                <Box>
                    <Text fontSize="sm" color="red.500">
                        {`${currencyFormat(
                            state.currentTotal - state.limit
                        )} passed ${currencyFormat(state.limit)} limit`}
                    </Text>
                </Box>
            ) : (
                <Box>
                    <Progress
                        variant="outline"
                        value={(state.currentTotal / state.limit) * 100}
                    />
                    <Text fontSize="sm">
                        {`${currencyFormat(
                            state.currentTotal
                        )} / ${currencyFormat(state.limit)} ${
                            state.isStrict ? "Capped" : ""
                        }`}
                    </Text>
                </Box>
            )}
        </Skeleton>
    );
};

export default ExpenseTypeBalanceProgress;
