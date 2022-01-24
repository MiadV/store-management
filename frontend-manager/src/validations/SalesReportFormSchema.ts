import * as yup from "yup";

export const SalesReportFormSchema = yup
    .object()
    .shape({
        shop_id: yup
            .number()
            .typeError("Please select a shop")
            .defined("Please select a shop"),
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
