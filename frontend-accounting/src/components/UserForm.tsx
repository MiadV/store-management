import React from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { INewUser, ResponseErrorType } from '../types';
import mapServerSideErrors from '../util/mapServerSideErrors';
import UserFormSchema from '../validations/UserFormValidtaion';
import { useNewUserMutation } from '../hooks/UsersHooks';
import CustomMultiSelectShops from './CustomMultiSelectShops';
import CustomPermissionsCheckbox from './CustomPermissionsCheckbox';

const UserForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const newUserMutation = useNewUserMutation();
  const { handleSubmit, register, setError, formState, control } = useForm({
    resolver: yupResolver(UserFormSchema),
  });
  const { isSubmitting, errors } = formState;

  const onSubmit = async (data: INewUser) => {
    try {
      await newUserMutation.mutateAsync(data).then(() => {
        queryClient.refetchQueries(['usersList'], { active: true });
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
        <FormControl id="name" isRequired isInvalid={!!errors.name}>
          <InputGroup>
            <Input variant="filled" type="text" placeholder="Full Name" {...register('name')} />
          </InputGroup>
          {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="email" isRequired isInvalid={!!errors.email}>
          <InputGroup>
            <Input variant="filled" type="email" placeholder="Email" {...register('email')} />
          </InputGroup>
          {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="phone" isInvalid={!!errors.phone}>
          <InputGroup>
            <Input variant="filled" type="text" placeholder="Phone" {...register('phone')} />
          </InputGroup>
          {errors.phone && <FormErrorMessage>{errors.phone.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="permissions" isInvalid={!!errors.permissions}>
          <CustomPermissionsCheckbox name="permissions" control={control} />

          {errors.permissions && <FormErrorMessage>{errors.permissions.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="shops" isRequired isInvalid={!!errors.shops}>
          <CustomMultiSelectShops name="shops" control={control} />

          {errors.shops && <FormErrorMessage>{errors.shops.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="password" isRequired isInvalid={!!errors.password}>
          <InputGroup>
            <Input
              variant="filled"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
          </InputGroup>
          {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
        </FormControl>

        <FormControl
          id="password_confirmation"
          isRequired
          isInvalid={!!errors.password_confirmation}
        >
          <InputGroup>
            <Input
              variant="filled"
              type="password"
              placeholder="Confirm Password"
              {...register('password_confirmation')}
            />
          </InputGroup>
          {errors.password_confirmation && (
            <FormErrorMessage>{errors.password_confirmation.message}</FormErrorMessage>
          )}
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
export default UserForm;
