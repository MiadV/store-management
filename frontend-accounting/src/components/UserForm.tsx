import React from "react";
import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    Stack,
    useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResponseErrorType } from "../types";
import mapServerSideErrors from "../util/mapServerSideErrors";
import UserFormSchema from "../validations/UserFormValidtaion";

const UserForm = () => {
    const toast = useToast();
    // const loginMutation = useLoginMutation();
    const { handleSubmit, register, setError, formState } = useForm({
        resolver: yupResolver(UserFormSchema),
    });
    const { isSubmitting, errors } = formState;

    // const onSubmit = async (data: ILogin) => {
    //     try {
    //         await loginMutation.mutateAsync(data);
    //     } catch (err) {
    //         const { response } = err as ResponseErrorType;

    //         if (response?.data.errors.message) {
    //             toast({
    //                 title: "Authentication Error",
    //                 description: response?.data.errors.message,
    //                 status: "error",
    //                 duration: 3000,
    //                 isClosable: true,
    //             });
    //         } else {
    //             mapServerSideErrors(response?.data.errors!, setError);
    //         }
    //     }
    // };

    return (
        <form autoComplete="off">
            <Stack spacing={4} marginBottom={4}>
                <FormControl id="email" isRequired isInvalid={!!errors.email}>
                    <InputGroup>
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
export default UserForm;
