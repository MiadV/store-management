import React, { forwardRef } from "react";
import {
    Input,
    InputGroup,
    InputLeftElement,
    InputProps,
    useNumberInput,
} from "@chakra-ui/react";

const CustomPriceInput: React.ForwardRefRenderFunction<
    any,
    InputProps & {
        icon: React.ReactNode;
        defaultValue?: string | number | undefined;
    }
> = ({ defaultValue, icon, ...otherProps }, ref: any) => {
    const { getInputProps } = useNumberInput({
        min: 0,
        precision: 2,
        defaultValue,
    });

    const input = getInputProps();

    return (
        <InputGroup>
            <InputLeftElement color="gray.400" children={icon} />
            <Input {...input} {...otherProps} ref={ref} />
        </InputGroup>
    );
};

export default forwardRef(CustomPriceInput);
