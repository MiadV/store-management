import React from 'react';
import { Select } from 'chakra-react-select';
import { Skeleton } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { ShopType } from '../types';
import { useShopsList } from '../hooks/ShopHooks';

const CustomMultiSelectShops: React.FC<{
  name: string;
  control: any;
}> = ({ name, control }) => {
  const { data, isLoading } = useShopsList({
    staleTime: Infinity,
  });

  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <Skeleton isLoaded={!isLoading}>
      <Select
        isMulti
        getOptionLabel={(i) => i.title}
        getOptionValue={(i) => i}
        options={data}
        filterOption={(i) => {
          let filter = field.value ? field.value.map((o: ShopType) => o.title) : [];
          return !filter.includes(i.label);
        }}
        placeholder="Shops"
        closeMenuOnSelect={false}
        selectedOptionStyle="check"
        colorScheme="purple"
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        ref={field.ref}
      />
    </Skeleton>
  );
};

export default CustomMultiSelectShops;
