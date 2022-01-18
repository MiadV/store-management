import React, { forwardRef } from 'react';
import { Select, SelectProps, Skeleton } from '@chakra-ui/react';
import { useShopsList } from '../hooks/ShopHooks';

const CustomSelectShop: React.ForwardRefRenderFunction<any, SelectProps> = (props, ref) => {
  const { data: shops, isLoading: shopsIsLoading } = useShopsList({
    staleTime: Infinity,
  });

  return (
    <Skeleton isLoaded={!shopsIsLoading}>
      <Select placeholder="Select Shop" {...props} ref={ref}>
        {shops?.map((i) => (
          <option value={i.shopId} key={i.shopId}>
            {i.title}
          </option>
        ))}
      </Select>
    </Skeleton>
  );
};

export default forwardRef(CustomSelectShop);
