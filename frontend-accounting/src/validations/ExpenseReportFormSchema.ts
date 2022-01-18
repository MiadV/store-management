import * as yup from 'yup';

export const ExpenseReportFormSchema = yup
  .object()
  .shape({
    shop_id: yup.number().typeError('Please select a shop').defined('Please select a shop'),
    expense_type_shop_id: yup.number().typeError('Please select a type').defined(),
    description: yup.string(),
    report_date: yup.date().typeError('Please select a date').defined(),
    amount: yup.number().defined(),
  })
  .defined();

export const ExpenseReportEditSchema = yup
  .object()
  .shape({
    description: yup.string(),
    report_date: yup.date().typeError('Please select a date').defined(),
    amount: yup.number().defined(),
  })
  .defined();
