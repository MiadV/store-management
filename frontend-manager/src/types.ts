export type PermissionType = {
    name: string;
    id: number;
};
type ErrorType = Record<string, [string]>;

export type uploadedImageType = {
    dataUrl: string;
    imageId: number;
};

export type ResponseErrorType = {
    response: {
        data: {
            errors: ErrorType;
        };
    };
};

export type MutationReponse<T> = {
    data: T;
};

export type PaginatedList<T> = {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        path: string;
        per_page: number;
        to: number;
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
    permissions: PermissionType[];
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

export type ExpenseRuleType = {
    expenseTypeId: number;
    title: string;
    accountantOnly: boolean;
    expenseTypeShopId: number;
    limitAmount: string | null;
    isLimitStrict: boolean;
};

export type ImageType = {
    imageId: number;
    uploader: number;
    expenseId: number;
    imagePath: string;
    thumbnail: string;
    fullPath: string;
};

export type ExpenseReportType = {
    expenseId: number;
    description: string;
    reportDate: string;
    amount: string;
    images: ImageType[];
    createdAt: string;
    updatedAt: string | null;
    expenseType: {
        expenseTypeId: number;
        title: string;
        accountantOnly: boolean;
    };
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

export interface INewSaleReport {
    shop_id: string | number;
    description: string;
    report_date: string;
    cash_amount: number;
    card_amount: number;
    online_transfer_amount: number;
}

export interface INewExpenseReport {
    shop_id: string | number;
    expense_type_shop_id: string | number;
    description: string;
    report_date: string;
    amount: number;
    image_ids: string[] | number[];
}

export type ExpenseBalanceType = {
    limit: string | null;
    currentTotal: string;
    balance: string;
    isStrict: boolean;
};

export type ImageUploadResponse = {
    data: {
        id: string | number;
        name: string;
    };
};

export type ReportSummaryType = {
    saleReport: SaleReportType;
    expenseReports: ExpenseReportType[];
    sumOfExpenses: number | string;
    balance: number | string;
};
