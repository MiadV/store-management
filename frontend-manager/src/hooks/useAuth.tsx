import { useQuery } from "react-query";
import api from "../util/api";

export type AuthUserObject = {
    userId?: number;
    name?: string;
    email?: string;
    voucher?: string;
    hasVerifiedEmail?: boolean;
    phone?: string;
    state?: {
        id: number;
        country: string;
        countryCode: string;
        state: string;
        stateCode: string;
    };
    icType?: string;
    icNumber?: string;
    bank?: {
        id: number;
        title: string;
    };
    bankAccountNo?: string;
    bankAccountName?: string;
    contract?: {
        contractId: number;
        startDate: string;
        endDate: string;
        isExpired: boolean;
    };
};

const getMe = async (): Promise<AuthUserObject> => {
    const { data } = await api().get("/me");
    return data;
};

export default function useAuth() {
    return useQuery("auth", getMe, {
        enabled: false,
        staleTime: Infinity,
    });
}
