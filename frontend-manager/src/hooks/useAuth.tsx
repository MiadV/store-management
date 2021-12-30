import { useQuery } from "react-query";
import api from "../util/api";

export type AuthUserObject = {
    userId?: number;
    name?: string;
    email?: string;
};

const getAuthUser = async (): Promise<AuthUserObject> => {
    console.log("tried get auth user");

    await api().get(
        `${process.env.REACT_APP_API_BASE_URL}/sanctum/csrf-cookie`
    );
    const { data } = await api().get("/me");
    return data;
};

export default function useAuth() {
    return useQuery("auth", getAuthUser, {
        enabled: false,
        staleTime: Infinity,
    });
}
