import React, { forwardRef } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import {
    Input,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
} from "@chakra-ui/react";
// import CSS
import "react-datepicker/dist/react-datepicker.css";
import "./chakra-react-datepicker.css";
import { BiCalendar } from "react-icons/bi";

const CustomDatePicker = ({
    selected: selectedDate,
    onChange,
    placeholderText,
    ...props
}: ReactDatePickerProps) => {
    const className = useColorModeValue("light-theme", "dark-theme");
    return (
        <div className={className}>
            <ReactDatePicker
                selected={selectedDate}
                onChange={onChange}
                className="react-datapicker__input-text"
                customInput={<CustomInput placeholderText={placeholderText} />}
                dateFormat="yyyy/MM/dd"
                {...props}
            />
        </div>
    );
};

export default CustomDatePicker;

const customDateInput = (
    { value, onClick, onChange, placeholderText }: any,
    ref: any
) => (
    <InputGroup>
        <InputLeftElement
            color="gray.400"
            children={<BiCalendar size={24} />}
            onClick={onClick}
        />

        <Input
            autoComplete="off"
            value={value}
            ref={ref}
            onClick={onClick}
            onChange={onChange}
            placeholder={placeholderText}
        />
    </InputGroup>
);
customDateInput.displayName = "DateInput";

const CustomInput = forwardRef(customDateInput);
