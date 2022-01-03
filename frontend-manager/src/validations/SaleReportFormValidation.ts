import * as yup from "yup";

const SaleReportFormSchema = yup
    .object()
    .shape({
        description: yup.string(),
        report_date: yup.date().defined(),
        cash_amount: yup
            .number()
            .test("is-decimal", "invalid amount.", (value) =>
                (value + "").match(/^[0-9]\d?(?:\.\d{0,2})?$/) ? true : false
            )
            .defined(),
        card_amount: yup
            .number()
            .test("is-decimal", "invalid amount.", (value) =>
                (value + "").match(/^[0-9]\d?(?:\.\d{0,2})?$/) ? true : false
            )
            .defined(),
        online_transfer_amount: yup
            .number()
            .test("is-decimal", "invalid amount.", (value) =>
                (value + "").match(/^[0-9]\d?(?:\.\d{0,2})?$/) ? true : false
            )
            .defined(),
    })
    .defined();

export default SaleReportFormSchema;
