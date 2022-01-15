import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Switch,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IEditUser, ResponseErrorType, UserType } from '../types';
import mapServerSideErrors from '../util/mapServerSideErrors';
import { useUpdateUserMutation } from '../hooks/UsersHooks';
import CustomMultiSelectShops from './CustomMultiSelectShops';
import { useQueryClient } from 'react-query';
import UserEditFormSchema from '../validations/UserEditFormValidation';
import CustomPermissionsCheckbox from './CustomPermissionsCheckbox';

const UserEditForm: React.FC<{ closeModal: () => void; user: UserType }> = ({
  user,
  closeModal,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const userUpdateMutation = useUpdateUserMutation();
  const { handleSubmit, register, setError, formState, control } = useForm({
    resolver: yupResolver(UserEditFormSchema),
    defaultValues: {
      ...user,
      permissions: user.permissions.map((i) => i.id),
      new_password: '',
      new_password_confirmation: '',
    },
  });
  const { isSubmitting, errors } = formState;

  const onSubmit = async (data: IEditUser) => {
    try {
      await userUpdateMutation.mutateAsync(data).then(() => {
        queryClient.refetchQueries(['usersList'], { active: true });
        toast({
          title: 'Successful',
          description: 'User info updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
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
        // @ts-ignore
        mapServerSideErrors(response?.data.errors!, setError);
      }
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} marginBottom={4}>
        <FormControl id="name" isRequired isInvalid={!!errors.name} isDisabled>
          <InputGroup>
            <Input variant="filled" type="text" placeholder="Full Name" {...register('name')} />
          </InputGroup>
          {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="email" isRequired isInvalid={!!errors.email} isDisabled>
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

          {errors.permissions && <FormErrorMessage>{errors.permissions}</FormErrorMessage>}
        </FormControl>

        <FormControl id="shops" isInvalid={!!errors.shops}>
          <CustomMultiSelectShops name="shops" control={control} />

          {errors.shops && <FormErrorMessage>{errors.shops}</FormErrorMessage>}
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="isActive" mb="0">
            Is Active ?
          </FormLabel>

          <Switch {...register('isActive')} />
        </FormControl>

        <Box>
          <Text fontWeight="semibold">Change password</Text>
        </Box>

        <FormControl id="new_password" isInvalid={!!errors.new_password}>
          <InputGroup>
            <Input
              variant="filled"
              type="password"
              placeholder="Password"
              {...register('new_password')}
            />
          </InputGroup>
          {errors.new_password && (
            <FormErrorMessage>{errors.new_password.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="new_password_confirmation" isInvalid={!!errors.new_password_confirmation}>
          <InputGroup>
            <Input
              variant="filled"
              type="password"
              placeholder="Confirm Password"
              {...register('new_password_confirmation')}
            />
          </InputGroup>
          {errors.new_password_confirmation && (
            <FormErrorMessage>{errors.new_password_confirmation.message}</FormErrorMessage>
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
export default UserEditForm;
