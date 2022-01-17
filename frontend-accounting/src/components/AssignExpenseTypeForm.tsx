import React from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Skeleton,
  Stack,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { IAssignExpenseItem, ResponseErrorType } from '../types';
import { useAssignExpenseMutation, useExpenseTypeItemsList } from '../hooks/ExpenseTypeHooks';

const AssignExpenseTypeForm: React.FC<{ closeModal: () => void; shopId: number }> = ({
  closeModal,
  shopId,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data, isLoading } = useExpenseTypeItemsList({
    staleTime: Infinity,
  });
  const assignExpenseMutation = useAssignExpenseMutation();
  const { handleSubmit, register, formState, watch } = useForm<IAssignExpenseItem>({
    defaultValues: {
      shop_id: shopId,
    },
  });

  const limit_amount = watch('limit_amount');

  const { isSubmitting, errors } = formState;

  const onSubmit = async (data: IAssignExpenseItem) => {
    try {
      await assignExpenseMutation.mutateAsync(data).then(() => {
        queryClient.refetchQueries(['expenseTypeListByStoreId'], { active: true });
        closeModal();
      });
    } catch (err) {
      const { response } = err as ResponseErrorType;
      if (response?.data.errors.message) {
        toast({
          title: 'Authentication Error',
          description: response?.data.errors.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} marginBottom={4}>
        <FormControl id="expense_type_id" isRequired isInvalid={!!errors.expense_type_id}>
          <Skeleton isLoaded={!isLoading}>
            <Select placeholder="Expense Type" {...register('expense_type_id')}>
              {data?.map((i) => (
                <option value={i.expenseTypeId} key={i.expenseTypeId}>
                  {i.title}
                </option>
              ))}
            </Select>
          </Skeleton>
          {errors.expense_type_id && (
            <FormErrorMessage>{errors.expense_type_id.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="limit_amount" isInvalid={!!errors.limit_amount}>
          <NumberInput precision={2}>
            <NumberInputField
              placeholder="Limit Amount"
              {...register('limit_amount', {
                min: {
                  value: 10.0,
                  message: 'minimum 10',
                },
              })}
            />
          </NumberInput>

          {errors.limit_amount && (
            <FormErrorMessage>{errors.limit_amount.message}</FormErrorMessage>
          )}
        </FormControl>

        {limit_amount && (
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="strict_limit">Capped limit ?</FormLabel>

            <Switch {...register('strict_limit')} />
          </FormControl>
        )}
      </Stack>

      <Stack>
        <Button
          isLoading={isSubmitting}
          variant="solid"
          type="submit"
          loadingText="Please wait..."
          colorScheme="teal"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};
export default AssignExpenseTypeForm;
