import { useQuery } from "react-query";
import api from "../util/api";
import { ShopType } from "./useAuth";

export type SaleReportType = {
    saleId: number;
    description: string;
    reportDate: string;
    cashAmount: string;
    cardAmount: string;
    onlineTransferAmount: string;
    TotalAmount: string;
    createdAt: string;
    updatedAt: string | null;
    shop: ShopType;
    user: {
        userId: number;
        name: string;
        email: string;
    };
};

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
