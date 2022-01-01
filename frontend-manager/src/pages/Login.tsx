import React from "react";
import {
    Flex,
    Heading,
    Spinner,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import SimpleLayout from "../layouts/SimpleLayout";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/vectors/Logo";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
    const bgColor = useColorModeValue("gray.900", "white");

    const authState = useAuth();

    if (authState.isLoading) {
        return (
            <SimpleLayout>
                <VStack justifyContent={"center"} align={"center"}>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="teal.300"
                        size="xl"
                    />
                </VStack>
            </SimpleLayout>
        );
    }
    return !authState.data ? (
        <SimpleLayout padding={8}>
            <Flex marginBottom={4} marginTop={16} justifyContent={"center"}>
                <Logo fill={bgColor} display={"block"} />
            </Flex>
            <Heading fontSize="lg" as="h4" textAlign="center" marginBottom={12}>
                Store Managment Portal
            </Heading>
            <LoginForm />
        </SimpleLayout>
    ) : (
        <Navigate to="/" replace />
    );
};
export default LoginPage;
