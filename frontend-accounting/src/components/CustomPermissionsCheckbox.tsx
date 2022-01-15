import React, { useState, useEffect } from 'react';
import { Checkbox, Skeleton, Stack } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { usePermissionsList } from '../hooks/PermissionHooks';

const CustomPermissionsCheckbox: React.FC<{
  name: string;
  control: any;
}> = ({ name, control }) => {
  const { data, isLoading } = usePermissionsList({
    staleTime: Infinity,
  });

  const [checkedList, setCheckedList] = useState<number[]>([]);

  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });

  useEffect(() => {
    if (field.value) {
      setCheckedList(field.value);
    }
  }, [setCheckedList, field.value]);

  function handleChange(id: string) {
    let index = parseInt(id);

    let newList = checkedList.includes(index)
      ? checkedList.filter((i) => i !== index)
      : [...checkedList, index];

    setCheckedList(newList);
    field.onChange(newList);
  }

  return (
    <Skeleton isLoaded={!isLoading}>
      <Stack spacing={2} direction="column">
        {data?.map((i) => (
          <Checkbox
            value={i.id}
            key={i.id}
            isChecked={checkedList.includes(i.id)}
            onChange={(e) => handleChange(e.target.value)}
          >
            {i.name}
          </Checkbox>
        ))}
      </Stack>
    </Skeleton>
  );
};

export default CustomPermissionsCheckbox;
