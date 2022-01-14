import { useQuery, UseQueryOptions, useMutation } from "react-query";
import { INewUser, MutationReponse, PaginatedList, UserType } from "../types";
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

const postNewUser = async (
    data: INewUser
): Promise<MutationReponse<UserType>> => {
    return await api().post("/accountant/user", data);
};

export function useNewUserMutation() {
    return useMutation<MutationReponse<UserType>, any, INewUser>(async (data) =>
        postNewUser(data)
    );
}
