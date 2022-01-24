import { useMutation } from "react-query";
import { INewSaleReport, MutationReponse, SaleReportType } from "../types";
import api from "../util/api";

const postNewSaleReport = async (
    data: INewSaleReport
): Promise<MutationReponse<SaleReportType>> => {
    return await api().post("/sale", data);
};

export default function useNewSaleReportMutation() {
    return useMutation<MutationReponse<SaleReportType>, any, INewSaleReport>(
        async (data) => postNewSaleReport(data)
    );
}
