import { useQuery, UseQueryOptions } from 'react-query';
import api from '../util/api';
import { ShopType } from '../types';

const getShopsList = async (): Promise<ShopType[]> => {
  const { data } = await api().get(`/accountant/shops`);
  return data;
};

export function useShopsList(options?: UseQueryOptions<unknown, unknown, ShopType[], 'shopsList'>) {
  return useQuery('shopsList', getShopsList, {
    ...options,
  });
}
