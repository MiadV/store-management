import { useQuery, UseQueryOptions } from "react-query";
import api from "../util/api";
import { ReportHistoryType } from "../types";

const getReportHistory = async (
    storeId: number,
    year: number,
    month: number,
    day: number
): Promise<ReportHistoryType> => {
    const { data } = await api().get(
        `/history/${storeId}/${year}/${month}/${day}`
    );
    return data;
};

export default function useReportHistoryByDate(
    storeId: number,
    year: number,
    month: number,
    day: number,
    options?: UseQueryOptions<
        unknown,
        unknown,
        ReportHistoryType,
        ["reportHistoryByDate", number, number, number, number]
    >
) {
    return useQuery(
        ["reportHistoryByDate", storeId, year, month, day],
        () => getReportHistory(storeId, year, month, day),
        {
            ...options,
        }
    );
}
