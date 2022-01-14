import React, { useState, useEffect } from 'react';
import { Select } from 'chakra-react-select';
import { Skeleton } from '@chakra-ui/react';
import { usePermissionsList } from '../hooks/PermissionHooks';
import { PermissionType } from '../types';

interface OptionType {
  label: string;
  value: PermissionType;
}

const CustomMultiSelectPermissions: React.FC<{
  onChange: (val: PermissionType[]) => void;
  defaultValue?: PermissionType[];
}> = ({ onChange, defaultValue }) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selected, setSelected] = useState<PermissionType[]>([]);
  const { data, isLoading } = usePermissionsList({
    staleTime: Infinity,
  });

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue, setSelected]);

  useEffect(() => {
    if (data) {
      let options = [];
      options = data.map((i) => {
        return { label: i.name, value: i };
      });

      setOptions(options);
    }
  }, [data, setOptions]);

  useEffect(() => {
    onChange(selected);
  }, [selected, onchange]);

  return (
    <Skeleton isLoaded={!isLoading}>
      <Select<OptionType, true, any>
        isMulti
        name="permissions"
        options={options}
        placeholder="Permissions"
        closeMenuOnSelect={false}
        selectedOptionStyle="check"
        colorScheme="orange"
        onChange={(op) => {
          let list = op.map((item) => item.value);
          setSelected(list);
        }}
        value={selected.map((i) => {
          return { label: i.name, value: i };
        })}
        filterOption={(i) => {
          let filter = selected.map((o) => o.name);
          return !filter.includes(i.label);
        }}
      />
    </Skeleton>
  );
};

export default CustomMultiSelectPermissions;
