import React, { useState, useEffect } from "react";
import {
    FormControl,
    Stack,
    Button,
    InputGroup,
    FormErrorMessage,
    Textarea,
    Skeleton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiMoney } from "react-icons/bi";
import CustomDatePicker from "./CustomDatePicker";
import { subDays } from "date-fns";
import CustomPriceInput from "./CustomPriceInput";
import ExpenseReportFormSchema from "../validations/ExpenseReportFormSchema";
import { ExpenseTypeType, INewExpenseReport } from "../types";
import CustomExpenseTypeSelect from "./CustomExpenseTypeSelect";
import ExpenseTypeBalanceProgress from "./ExpenseTypeBalanceProgress";
import useExpenseBalance from "../hooks/useExpenseBalance";
import CustomImageUpload from "./CustomImageUpload";

const NewExpenseForm: React.FC<{ storeId: number }> = ({ storeId }) => {
    const [reportDate, setReportDate] = useState<Date | null>(null);
    const [canSubmit, setCanSubmit] = useState(true);
    const [state, setState] = useState<{
        amount: string;
        expenseType: ExpenseTypeType | null;
    }>({
        amount: "",
        expenseType: null,
    });
    const expenseTypeShopId = state.expenseType
        ? state.expenseType!.expenseTypeShopId
        : 0;

    const { data: expenseBalance, isLoading } = useExpenseBalance(
        expenseTypeShopId,
        {
            enabled: expenseTypeShopId !== 0,
        }
    );

    // const newSaleReportMutation = useNewSaleReportMutation();
    const { handleSubmit, register, formState, setValue } = useForm({
        resolver: yupResolver(ExpenseReportFormSchema),
    });
    const { isSubmitting, errors } = formState;

    useEffect(() => {
        setValue("report_date", reportDate);
    }, [reportDate, setValue]);

    useEffect(() => {
        setValue("expense_type_shop_id", state.expenseType?.expenseTypeShopId);
    }, [state.expenseType, setValue]);

    useEffect(() => {
        setValue("amount", state.amount);
    }, [state.amount, setValue]);

    useEffect(() => {
        if (expenseBalance && expenseBalance.limit && expenseBalance.isStrict) {
            let balance =
                parseFloat(expenseBalance.limit) -
                parseFloat(expenseBalance.currentTotal);

            if (balance < parseFloat(state.amount)) {
                setCanSubmit(false);
            } else {
                setCanSubmit(true);
            }
        }
    }, [expenseBalance, state.amount]);

    const onSubmit = async (data: INewExpenseReport) => {
        console.log("submitted", data);
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} marginBottom={4}>
                <FormControl
                    id="expense_type_shop_id"
                    isInvalid={!!errors.expense_type_shop_id}
                >
                    <CustomExpenseTypeSelect
                        storeId={storeId}
                        placeholder="Expense Type"
                        selectedItem={(expenseType) =>
                            setState({ ...state, expenseType: expenseType })
                        }
                    />
                    {errors.expense_type_shop_id && (
                        <FormErrorMessage>
                            {errors.expense_type_shop_id.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
                <Skeleton isLoaded={!isLoading}>
                    {expenseBalance && (
                        <ExpenseTypeBalanceProgress
                            expenseBalance={expenseBalance}
                        />
                    )}
                </Skeleton>
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
                        placeholderText="Expense Date"
                        minDate={subDays(new Date(), 1)}
                        maxDate={new Date()}
                    />

                    {errors.report_date && (
                        <FormErrorMessage>
                            {errors.report_date.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl id="amount" isRequired isInvalid={!!errors.amount}>
                    <CustomPriceInput
                        name="amount"
                        placeholder="Amount"
                        icon={<BiMoney size={24} />}
                        value={state.amount}
                        onChange={(e) =>
                            setState({
                                ...state,
                                amount: e.target.value,
                            })
                        }
                    />

                    {errors.amount && (
                        <FormErrorMessage>
                            {errors.amount.message}
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

                <CustomImageUpload />

                <Button
                    isLoading={isSubmitting}
                    disabled={!canSubmit}
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

export default NewExpenseForm;
