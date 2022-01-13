import { useQuery, UseQueryOptions } from "react-query";
import { PaginatedList, UserType } from "../types";
import api from "../util/api";

const getUsersList = async (
    pageIndex: number
): Promise<PaginatedList<UserType>> => {
    const { data } = await api().get(`/accountant/user?page=${pageIndex}`);
    return data;
};

export function useUsersList({
    pageIndex,
    options,
}: {
    pageIndex: number;
    options?: UseQueryOptions<
        unknown,
        unknown,
        PaginatedList<UserType>,
        ["usersList", number]
    >;
}) {
    return useQuery(["usersList", pageIndex], () => getUsersList(pageIndex), {
        ...options,
    });
}
