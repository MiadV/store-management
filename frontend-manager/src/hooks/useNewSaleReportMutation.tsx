import { useMutation } from "react-query";
import { INewSaleReport, NewSaleReportResponse } from "../types";
import api from "../util/api";

const postNewSaleReport = async (
    data: INewSaleReport
): Promise<NewSaleReportResponse> => {
    return await api().post("/sale", data);
};

export default function useNewSaleReportMutation() {
    return useMutation<NewSaleReportResponse, any, INewSaleReport>(
        async (data) => postNewSaleReport(data)
    );
}
