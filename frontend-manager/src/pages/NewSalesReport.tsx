import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth from "../hooks/useAuth";
import NoOptionsCard from "../components/NoOptionsCard";
import NewSaleForm from "../components/NewSaleForm";

const NewSalesReport: React.FC<{}> = () => {
    let { storeId } = useParams();
    const sanitizedStoreId = storeId ? parseInt(storeId) : 0;
    const { data: authUser } = useAuth();

    // validate storeId
    if (!storeId || authUser?.shops[sanitizedStoreId] === undefined) {
        return (
            <PageLayout>
                <Header title="No Store!" goBackPath="/" />
                <NoOptionsCard
                    title="Oops!"
                    subtitle="Something went wrong. Try again."
                />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Header
                title={authUser!.shops[sanitizedStoreId].title}
                goBackPath={`/sales/${storeId}`}
            />
            <Box padding={6}>
                <Text>Daily Sale form</Text>
                <VStack marginTop={4}>
                    <NewSaleForm storeId={storeId} />
                </VStack>
            </Box>
        </PageLayout>
    );
};

export default NewSalesReport;
