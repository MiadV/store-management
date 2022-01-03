import { useMutation, useQueryClient } from "react-query";
import api from "../util/api";

type ErrorType = Record<string, [string]>;

export type LoginErrorType = {
    response: {
        data: {
            errors: ErrorType;
        };
    };
};

type NewSaleReportResponse = {
    data: {
        token: string;
    };
};

export interface INewSaleReport {
    shop_id: number;
    description: string;
    report_date: string;
    cash_amount: number;
    card_amount: number;
    online_transfer_amount: number;
}

const postNewSaleReport = async (
    data: INewSaleReport
): Promise<NewSaleReportResponse> => {
    return await api().post("/sale", data);
};

export default function useLoginMutation() {
    return useMutation<NewSaleReportResponse, any, INewSaleReport>(
        async (data) => postNewSaleReport(data)
    );
}
