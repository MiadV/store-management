import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";

const SelectShop = () => {
    return (
        <PageLayout>
            <Header />
            <Flex marginBottom={4} marginTop={16} justifyContent={"center"}>
                ads
            </Flex>
            <Heading size="lg" as="h4" textAlign="center" marginBottom={12}>
                select shop
            </Heading>
        </PageLayout>
    );
};

export default SelectShop;
