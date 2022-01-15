import { useQuery, UseQueryOptions, useMutation } from 'react-query';
import { IEditUser, INewUser, MutationReponse, PaginatedList, UserType } from '../types';
import api from '../util/api';

const getUsersList = async (pageIndex: number): Promise<PaginatedList<UserType>> => {
  const { data } = await api().get(`/accountant/user?page=${pageIndex}`);
  return data;
};

export function useUsersList({
  pageIndex,
  options,
}: {
  pageIndex: number;
  options?: UseQueryOptions<unknown, unknown, PaginatedList<UserType>, ['usersList', number]>;
}) {
  return useQuery(['usersList', pageIndex], () => getUsersList(pageIndex), {
    ...options,
  });
}

const postNewUser = async (data: INewUser): Promise<MutationReponse<UserType>> => {
  let shopIds = data.shops.map((i) => i.shopId);
  let payload = { ...data, shops: shopIds };

  return await api().post('/accountant/user', payload);
};

export function useNewUserMutation() {
  return useMutation<MutationReponse<UserType>, any, INewUser>(async (data) => postNewUser(data));
}

const updateUser = async (data: IEditUser): Promise<MutationReponse<UserType>> => {
  let shopIds = data.shops.map((i) => i.shopId);
  let payload = { ...data, shops: shopIds };

  return await api().put(`/accountant/user/${payload.userId}`, payload);
};

export function useUpdateUserMutation() {
  return useMutation<MutationReponse<UserType>, any, IEditUser>(async (data) => updateUser(data));
}
