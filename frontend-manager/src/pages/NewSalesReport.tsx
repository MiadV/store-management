import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";
import SalesForm from "../components/Forms/SalesForm";

const NewSalesReport: React.FC<{}> = () => {
    return (
        <PageLayout>
            <Box padding={6}>
                <Text>Daily sale form</Text>
                <Flex direction="column" marginTop={4}>
                    <SalesForm />
                </Flex>
            </Box>
        </PageLayout>
    );
};

export default NewSalesReport;
