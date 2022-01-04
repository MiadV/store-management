import React from "react";
import { useColorModeValue, Box, BoxProps } from "@chakra-ui/react";

const Page = ({ children, ...rest }: { children: any }) => {
    const bgColor = useColorModeValue("gray.100", "gray.800");

    return (
        <Box as="section" bgColor={bgColor} minHeight={"100vh"}>
            <Box {...rest}>{children}</Box>
        </Box>
    );
};

const PageLayout: React.FC<BoxProps> = ({ children, ...rest }) => (
    <Page {...rest}>{children}</Page>
);

export default PageLayout;
