import { useMutation } from "react-query";
import {
    ExpenseReportType,
    INewExpenseReport,
    MutationReponse,
} from "../types";
import api from "../util/api";

const postNewExpenseReport = async (
    data: INewExpenseReport
): Promise<MutationReponse<ExpenseReportType>> => {
    return await api().post("/expense", data);
};

export function useNewExpenseReportMutation() {
    return useMutation<
        MutationReponse<ExpenseReportType>,
        any,
        INewExpenseReport
    >(async (data) => postNewExpenseReport(data));
}
