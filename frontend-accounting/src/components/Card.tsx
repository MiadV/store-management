import React from "react";
import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

const Card: React.FC<BoxProps> = ({ children, ...rest }) => {
    const bgColor = useColorModeValue("white", "gray.700");
    return (
        <Box bg={bgColor} rounded="lg" boxShadow={"base"} {...rest}>
            {children}
        </Box>
    );
};
export default Card;
