import { format } from 'date-fns';
import { UseQueryOptions, useQuery, useMutation } from 'react-query';
import {
  IEditSalesReport,
  INewSaleReport,
  MutationReponse,
  PaginatedList,
  SaleReportType,
} from '../types';
import api from '../util/api';

const getSaleList = async ({
  pageIndex,
  shopId,
  startDate,
  endDate,
}: {
  pageIndex: number;
  shopId?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
}): Promise<PaginatedList<SaleReportType>> => {
  const { data } = await api().get(`/accountant/sales`, {
    params: {
      page: pageIndex,
      shop_id: shopId,
      date_from: startDate && format(startDate, 'yyyy-MM-dd'),
      date_to: endDate && format(endDate, 'yyyy-MM-dd'),
    },
  });
  return data;
};

export function useSaleList({
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
    PaginatedList<SaleReportType>,
    [
      'salesList',
      number,
      number | null | undefined,
      Date | null | undefined,
      Date | null | undefined
    ]
  >;
}) {
  return useQuery(
    ['salesList', pageIndex, shopId, startDate, endDate],
    () => getSaleList({ pageIndex, shopId, startDate, endDate }),
    { ...options }
  );
}

const postNewSaleReport = async (
  data: INewSaleReport
): Promise<MutationReponse<SaleReportType>> => {
  return await api().post('/sale', data);
};

export function useNewSaleReportMutation() {
  return useMutation<MutationReponse<SaleReportType>, any, INewSaleReport>(async (data) =>
    postNewSaleReport(data)
  );
}

const updateSales = async (data: IEditSalesReport): Promise<MutationReponse<SaleReportType>> => {
  return await api().put(`/accountant/sales/${data.reportId}`, data);
};

export function useUpdateSalesMutation() {
  return useMutation<MutationReponse<SaleReportType>, any, IEditSalesReport>(async (data) =>
    updateSales(data)
  );
}

export const downloadSales = async ({
  shopId,
  startDate,
  endDate,
}: {
  shopId?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
}): Promise<any> => {
  return await api().get(`/accountant/sales/export`, {
    responseType: 'blob',
    params: {
      shop_id: shopId,
      date_from: startDate && format(startDate, 'yyyy-MM-dd'),
      date_to: endDate && format(endDate, 'yyyy-MM-dd'),
    },
  });
};
