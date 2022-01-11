import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthUserObject, ILogin, LoginResponse } from "../types";
import api from "../util/api";

const getAuthUser = async (): Promise<AuthUserObject> => {
    const { data } = await api().get("/me");
    return data;
};

export default function useAuth() {
    return useQuery("auth", getAuthUser, {
        enabled: false,
        staleTime: Infinity,
        onError: () => {
            // remove token if exists
            localStorage.removeItem(
                `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-token`
            );
        },
    });
}

const login = async (data: ILogin): Promise<LoginResponse> => {
    return await api().post("/accountant/login", data);
};

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation<LoginResponse, any, ILogin>(
        async (data) => login(data),
        {
            onError: () => {
                queryClient.resetQueries();
            },
            onSuccess: async (res) => {
                localStorage.setItem(
                    `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-token`,
                    res.data.token
                );

                queryClient.refetchQueries("auth", { exact: true });
            },
        }
    );
}

const logout = async (): Promise<void> => {
    return await api().post("/logout", null);
};

export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation<void, any, null>(async () => logout(), {
        onError: (err) => {
            console.error("Logout Error", err);
        },
        onSuccess: async () => {
            localStorage.removeItem(
                `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-token`
            );
            queryClient.resetQueries();
        },
    });
}
