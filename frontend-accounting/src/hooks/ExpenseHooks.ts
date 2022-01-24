import { UseQueryOptions, useQuery, useMutation } from 'react-query';
import api from '../util/api';
import {
  ExpenseReportType,
  IEditExpenseReport,
  INewExpenseReport,
  MutationReponse,
  PaginatedList,
} from '../types';
import { format } from 'date-fns';

const getExpenseList = async ({
  pageIndex,
  shopId,
  startDate,
  endDate,
}: {
  pageIndex: number;
  shopId?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
}): Promise<PaginatedList<ExpenseReportType>> => {
  const { data } = await api().get(`/accountant/expense`, {
    params: {
      page: pageIndex,
      shop_id: shopId,
      date_from: startDate && format(startDate, 'yyyy-MM-dd'),
      date_to: endDate && format(endDate, 'yyyy-MM-dd'),
    },
  });
  return data;
};

export function useExpenseList({
  pageIndex,
  shopId,
  startDate,
  endDate,
  options,
}: {
  pageIndex: number;
  shopId?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginatedList<ExpenseReportType>,
    [
      'expenseList',
      number,
      number | null | undefined,
      Date | null | undefined,
      Date | null | undefined
    ]
  >;
}) {
  return useQuery(
    ['expenseList', pageIndex, shopId, startDate, endDate],
    () => getExpenseList({ pageIndex, shopId, startDate, endDate }),
    { ...options }
  );
}

const postNewExpenseReport = async (
  data: INewExpenseReport
): Promise<MutationReponse<ExpenseReportType>> => {
  return await api().post('/expense', data);
};

export function useNewExpenseReportMutation() {
  return useMutation<MutationReponse<ExpenseReportType>, any, INewExpenseReport>(async (data) =>
    postNewExpenseReport(data)
  );
}

const updateExpense = async (
  data: IEditExpenseReport
): Promise<MutationReponse<ExpenseReportType>> => {
  return await api().put(`/accountant/expense/${data.reportId}`, data);
};

export function useUpdateExpenseMutation() {
  return useMutation<MutationReponse<ExpenseReportType>, any, IEditExpenseReport>(async (data) =>
    updateExpense(data)
  );
}

export const downloadExpenses = async ({
  shopId,
  startDate,
  endDate,
}: {
  shopId?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
}): Promise<any> => {
  return await api().get(`/accountant/expense/export`, {
    responseType: 'blob',
    params: {
      shop_id: shopId,
      date_from: startDate && format(startDate, 'yyyy-MM-dd'),
      date_to: endDate && format(endDate, 'yyyy-MM-dd'),
    },
  });
};
