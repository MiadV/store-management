import React from "react";
import {
    useColorModeValue,
    Box,
    BoxProps,
    VStack,
    Grid,
} from "@chakra-ui/react";

import { ColorModeSwitcher } from "../ColorModeSwitcher";

const Simple = ({ children, ...rest }: { children: any }) => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    return (
        <>
            <Box as="section" bgColor={bgColor}>
                <Grid minH="100vh">
                    <ColorModeSwitcher justifySelf="flex-end" />
                    <VStack>
                        <Box {...rest}>{children}</Box>
                    </VStack>
                </Grid>
            </Box>
        </>
    );
};

const SimpleLayout: React.FC<BoxProps> = ({ children, ...rest }) => (
    <Simple {...rest}>{children}</Simple>
);

export default SimpleLayout;
