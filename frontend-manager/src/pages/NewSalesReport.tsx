import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";
import SalesForm from "../components/Forms/SalesForm";

const NewSalesReport: React.FC<{}> = () => {
    return (
        <PageLayout>
            <Box padding={6} width="100%">
                <Text>Daily sale form</Text>
                <VStack marginTop={4} width="100%">
                    <SalesForm />
                </VStack>
            </Box>
        </PageLayout>
    );
};

export default NewSalesReport;
