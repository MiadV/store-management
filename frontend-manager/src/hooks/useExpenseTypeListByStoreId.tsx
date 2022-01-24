import { useQuery } from "react-query";
import api from "../util/api";
import { ExpenseRuleType } from "../types";

const getExpenseTypeListByStoreId = async (
    storeId: number
): Promise<ExpenseRuleType[]> => {
    const { data } = await api().get(`/expense/types/${storeId}`);
    return data;
};

export default function useExpenseTypeListByStoreId(storeId: number) {
    return useQuery(
        ["expenseTypeListByStoreId", storeId],
        () => getExpenseTypeListByStoreId(storeId),
        {
            staleTime: Infinity,
        }
    );
}
