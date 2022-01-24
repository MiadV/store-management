import api from "../util/api";
import { ExpenseReportType, PaginatedList } from "../types";

export const getCurrentMonthExpenses = async (
    shopId: number,
    pageParam: number
): Promise<PaginatedList<ExpenseReportType>> => {
    const { data } = await api().get(
        `/expense/current-month/${shopId}?page=${pageParam}`
    );
    return data;
};
