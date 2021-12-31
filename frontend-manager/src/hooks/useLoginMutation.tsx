import { useMutation, useQueryClient } from "react-query";
import api from "../util/api";

type ErrorType = Record<string, [string]>;

export type LoginErrorType = {
    response: {
        data: {
            errors: ErrorType;
        };
    };
};

type LoginResponse = {
    data: {
        token: string;
    };
};

export interface ILogin {
    email: string;
    password: string;
}

const login = async (data: ILogin): Promise<LoginResponse> => {
    return await api().post("/login", data);
};

export default function useLoginMutation() {
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
