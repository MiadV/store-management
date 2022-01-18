import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Stack,
  Button,
  InputGroup,
  FormErrorMessage,
  Textarea,
  useToast,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { format, subDays } from 'date-fns';
import { useQueryClient } from 'react-query';
import CustomDatePicker from './CustomDatePicker';
import { ExpenseReportFormSchema } from '../validations/ExpenseReportFormSchema';
import CustomExpenseTypeSelect from './CustomExpenseTypeSelect';
import ExpenseTypeBalanceProgress from './ExpenseTypeBalanceProgress';
import CustomImageUpload from './CustomImageUpload';
import useNewExpenseReportMutation from '../hooks/useNewExpenseReportMutation';
import mapServerSideErrors from '../util/mapServerSideErrors';
import { INewExpenseReport, ResponseErrorType } from '../types';
import CustomSelectShop from './CustomSelectShop';

const ExpenseForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [imageIds, setImageIds] = useState<number[] | string[]>([]);

  const newExpenseReportMutation = useNewExpenseReportMutation();
  const { handleSubmit, register, formState, setValue, setError, watch } = useForm({
    resolver: yupResolver(ExpenseReportFormSchema),
  });
  const { isSubmitting, errors } = formState;
  const shopId = watch('shop_id');

  // fix expense balance not hidding when shop changes.
  useEffect(() => {
    setValue('expense_type_shop_id', null);
  }, [shopId, setValue]);

  const onSubmit = async (data: INewExpenseReport) => {
    const payload = {
      ...data,
      image_ids: imageIds,
      report_date: format(new Date(data.report_date), 'yyyy-MM-dd'),
    };

    try {
      await newExpenseReportMutation.mutateAsync(payload).then(() => {
        queryClient.refetchQueries(['expenseList'], { active: true });
        closeModal();
      });
    } catch (err) {
      const { response } = err as ResponseErrorType;
      if (response?.data.errors.message) {
        toast({
          title: 'Something went wrong!',
          description: response?.data.errors.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        mapServerSideErrors(response?.data.errors!, setError);
      }
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} marginBottom={4}>
        <FormControl id="shop_id" isInvalid={!!errors.shop_id}>
          <CustomSelectShop {...register('shop_id')} />
          {errors.shop_id && <FormErrorMessage>{errors.shop_id.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="expense_type_shop_id" isInvalid={!!errors.expense_type_shop_id}>
          {watch('shop_id') ? (
            <CustomExpenseTypeSelect
              storeId={watch('shop_id')}
              placeholder="Select Type"
              {...register('expense_type_shop_id')}
            />
          ) : null}
        </FormControl>

        {watch('expense_type_shop_id') && watch('shop_id') ? (
          <ExpenseTypeBalanceProgress expenseRuleId={watch('expense_type_shop_id')} />
        ) : null}

        <FormControl
          id="report_date"
          isRequired
          isInvalid={!!errors.report_date}
          placeholder="Report date"
        >
          <CustomDatePicker
            isClearable
            placeholderText="Expense Date"
            minDate={subDays(new Date(), 1)}
            maxDate={new Date()}
            selected={watch('report_date')}
            onChange={(date) => setValue('report_date', date)}
          />

          {errors.report_date && <FormErrorMessage>{errors.report_date.message}</FormErrorMessage>}
        </FormControl>
        <FormControl id="amount" isRequired isInvalid={!!errors.amount}>
          <NumberInput precision={2}>
            <NumberInputField placeholder="Amount" {...register('amount')} />
          </NumberInput>

          {errors.amount && <FormErrorMessage>{errors.amount.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="description" isInvalid={!!errors.description}>
          <InputGroup>
            <Textarea placeholder="Description" {...register('description')} />
          </InputGroup>

          {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
        </FormControl>

        <CustomImageUpload setImageIds={setImageIds} />

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

export default ExpenseForm;
