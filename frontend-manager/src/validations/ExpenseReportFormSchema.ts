import * as yup from "yup";

const ExpenseReportFormSchema = yup
    .object()
    .shape({
        expense_type_shop_id: yup
            .number()
            .typeError("Please select a shop")
            .defined(),
        description: yup.string(),
        report_date: yup.date().typeError("Please select a date").defined(),
        amount: yup.number().typeError("Please enter amount").defined(),
    })
    .defined();

export default ExpenseReportFormSchema;
