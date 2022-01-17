import React from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { INewExpenseItem, ResponseErrorType } from '../types';
import mapServerSideErrors from '../util/mapServerSideErrors';
import { useExpenseItemMutation } from '../hooks/ExpenseTypeHooks';

const ExpenseTypeForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const newExpenseItemMutation = useExpenseItemMutation();
  const { handleSubmit, register, setError, formState } = useForm();
  const { isSubmitting, errors } = formState;

  const onSubmit = async (data: INewExpenseItem) => {
    try {
      await newExpenseItemMutation.mutateAsync(data).then(() => {
        queryClient.refetchQueries(['expenseTypeItemsList'], { active: true });
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
      } else {
        mapServerSideErrors(response?.data.errors!, setError);
      }
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} marginBottom={4}>
        <FormControl id="title" isRequired isInvalid={!!errors.title}>
          <InputGroup>
            <Input variant="filled" type="text" placeholder="Title" {...register('title')} />
          </InputGroup>
          {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="accountant_only">Accountant Only ?</FormLabel>

          <Switch {...register('accountant_only')} />
        </FormControl>
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
export default ExpenseTypeForm;
