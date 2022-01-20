import * as yup from "yup";

const SaleReportFormSchema = yup
    .object()
    .shape({
        description: yup.string(),
        report_date: yup.date().typeError("Please select a date").defined(),
        cash_amount: yup.number().typeError("Please enter amount").defined(),
        card_amount: yup.number().typeError("Please enter amount").defined(),
        online_transfer_amount: yup
            .number()
            .typeError("Please enter amount")
            .defined(),
    })
    .defined();

export default SaleReportFormSchema;
