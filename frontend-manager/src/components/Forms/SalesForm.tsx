import React, { useEffect, useState } from "react";
import {
    FormControl,
    Stack,
    Button,
    InputGroup,
    FormErrorMessage,
    Textarea,
    Text,
    useToast,
    NumberInput,
    NumberInputField,
    FormLabel,
    Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, subDays } from "date-fns";
import { useQueryClient } from "react-query";
import CustomDatePicker from "../CustomDatePicker";
import mapServerSideErrors from "../../util/mapServerSideErrors";
import { INewSaleReport, ResponseErrorType } from "../../types";
import CustomSelectShop from "../CustomSelectShop";
import { SalesReportFormSchema } from "../../validations/SalesReportFormSchema";
import useNewSaleReportMutation from "../../hooks/useNewSaleReportMutation";
import currencyFormat from "../../util/currencyFormat";

const SalesForm: React.FC = () => {
    let navigate = useNavigate();
    const queryClient = useQueryClient();
    const toast = useToast();
    const [totalSale, setTotalSale] = useState(0);
    const newSalesReportMutation = useNewSaleReportMutation();
    const { handleSubmit, register, formState, setValue, setError, watch } =
        useForm({
            resolver: yupResolver(SalesReportFormSchema),
        });

    // update total sale amount
    const watchTotalSale = watch([
        "cash_amount",
        "card_amount",
        "online_transfer_amount",
    ]);

    useEffect(() => {
        const total = watchTotalSale.reduce((sum, i) => {
            if (!isNaN(parseFloat(i))) {
                return sum + parseFloat(i);
            } else {
                return sum;
            }
        }, 0);
        setTotalSale(total);
    }, [watchTotalSale, setTotalSale]);

    const { isSubmitting, errors } = formState;

    const onSubmit = async (data: INewSaleReport) => {
        const payload = {
            ...data,
            report_date: format(new Date(data.report_date), "yyyy-MM-dd"),
        };

        try {
            await newSalesReportMutation.mutateAsync(payload).then((res) => {
                navigate(`/sales/report/${res.data.saleId}`);
                queryClient.invalidateQueries(["latestSaleReport"]);
            });
        } catch (err) {
            const { response } = err as ResponseErrorType;
            if (response?.data.errors.message) {
                toast({
                    title: "Something went wrong!",
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
        <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%" }}
        >
            <Stack spacing={4} marginBottom={4}>
                <FormControl id="shop_id" isInvalid={!!errors.shop_id}>
                    <CustomSelectShop {...register("shop_id")} />
                    {errors.shop_id && (
                        <FormErrorMessage>
                            {errors.shop_id.message}
                        </FormErrorMessage>
                    )}
                </FormControl>

                <FormControl
                    id="report_date"
                    isRequired
                    isInvalid={!!errors.report_date}
                    placeholder="Report date"
                >
                    <CustomDatePicker
                        isClearable
                        placeholderText="Report Date"
                        minDate={subDays(new Date(), 1)}
                        maxDate={new Date()}
                        selected={watch("report_date")}
                        onChange={(date) => setValue("report_date", date)}
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
                    <FormLabel htmlFor="cash_amount">Cash Amount</FormLabel>
                    <NumberInput precision={2} width="100%">
                        <NumberInputField
                            placeholder="Sale in Cash"
                            {...register("cash_amount")}
                        />
                    </NumberInput>

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
                    <FormLabel htmlFor="card_amount">Card Amount</FormLabel>
                    <NumberInput precision={2}>
                        <NumberInputField
                            placeholder="Credit Card"
                            {...register("card_amount")}
                        />
                    </NumberInput>

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
                    <FormLabel htmlFor="online_transfer_amount">
                        Online Transfer
                    </FormLabel>
                    <NumberInput precision={2}>
                        <NumberInputField
                            placeholder="Online Transfer"
                            {...register("online_transfer_amount")}
                        />
                    </NumberInput>

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

                <Box textAlign={"center"} py={4}>
                    <Text fontWeight={"bold"}>
                        Total Sale: {currencyFormat(totalSale)}
                    </Text>
                </Box>

                <Button
                    isLoading={isSubmitting}
                    variant="solid"
                    type="submit"
                    loadingText="Please wait..."
                    colorScheme="teal"
                    isFullWidth
                >
                    Submit
                </Button>
            </Stack>
        </form>
    );
};

export default SalesForm;
