import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { BiListUl, BiMessageSquareAdd } from "react-icons/bi";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth from "../hooks/useAuth";
import CustomLink from "../components/CustomLink";

const ExpensesPage: React.FC<{}> = () => {
    let { storeId } = useParams();
    const sanitizedStoreId = storeId ? parseInt(storeId) : 0;
    const { data: authUser } = useAuth();

    return (
        <PageLayout>
            <Header
                title={authUser!.shops[sanitizedStoreId].title}
                goBackPath={`/store/${storeId}`}
            />
            <Box padding={6}>
                <Text>Expense report</Text>

                <Box marginTop={4}>
                    <CustomLink
                        title="New Report"
                        icon={<BiMessageSquareAdd size={32} />}
                        toPath={`/expenses/new/${sanitizedStoreId}`}
                    />
                </Box>
                <Text marginTop={8}>Report history</Text>
                <Box marginTop={4}>
                    <CustomLink
                        title="View Reports"
                        icon={<BiListUl size={32} />}
                        toPath={`/expenses/list/${sanitizedStoreId}`}
                    />
                </Box>
            </Box>
        </PageLayout>
    );
};

export default ExpensesPage;
