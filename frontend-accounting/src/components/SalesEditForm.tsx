import React from 'react';
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
import { IEditSalesReport, ResponseErrorType, SaleReportType } from '../types';
import { useUpdateSalesMutation } from '../hooks/SaleHooks';
import { SalesReportEditSchema } from '../validations/SalesReportFormSchema';

const SalesEditForm: React.FC<{ closeModal: () => void; report: SaleReportType }> = ({
  closeModal,
  report,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const updateSalesReportMutation = useUpdateSalesMutation();
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(SalesReportEditSchema),
    defaultValues: {
      description: report.description ?? '',
      cash_amount: report.cashAmount,
      card_amount: report.cardAmount,
      online_transfer_amount: report.onlineTransferAmount,
    },
  });
  const { isSubmitting, errors } = formState;

  const onSubmit = async (data: IEditSalesReport) => {
    const payload = {
      ...data,
      reportId: report.saleId,
    };

    try {
      await updateSalesReportMutation.mutateAsync(payload).then(() => {
        queryClient.refetchQueries(['salesList'], { active: true });
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
        <FormControl id="cash_amount" isRequired isInvalid={!!errors.cash_amount}>
          <FormLabel htmlFor="cash_amount">Cash Amount</FormLabel>
          <NumberInput precision={2}>
            <NumberInputField placeholder="Sale in Cash" {...register('cash_amount')} />
          </NumberInput>

          {errors.cash_amount && <FormErrorMessage>{errors.cash_amount.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="card_amount" isRequired isInvalid={!!errors.card_amount}>
          <FormLabel htmlFor="card_amount">Card Amount</FormLabel>
          <NumberInput precision={2}>
            <NumberInputField placeholder="Credit Card" {...register('card_amount')} />
          </NumberInput>

          {errors.card_amount && <FormErrorMessage>{errors.card_amount.message}</FormErrorMessage>}
        </FormControl>

        <FormControl
          id="online_transfer_amount"
          isRequired
          isInvalid={!!errors.online_transfer_amount}
        >
          <FormLabel htmlFor="online_transfer_amount">Online Transfer</FormLabel>
          <NumberInput precision={2}>
            <NumberInputField
              placeholder="Online Transfer"
              {...register('online_transfer_amount')}
            />
          </NumberInput>

          {errors.online_transfer_amount && (
            <FormErrorMessage>{errors.online_transfer_amount.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="description" isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <InputGroup>
            <Textarea placeholder="Description" {...register('description')} />
          </InputGroup>

          {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
        </FormControl>

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

export default SalesEditForm;
