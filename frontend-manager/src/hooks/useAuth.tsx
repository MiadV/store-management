import { useQuery } from "react-query";
import api from "../util/api";

export type ShopType = {
    shopId: number;
    title: string;
    address: string;
    isActive: boolean;
};

export type PermissionsType = ["SALES_REPORT" | "EXPENSE_REPORT"];

export type AuthUserObject = {
    userId: number;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    shops: ShopType[];
    permissions: PermissionsType;
};

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
