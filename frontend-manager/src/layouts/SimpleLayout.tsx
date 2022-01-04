import React from "react";
import { useColorModeValue, Box, BoxProps } from "@chakra-ui/react";

const Simple = ({ children, ...rest }: { children: any }) => {
    const bgColor = useColorModeValue("white", "gray.800");

    return (
        <Box as="section" bgColor={bgColor}>
            <Box {...rest}>{children}</Box>
        </Box>
    );
};

const SimpleLayout: React.FC<BoxProps> = ({ children, ...rest }) => (
    <Simple {...rest}>{children}</Simple>
);

export default SimpleLayout;
