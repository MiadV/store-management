import { useQuery } from "react-query";
import api from "../util/api";
import { ExpenseReportType } from "../types";

const getExpenseReportById = async (
    expenseReportId: number
): Promise<ExpenseReportType> => {
    const { data } = await api().get(`/expense/${expenseReportId}`);
    return data;
};

export default function useExpenseReportById(expenseReportId: number) {
    return useQuery(
        ["expenseReportById", expenseReportId],
        () => getExpenseReportById(expenseReportId),
        {
            staleTime: Infinity,
        }
    );
}
