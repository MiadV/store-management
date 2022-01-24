import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";
import ExpenseForm from "../components/Forms/ExpenseForm";

const NewExpenseReport: React.FC<{}> = () => {
    return (
        <PageLayout>
            <Box padding={6}>
                <Text>Daily expense form</Text>
                <VStack marginTop={4}>
                    <ExpenseForm />
                </VStack>
            </Box>
        </PageLayout>
    );
};

export default NewExpenseReport;
