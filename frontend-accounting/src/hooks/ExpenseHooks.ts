import { UseQueryOptions, useQuery } from 'react-query';
import api from '../util/api';
import { ExpenseReportType, PaginatedList } from '../types';
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

export default function useExpenseList({
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
