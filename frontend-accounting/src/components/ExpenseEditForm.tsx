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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { format, subDays } from 'date-fns';
import { useQueryClient } from 'react-query';
import CustomDatePicker from './CustomDatePicker';
import { ExpenseReportEditSchema } from '../validations/ExpenseReportFormSchema';
import CustomImageUpload from './CustomImageUpload';
import mapServerSideErrors from '../util/mapServerSideErrors';
import { ExpenseReportType, IEditExpenseReport, ResponseErrorType } from '../types';

const ExpenseEditForm: React.FC<{ closeModal: () => void; report: ExpenseReportType }> = ({
  closeModal,
  report,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [imageIds, setImageIds] = useState<number[] | string[]>([]);

  // const newExpenseReportMutation = useNewExpenseReportMutation();
  const { handleSubmit, register, formState, setValue, setError, watch } = useForm({
    resolver: yupResolver(ExpenseReportEditSchema),
    defaultValues: {
      description: report.description,
      amount: report.amount,
      report_date: new Date(report.reportDate),
    },
  });
  const { isSubmitting, errors } = formState;

  const onSubmit = async (data: IEditExpenseReport) => {
    const payload = {
      ...data,
      image_ids: imageIds,
      report_date: format(new Date(data.report_date), 'yyyy-MM-dd'),
    };

    console.log(payload);

    // try {
    //   await newExpenseReportMutation.mutateAsync(payload).then(() => {
    //     queryClient.refetchQueries(['expenseList'], { active: true });
    //     closeModal();
    //   });
    // } catch (err) {
    //   const { response } = err as ResponseErrorType;
    //   if (response?.data.errors.message) {
    //     toast({
    //       title: 'Something went wrong!',
    //       description: response?.data.errors.message,
    //       status: 'error',
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //   } else {
    //     mapServerSideErrors(response?.data.errors!, setError);
    //   }
    // }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} marginBottom={4}>
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
            onChange={(date) => setValue('report_date', date!)}
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

export default ExpenseEditForm;
