import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { useAuthContext } from "../context/authContext";
import Header from "../components/Header";

const Page = ({ children, ...rest }: { children: any }) => {
    const { authUser } = useAuthContext();
    return (
        <Box as="section">
            <Box {...rest} maxWidth={"lg"} marginX={"auto"}>
                <Header title={(authUser && authUser.name) ?? ""} />
                <Box>{children}</Box>
            </Box>
        </Box>
    );
};

const PageLayout: React.FC<BoxProps> = ({ children, ...rest }) => (
    <Page {...rest}>{children}</Page>
);

export default PageLayout;
