import React, { forwardRef } from 'react';
import { SelectProps, Select, Skeleton } from '@chakra-ui/react';
import useExpenseTypeListByStoreId from '../hooks/useExpenseTypeListByStoreId';

const CustomExpenseTypeSelect: React.ForwardRefRenderFunction<
  any,
  SelectProps & {
    storeId: number;
  }
> = ({ storeId, ...otherProps }, ref: any) => {
  const { data, isLoading } = useExpenseTypeListByStoreId(storeId);

  return (
    <Skeleton isLoaded={!isLoading}>
      <Select {...otherProps} ref={ref}>
        {data?.map((item) => {
          return (
            <option value={item.expenseTypeShopId} key={item.expenseTypeShopId}>
              {item.title}
            </option>
          );
        })}
      </Select>
    </Skeleton>
  );
};

export default forwardRef(CustomExpenseTypeSelect);
