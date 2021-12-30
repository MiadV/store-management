import React from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    InputGroup,
    InputLeftElement,
    Icon,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import Card from "./Card";
import LoginFormSchema from "../validations/LoginFormValidation";
import useLoginMutation, { ILogin } from "../hooks/useLoginMutation";

const LoginForm: React.FC<any> = () => {
    const toast = useToast();
    const loginMutation = useLoginMutation();
    const { handleSubmit, register, reset, formState } = useForm({
        resolver: yupResolver(LoginFormSchema),
    });
    const { isSubmitting, errors } = formState;

    const onSubmit = async (data: ILogin) => {
        try {
            await loginMutation.mutateAsync(data);
        } catch (error) {
            reset();
            toast({
                title: "Authentication Error",
                // description: error.message,
                description: "Sdsdsd",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Card w={"full"} maxW={"md"} p={8}>
            <Heading size="lg" as="h4" textAlign="center" marginBottom={4}>
                Login
            </Heading>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4} marginBottom={4}>
                    <FormControl
                        id="email"
                        isRequired
                        isInvalid={!!errors.email}
                    >
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Icon as={FaRegEnvelope} color="gray.300" />
                                }
                            />
                            <Input
                                focusBorderColor="main.500"
                                type="email"
                                placeholder="name@example.com"
                                {...register("email")}
                            />
                        </InputGroup>
                        {errors.email && (
                            <FormErrorMessage>
                                {errors.email.message}
                            </FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl
                        id="password"
                        isRequired
                        isInvalid={!!errors.password}
                    >
                        <Stack justifyContent="space-between" isInline>
                            <FormLabel htmlFor="password">Password</FormLabel>
                        </Stack>
                        <InputGroup>
                            <InputLeftElement
                                children={<Icon as={FaLock} color="gray.300" />}
                            />
                            <Input
                                focusBorderColor="main.500"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                            />
                        </InputGroup>
                        {errors.password && (
                            <FormErrorMessage>
                                {errors.password.message}
                            </FormErrorMessage>
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
                        Sign in
                    </Button>
                </Stack>
            </form>
        </Card>
    );
};

export default LoginForm;
