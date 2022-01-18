import { useMutation } from 'react-query';
import { INewExpenseReport, NewExpenseReportResponse } from '../types';
import api from '../util/api';

const postNewExpenseReport = async (data: INewExpenseReport): Promise<NewExpenseReportResponse> => {
  return await api().post('/expense', data);
};

export default function useNewExpenseReportMutation() {
  return useMutation<NewExpenseReportResponse, any, INewExpenseReport>(async (data) =>
    postNewExpenseReport(data)
  );
}
