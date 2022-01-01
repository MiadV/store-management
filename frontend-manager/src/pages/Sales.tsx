import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { BiFile, BiMessageSquareAdd } from "react-icons/bi";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth from "../hooks/useAuth";
import useLatestSaleReport from "../hooks/useLatestSaleReport";
import NoOptionsCard from "../components/NoOptionsCard";
import CustomButton from "../components/CustomButton";
import ReportListItem from "../components/ReportListItem";

const SalesPage: React.FC<{}> = () => {
    let { storeId } = useParams();
    const sanitizedStoreId = storeId ? parseInt(storeId) : 0;
    const { data: authUser } = useAuth();
    const { data: saleReport, isLoading } =
        useLatestSaleReport(sanitizedStoreId);

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
                goBackPath={`/store/${storeId}`}
            />
            <Box padding={6}>
                <Text>Sales report</Text>

                <Box marginTop={4}>
                    <CustomButton
                        title="New Report"
                        icon={<BiMessageSquareAdd size={32} />}
                        callback={() => {}}
                    />
                </Box>
                <Text marginTop={8}>Latest report</Text>
                <Box marginTop={4}>
                    <ReportListItem
                        amount={saleReport?.TotalAmount}
                        date={saleReport?.reportDate}
                        icon={<BiFile size={32} />}
                        isLoading={isLoading}
                        callback={() => {}}
                    />
                </Box>
            </Box>
        </PageLayout>
    );
};

export default SalesPage;
