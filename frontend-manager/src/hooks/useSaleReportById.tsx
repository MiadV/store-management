import { useQuery } from "react-query";
import api from "../util/api";
import { SaleReportType } from "../types";

const getSaleReportById = async (
    saleReportId: number | string
): Promise<SaleReportType> => {
    const { data } = await api().get(`/sale/${saleReportId}`);
    return data;
};

export default function useSaleReportById(saleReportId: number | string) {
    return useQuery(
        ["saleReportById", saleReportId],
        () => getSaleReportById(saleReportId),
        {
            staleTime: Infinity,
        }
    );
}
