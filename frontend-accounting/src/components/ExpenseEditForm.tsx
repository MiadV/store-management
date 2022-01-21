import React, { useState } from 'react';
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
  FormLabel,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from 'react-query';
import { ExpenseReportEditSchema } from '../validations/ExpenseReportFormSchema';
import CustomImageUpload from './CustomImageUpload';
import { ExpenseReportType, IEditExpenseReport, ResponseErrorType } from '../types';
import { useUpdateExpenseMutation } from '../hooks/ExpenseHooks';

const ExpenseEditForm: React.FC<{ closeModal: () => void; report: ExpenseReportType }> = ({
  closeModal,
  report,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [imageIds, setImageIds] = useState<number[] | string[]>([]);

  const updateExpenseReportMutation = useUpdateExpenseMutation();
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(ExpenseReportEditSchema),
    defaultValues: {
      description: report.description ?? '',
      amount: report.amount,
    },
  });
  const { isSubmitting, errors } = formState;

  const onSubmit = async (data: IEditExpenseReport) => {
    const payload = {
      ...data,
      reportId: report.expenseId,
      image_ids: imageIds,
    };

    try {
      await updateExpenseReportMutation.mutateAsync(payload).then(() => {
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
      }
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} marginBottom={4}>
        <FormControl id="amount" isRequired isInvalid={!!errors.amount}>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <NumberInput precision={2}>
            <NumberInputField placeholder="Amount" {...register('amount')} />
          </NumberInput>

          {errors.amount && <FormErrorMessage>{errors.amount.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="description" isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <InputGroup>
            <Textarea placeholder="Description" {...register('description')} />
          </InputGroup>

          {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
        </FormControl>

        <CustomImageUpload setImageIds={setImageIds} initialImages={report.images} />

        <Button
          isLoading={isSubmitting}
          variant="solid"
          type="submit"
          loadingText="Please wait..."
          colorScheme="teal"
        >
          Update
        </Button>
      </Stack>
    </form>
  );
};

export default ExpenseEditForm;
