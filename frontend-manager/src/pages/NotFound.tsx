import React from "react";

import { Heading, Flex } from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";

const NotFoundPage = () => {
    return (
        <PageLayout>
            <Flex justifyContent={"center"}>
                <Heading>404 - Not Found!</Heading>
            </Flex>
        </PageLayout>
    );
};

export default NotFoundPage;
