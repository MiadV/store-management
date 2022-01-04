export type PermissionsType = ["SALES_REPORT" | "EXPENSE_REPORT"];

type ErrorType = Record<string, [string]>;

export type ResponseErrorType = {
    response: {
        data: {
            errors: ErrorType;
        };
    };
};

export type ShopType = {
    shopId: number;
    title: string;
    address: string;
    isActive: boolean;
};

export type AuthUserObject = {
    userId: number;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    shops: ShopType[];
    permissions: PermissionsType;
};

export type SaleReportType = {
    saleId: number;
    description: string;
    reportDate: string;
    cashAmount: string;
    cardAmount: string;
    onlineTransferAmount: string;
    TotalAmount: string;
    createdAt: string;
    updatedAt: string | null;
    shop?: ShopType;
    user?: {
        userId: number;
        name: string;
        email: string;
    };
};

export type LoginResponse = {
    data: {
        token: string;
    };
};

export interface ILogin {
    email: string;
    password: string;
}

export type NewSaleReportResponse = {
    data: SaleReportType;
};

export interface INewSaleReport {
    shop_id: string | number;
    description: string;
    report_date: string;
    cash_amount: number;
    card_amount: number;
    online_transfer_amount: number;
}
