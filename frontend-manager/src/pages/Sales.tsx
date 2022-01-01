import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth from "../hooks/useAuth";
import NoOptionsCard from "../components/NoOptionsCard";
import CustomButton from "../components/CustomButton";
import ReportListItem from "../components/ReportListItem";
import { BiFile, BiMessageSquareAdd } from "react-icons/bi";

const SalesPage: React.FC<{}> = () => {
    let { storeId } = useParams();
    const { data: authUser } = useAuth();

    // validate storeId
    if (!storeId || authUser?.shops[parseInt(storeId)] === undefined) {
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
                title={authUser!.shops[parseInt(storeId!)].title}
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
                        amount="10,000"
                        date="2021-12-15"
                        icon={<BiFile size={32} />}
                        callback={() => {}}
                    />
                </Box>
            </Box>
        </PageLayout>
    );
};

export default SalesPage;
