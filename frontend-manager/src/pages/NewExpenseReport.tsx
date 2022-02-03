import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";
import ExpenseForm from "../components/Forms/ExpenseForm";

const NewExpenseReport: React.FC<{}> = () => {
    return (
        <PageLayout>
            <Box padding={6} width="100%">
                <Text>Daily expense form</Text>
                <Flex direction="column" marginTop={4}>
                    <ExpenseForm />
                </Flex>
            </Box>
        </PageLayout>
    );
};

export default NewExpenseReport;
