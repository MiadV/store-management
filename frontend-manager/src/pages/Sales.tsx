import React from "react";
import { Box } from "@chakra-ui/react";
import { BiListUl, BiMessageSquareAdd } from "react-icons/bi";
import PageLayout from "../layouts/PageLayout";
import CustomLink from "../components/CustomLink";

const SalesPage: React.FC<{}> = () => {
    return (
        <PageLayout>
            <Box padding={6}>
                <Box marginTop={4}>
                    <CustomLink
                        title="Sales Report"
                        icon={<BiMessageSquareAdd size={32} />}
                        toPath={`/sales/new`}
                    />
                </Box>

                <Box marginTop={4}>
                    <CustomLink
                        title="View Reports"
                        icon={<BiListUl size={32} />}
                        toPath={`/sales/list`}
                    />
                </Box>
            </Box>
        </PageLayout>
    );
};

export default SalesPage;
