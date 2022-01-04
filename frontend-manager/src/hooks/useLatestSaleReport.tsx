import { useQuery } from "react-query";
import api from "../util/api";
import { SaleReportType } from "../types";

const getLatestSaleReport = async (
    storeId: number
): Promise<SaleReportType> => {
    const { data } = await api().get(`/sale/latest/${storeId}`);
    return data;
};

export default function useLatestSaleReport(storeId: number) {
    return useQuery(
        ["latestSaleReport", storeId],
        () => getLatestSaleReport(storeId),

        {
            staleTime: Infinity,
        }
    );
}
