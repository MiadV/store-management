import React, { forwardRef } from "react";
import { InputGroup, SelectProps, Select, Skeleton } from "@chakra-ui/react";
import useExpenseTypeListByStoreId from "../hooks/useExpenseTypeListByStoreId";
import { ExpenseTypeType } from "../types";

const CustomExpenseTypeSelect: React.ForwardRefRenderFunction<
    any,
    SelectProps & {
        storeId: number;
        selectedItem: (expenseType: ExpenseTypeType | null) => void;
    }
> = ({ storeId, selectedItem, ...otherProps }, ref: any) => {
    const { data, isLoading } = useExpenseTypeListByStoreId(storeId);

    return (
        <Skeleton isLoaded={!isLoading}>
            <InputGroup>
                <Select
                    variant="outline"
                    onChange={(e) => {
                        const selected = data!.find(
                            (element) =>
                                element.expenseTypeShopId ===
                                parseInt(e.target.value)
                        );

                        selectedItem(selected ? selected : null);
                    }}
                    {...otherProps}
                    ref={ref}
                >
                    {data?.map((item) => {
                        if (!item.accountantOnly) {
                            return (
                                <option
                                    value={item.expenseTypeShopId}
                                    key={item.expenseTypeShopId}
                                >
                                    {item.title}
                                </option>
                            );
                        }
                        return null;
                    })}
                </Select>
            </InputGroup>
        </Skeleton>
    );
};

export default forwardRef(CustomExpenseTypeSelect);
