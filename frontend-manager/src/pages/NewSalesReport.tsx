import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
// import useAuth from "../hooks/useAuth";
// import NewSaleForm from "../components/NewSaleForm";

const NewSalesReport: React.FC<{}> = () => {
    let { storeId } = useParams();
    // const sanitizedStoreId = storeId ? parseInt(storeId) : 0;
    // const { data: authUser } = useAuth();

    return (
        <PageLayout>
            <Header
                title={"selected hsop title"}
                goBackPath={`/sales/${storeId}`}
            />
            <Box padding={6}>
                <Text>Daily Sale form</Text>
                <VStack marginTop={4}>
                    {/* <NewSaleForm storeId={storeId} /> */}
                </VStack>
            </Box>
        </PageLayout>
    );
};

export default NewSalesReport;
