import * as yup from "yup";

const ExpenseReportFormSchema = yup
    .object()
    .shape({
        expense_type_shop_id: yup.number().defined(),
        description: yup.string(),
        report_date: yup.date().defined(),
        amount: yup.number().defined(),
    })
    .defined();

export default ExpenseReportFormSchema;
