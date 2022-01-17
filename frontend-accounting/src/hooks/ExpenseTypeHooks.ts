import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import api from '../util/api';
import {
  ExpenseItemType,
  ExpenseRuleType,
  IAssignExpenseItem,
  INewExpenseItem,
  MutationReponse,
} from '../types';

const getExpenseTypeListByStoreId = async (storeId: number): Promise<ExpenseRuleType[]> => {
  const { data } = await api().get(`/expense/types/${storeId}`);
  return data;
};

export function useExpenseTypeListByStoreId({
  storeId,
  options,
}: {
  storeId: number;
  options?: UseQueryOptions<
    unknown,
    unknown,
    ExpenseRuleType[],
    ['expenseTypeListByStoreId', number]
  >;
}) {
  return useQuery(
    ['expenseTypeListByStoreId', storeId],
    () => getExpenseTypeListByStoreId(storeId),
    {
      ...options,
    }
  );
}

const getExpenseTypeItemsList = async (): Promise<ExpenseItemType[]> => {
  const { data } = await api().get(`/accountant/expense/types`);
  return data;
};

export function useExpenseTypeItemsList(
  options?: UseQueryOptions<unknown, unknown, ExpenseItemType[], 'expenseTypeItemsList'>
) {
  return useQuery('expenseTypeItemsList', getExpenseTypeItemsList, {
    ...options,
  });
}

const postExpenseItem = async (
  data: INewExpenseItem
): Promise<MutationReponse<ExpenseItemType>> => {
  return await api().post(`/accountant/expense`, data);
};

export function useExpenseItemMutation() {
  return useMutation<MutationReponse<ExpenseItemType>, any, INewExpenseItem>(async (data) =>
    postExpenseItem(data)
  );
}

const postAssignEpxensetype = async (
  data: IAssignExpenseItem
): Promise<MutationReponse<boolean>> => {
  return await api().post(`/accountant/expense/assign`, data);
};

export function useAssignExpenseMutation() {
  return useMutation<MutationReponse<boolean>, any, IAssignExpenseItem>(async (data) =>
    postAssignEpxensetype(data)
  );
}
