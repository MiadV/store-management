import React from "react";
import {
    FormControl,
    Input,
    Stack,
    Button,
    InputGroup,
    InputLeftElement,
    Icon,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiEnvelope, BiLock } from "react-icons/bi";

import LoginFormSchema from "../validations/LoginFormValidation";
import { useLoginMutation } from "../hooks/useAuth";
import mapServerSideErrors from "../util/mapServerSideErrors";
import { ILogin, ResponseErrorType } from "../types";

const LoginForm: React.FC<any> = () => {
    const toast = useToast();
    const loginMutation = useLoginMutation();
    const { handleSubmit, register, setError, formState } = useForm({
        resolver: yupResolver(LoginFormSchema),
    });
    const { isSubmitting, errors } = formState;

    const onSubmit = async (data: ILogin) => {
        try {
            await loginMutation.mutateAsync(data);
        } catch (err) {
            const { response } = err as ResponseErrorType;

            if (response?.data.errors.message) {
                toast({
                    title: "Authentication Error",
                    description: response?.data.errors.message,
                    status: "error",
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
                <FormControl id="email" isRequired isInvalid={!!errors.email}>
                    <InputGroup>
                        <InputLeftElement
                            children={<Icon as={BiEnvelope} color="gray.400" />}
                        />
                        <Input
                            variant="filled"
                            type="email"
                            placeholder="Email"
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
                    <InputGroup>
                        <InputLeftElement
                            children={<Icon as={BiLock} color="gray.400" />}
                        />
                        <Input
                            variant="filled"
                            type="password"
                            placeholder="Password"
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
                    Login
                </Button>
            </Stack>
        </form>
    );
};

export default LoginForm;
