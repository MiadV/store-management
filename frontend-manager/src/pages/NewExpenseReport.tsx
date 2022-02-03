import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";
import ExpenseForm from "../components/Forms/ExpenseForm";

const NewExpenseReport: React.FC<{}> = () => {
    return (
        <PageLayout>
            <Box padding={6} width="100%">
                <Text>Daily expense form</Text>
                <VStack marginTop={4} width="100%">
                    <ExpenseForm />
                </VStack>
            </Box>
        </PageLayout>
    );
};

export default NewExpenseReport;
