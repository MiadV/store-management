import { useInfiniteQuery } from "react-query";
import api from "../util/api";
import { ExpenseReportType, PaginatedList } from "../types";

const getCurrntMonthExpenses = async (
    shopId: number,
    pageParam: number
): Promise<PaginatedList<ExpenseReportType>> => {
    const { data } = await api().get(
        `/expense/current-month/${shopId}?page=${pageParam}`
    );
    return data;
};

export default function useCurrntMonthExpenses(shopId: number) {
    return useInfiniteQuery(
        ["currntMonthExpenses", shopId],
        ({ pageParam = 1 }) => getCurrntMonthExpenses(shopId, pageParam),
        {
            getNextPageParam: (lastPage) =>
                lastPage.links.next
                    ? lastPage.meta.current_page + 1
                    : undefined,
            staleTime: Infinity,
        }
    );
}
