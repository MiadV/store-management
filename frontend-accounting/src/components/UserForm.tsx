import React, { useState } from 'react';
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
import { INewUser, PermissionType, ResponseErrorType, ShopType } from '../types';
import mapServerSideErrors from '../util/mapServerSideErrors';
import UserFormSchema from '../validations/UserFormValidtaion';
import { useNewUserMutation } from '../hooks/UsersHooks';
import CustomMultiSelectPermissions from './CustomMultiSelectPermissions';
import CustomMultiSelectShops from './CustomMultiSelectShops';

const UserForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [shops, setShops] = useState<ShopType[]>([]);
  const toast = useToast();
  const newUserMutation = useNewUserMutation();
  const { handleSubmit, register, setError, formState } = useForm({
    resolver: yupResolver(UserFormSchema),
  });
  const { isSubmitting, errors } = formState;

  const onSubmit = async (data: INewUser) => {
    let shopIds = shops.map((i) => i.shopId);
    let permIds = permissions.map((i) => i.id);
    let payload = { ...data, shops: shopIds, permissions: permIds };

    try {
      await newUserMutation.mutateAsync(payload).then(() => {
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

        <FormControl id="permissions" isRequired isInvalid={!!errors.permissions}>
          <CustomMultiSelectPermissions onChange={setPermissions} />

          {errors.permissions && <FormErrorMessage>{errors.permissions.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="shops" isRequired isInvalid={!!errors.shops}>
          <CustomMultiSelectShops onChange={setShops} />

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
