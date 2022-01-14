import { useQuery, UseQueryOptions } from 'react-query';
import api from '../util/api';
import { PermissionType } from '../types';

const getPermissionsList = async (): Promise<PermissionType[]> => {
  const { data } = await api().get(`/accountant/permissions`);
  return data;
};

export function usePermissionsList(
  options?: UseQueryOptions<unknown, unknown, PermissionType[], 'permissionsList'>
) {
  return useQuery('permissionsList', getPermissionsList, {
    ...options,
  });
}
