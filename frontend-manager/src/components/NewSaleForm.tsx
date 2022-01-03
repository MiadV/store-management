import React, { useState, useEffect } from "react";
import {
    FormControl,
    Stack,
    Button,
    InputGroup,
    FormErrorMessage,
    Textarea,
    Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiCreditCardFront, BiMoney, BiTransfer } from "react-icons/bi";

// import mapServerSideErrors from "../util/mapServerSideErrors";
import CustomDatePicker from "./CustomDatePicker";
import { subDays } from "date-fns";
import CustomPriceInput from "./CustomPriceInput";
import SaleReportFormSchema from "../validations/SaleReportFormValidation";
import { INewSaleReport } from "../hooks/useNewSaleReportMutation";
import currencyFormat from "../util/currencyFormat";

const NewSaleForm: React.FC<any> = () => {
    const [reportDate, setReportDate] = useState<Date | null>(null);
    const [state, setState] = useState({
        cash_amount: "0.00",
        card_amount: "0.00",
        online_transfer_amount: "0.00",
    });
    // const toast = useToast();
    // const newSaleReportMutation = useNewSaleReportMutation();
    const { handleSubmit, register, setError, formState, setValue } = useForm({
        resolver: yupResolver(SaleReportFormSchema),
    });
    const { isSubmitting, errors } = formState;

    useEffect(() => {
        setValue("report_date", reportDate);
    }, [reportDate, setValue]);

    useEffect(() => {
        setValue("cash_amount", state.cash_amount);
    }, [state.cash_amount, setValue]);

    useEffect(() => {
        setValue("card_amount", state.card_amount);
    }, [state.card_amount, setValue]);

    useEffect(() => {
        setValue("online_transfer_amount", state.online_transfer_amount);
    }, [state.online_transfer_amount, setValue]);

    const onSubmit = async (data: INewSaleReport) => {
        console.log(data);
        // try {
        //     await loginMutation.mutateAsync(data);
        // } catch (err) {
        //     const { response } = err as LoginErrorType;
        //     if (response?.data.errors.message) {
        //         toast({
        //             title: "Authentication Error",
        //             description: response?.data.errors.message,
        //             status: "error",
        //             duration: 3000,
        //             isClosable: true,
        //         });
        //     } else {
        //         mapServerSideErrors(response?.data.errors!, setError);
        //     }
        // }
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} marginBottom={4}>
                <FormControl
                    id="report_date"
                    isRequired
                    isInvalid={!!errors.report_date}
                    placeholder="Report date"
                >
                    <CustomDatePicker
                        onChange={(v) => setReportDate(v)}
                        selected={reportDate}
                        isClearable
                        placeholderText="Report Date"
                        minDate={subDays(new Date(), 1)}
                        maxDate={new Date()}
                    />

                    {errors.report_date && (
                        <FormErrorMessage>
                            {errors.report_date.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl
                    id="cash_amount"
                    isRequired
                    isInvalid={!!errors.cash_amount}
                >
                    <CustomPriceInput
                        name="cash_amount"
                        placeholder="Sale in Cash"
                        icon={<BiMoney size={24} />}
                        value={state.cash_amount}
                        onChange={(e) =>
                            setState({
                                ...state,
                                cash_amount: e.target.value,
                            })
                        }
                    />

                    {errors.cash_amount && (
                        <FormErrorMessage>
                            {errors.cash_amount.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl
                    id="card_amount"
                    isRequired
                    isInvalid={!!errors.card_amount}
                >
                    <CustomPriceInput
                        name="card_amount"
                        placeholder="Credit Card"
                        icon={<BiCreditCardFront size={24} />}
                        value={state.card_amount}
                        onChange={(e) =>
                            setState({
                                ...state,
                                card_amount: e.target.value,
                            })
                        }
                    />

                    {errors.card_amount && (
                        <FormErrorMessage>
                            {errors.card_amount.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl
                    id="online_transfer_amount"
                    isRequired
                    isInvalid={!!errors.online_transfer_amount}
                >
                    <CustomPriceInput
                        name="online_transfer_amount"
                        placeholder="Online Transfer"
                        icon={<BiTransfer size={24} />}
                        value={state.online_transfer_amount}
                        onChange={(e) =>
                            setState({
                                ...state,
                                online_transfer_amount: e.target.value,
                            })
                        }
                    />

                    {errors.online_transfer_amount && (
                        <FormErrorMessage>
                            {errors.online_transfer_amount.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl id="description" isInvalid={!!errors.description}>
                    <InputGroup>
                        <Textarea
                            placeholder="Description"
                            {...register("description")}
                        />
                    </InputGroup>

                    {errors.description && (
                        <FormErrorMessage>
                            {errors.description.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
            </Stack>
            <Box>
                {currencyFormat(
                    (
                        Number(state.cash_amount) +
                        Number(state.card_amount) +
                        Number(state.online_transfer_amount)
                    ).toFixed(2)
                )}
            </Box>
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

export default NewSaleForm;
