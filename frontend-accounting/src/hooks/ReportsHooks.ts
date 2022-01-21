import { useQuery, UseQueryOptions } from 'react-query';
import api from '../util/api';
import { ReportSummaryType } from '../types';

const getReportSummaryByDate = async (storeId: number, date: Date): Promise<ReportSummaryType> => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const { data } = await api().get(`/history/${storeId}/${year}/${month}/${day}`);
  return data;
};

export function useReportSummaryByDate(
  storeId: number,
  date: Date,
  options?: UseQueryOptions<
    unknown,
    unknown,
    ReportSummaryType,
    ['reportSummaryByDate', number, Date]
  >
) {
  return useQuery(
    ['reportSummaryByDate', storeId, date],
    () => getReportSummaryByDate(storeId, date),
    {
      ...options,
    }
  );
}
