import React from 'react';
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { Navigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SimpleLayout from '../layouts/SimpleLayout';
import useAuth from '../hooks/useAuth';
import Logo from '../assets/vectors/Logo';
import LoadingOverlay from '../components/LoadingOverlay';

interface stateType {
  from: { pathname: string };
}

const LoginPage = () => {
  const bgColor = useColorModeValue('gray.900', 'white');

  const auth = useAuth();
  let { state } = useLocation();

  let from = (state as stateType)?.from?.pathname || '/';

  if (auth.isLoading) {
    return <LoadingOverlay />;
  }

  if (auth.isLoading) {
    return <LoadingOverlay />;
  }
  return !auth.data ? (
    <SimpleLayout padding={8}>
      <Box maxW={'sm'} p={8}>
        <Flex marginBottom={4} marginTop={16} justifyContent={'center'}>
          <Logo fill={bgColor} display={'block'} />
        </Flex>
        <Heading fontSize="lg" as="h4" textAlign="center" marginBottom={12}>
          Store Managment Portal
        </Heading>
        <LoginForm />
      </Box>
    </SimpleLayout>
  ) : (
    <Navigate to={from} replace />
  );
};
export default LoginPage;
