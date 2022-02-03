import React, { forwardRef } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import {
    Input,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
} from "@chakra-ui/react";
import { BiCalendar } from "react-icons/bi";
// import CSS
import "react-datepicker/dist/react-datepicker.css";
import "./chakra-react-datepicker.css";

const CustomDatePicker = (props: ReactDatePickerProps) => {
    const className = useColorModeValue("light-theme", "dark-theme");

    return (
        <div className={className}>
            <DatePicker
                customInput={<CustomInput />}
                className="react-datapicker__input-text"
                {...props}
            />
        </div>
    );
};

export default CustomDatePicker;

const customDateInput = (props: any, ref: any) => (
    <InputGroup>
        <InputLeftElement
            color="gray.400"
            children={<BiCalendar size={24} />}
            onClick={props.onClick}
        />

        <Input autoComplete="off" {...props} ref={ref} width="100%" />
    </InputGroup>
);
customDateInput.displayName = "DateInput";

const CustomInput = forwardRef(customDateInput);
