import React from "react";
import { Box } from "@chakra-ui/react";
import { BiListUl, BiMessageSquareAdd } from "react-icons/bi";
import PageLayout from "../layouts/PageLayout";
import CustomLink from "../components/CustomLink";

const ExpensesPage: React.FC<{}> = () => {
    return (
        <PageLayout>
            <Box padding={6}>
                <Box marginTop={4}>
                    <CustomLink
                        title="Expense Report"
                        icon={<BiMessageSquareAdd size={32} />}
                        toPath={`/expenses/new`}
                    />
                </Box>

                <Box marginTop={4}>
                    <CustomLink
                        title="View Reports"
                        icon={<BiListUl size={32} />}
                        toPath={`/expenses/list`}
                    />
                </Box>
            </Box>
        </PageLayout>
    );
};

export default ExpensesPage;
