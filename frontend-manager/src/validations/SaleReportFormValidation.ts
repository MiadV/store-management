import * as yup from "yup";

const SaleReportFormSchema = yup
    .object()
    .shape({
        description: yup.string(),
        report_date: yup.date().defined(),
        cash_amount: yup.number().defined(),
        card_amount: yup.number().defined(),
        online_transfer_amount: yup.number().defined(),
    })
    .defined();

export default SaleReportFormSchema;
