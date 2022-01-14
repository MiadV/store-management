import React, { useState, useEffect } from 'react';
import { Select } from 'chakra-react-select';
import { Skeleton } from '@chakra-ui/react';
import { ShopType } from '../types';
import { useShopsList } from '../hooks/ShopHooks';

interface OptionType {
  label: string;
  value: ShopType;
}

const CustomMultiSelectShops: React.FC<{
  onChange: (val: ShopType[]) => void;
}> = ({ onChange }) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const { data, isLoading } = useShopsList({
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      let options = [];
      options = data.map((i) => {
        return { label: i.title, value: i };
      });

      setOptions(options);
    }
  }, [data, setOptions]);

  return (
    <Skeleton isLoaded={!isLoading}>
      <Select<OptionType, true, any>
        isMulti
        name="shops"
        options={options}
        placeholder="Shops"
        closeMenuOnSelect={false}
        selectedOptionStyle="check"
        colorScheme="purple"
        onChange={(op) => {
          let list = op.map((item) => item.value);
          onChange(list);
        }}
      />
    </Skeleton>
  );
};

export default CustomMultiSelectShops;
