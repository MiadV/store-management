import React from "react";
import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SimpleLayout from "../layouts/SimpleLayout";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/vectors/Logo";

import LoadingOverlay from "../components/LoadingOverlay";

const LoginPage = () => {
    const bgColor = useColorModeValue("gray.900", "white");

    const authState = useAuth();

    if (authState.isLoading) {
        return <LoadingOverlay />;
    }
    return !authState.data ? (
        <SimpleLayout padding={8}>
            <Box maxW={"sm"} p={8}>
                <Flex marginBottom={4} marginTop={16} justifyContent={"center"}>
                    <Logo fill={bgColor} display={"block"} />
                </Flex>
                <Heading
                    fontSize="lg"
                    as="h4"
                    textAlign="center"
                    marginBottom={12}
                >
                    Store Managment Portal
                </Heading>
                <LoginForm />
            </Box>
        </SimpleLayout>
    ) : (
        <Navigate to="/" replace />
    );
};
export default LoginPage;
