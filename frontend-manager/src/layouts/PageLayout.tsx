import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

const Page = ({ children, ...rest }: { children: any }) => {
    return (
        <Box as="section">
            <Box {...rest} maxWidth={"lg"} marginX={"auto"}>
                {children}
            </Box>
        </Box>
    );
};

const PageLayout: React.FC<BoxProps> = ({ children, ...rest }) => (
    <Page {...rest}>{children}</Page>
);

export default PageLayout;
