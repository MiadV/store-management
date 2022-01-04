import React from "react";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth from "../hooks/useAuth";
import NoOptionsCard from "../components/NoOptionsCard";
import SimpleLayout from "../layouts/SimpleLayout";
import SaleReportItem from "../components/SaleReportItem";
import useSaleReportById from "../hooks/useSaleReportById";

const SaleReport: React.FC<{}> = () => {
    let { reportId, storeId } = useParams();
    const sanitizedReportId = reportId ? parseInt(reportId) : 0;
    const sanitizedStoreId = storeId ? parseInt(storeId) : 0;
    const { data: authUser } = useAuth();
    const { data: saleReport, isLoading } =
        useSaleReportById(sanitizedReportId);

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

    if (isLoading || !saleReport) {
        return (
            <SimpleLayout>
                <VStack justifyContent={"center"} align={"center"}>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="teal.300"
                        size="xl"
                    />
                </VStack>
            </SimpleLayout>
        );
    }

    return (
        <SimpleLayout>
            <Box padding={6}>{<SaleReportItem report={saleReport} />}</Box>
        </SimpleLayout>
    );
};

export default SaleReport;
