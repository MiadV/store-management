import { useQuery, UseQueryOptions } from "react-query";
import api from "../util/api";
import { ExpenseBalanceType } from "../types";

const getExpenseBalance = async (
    expenseTypeShopId: number
): Promise<ExpenseBalanceType> => {
    const { data } = await api().get(
        `/expense/limit-balance/${expenseTypeShopId}`
    );
    return data;
};

export default function useExpenseBalance(
    expenseTypeShopId: number,
    options?: UseQueryOptions<
        unknown,
        unknown,
        ExpenseBalanceType,
        ["expenseBalance", number]
    >
) {
    return useQuery(
        ["expenseBalance", expenseTypeShopId],
        () => getExpenseBalance(expenseTypeShopId),
        {
            staleTime: Infinity,
            ...options,
        }
    );
}
