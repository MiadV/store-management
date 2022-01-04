import { useQuery } from "react-query";
import { AuthUserObject } from "../types";
import api from "../util/api";

const getAuthUser = async (): Promise<AuthUserObject> => {
    const { data } = await api().get("/me");
    return data;
};

export default function useAuth() {
    return useQuery("auth", getAuthUser, {
        enabled: false,
        staleTime: Infinity,
    });
}
