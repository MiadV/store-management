import { useMutation, useQueryClient } from "react-query";
import api from "../util/api";

const logout = async (): Promise<void> => {
    return await api().post("/logout", null);
};

export default function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation<void, any, null>(async () => logout(), {
        onError: (err) => {
            console.error("Logout Error", err);
        },
        onSuccess: async () => {
            localStorage.removeItem(
                `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-token`
            );
            queryClient.clear();
        },
    });
}
