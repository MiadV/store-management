import React from "react";
import { Spinner, VStack } from "@chakra-ui/react";
import SimpleLayout from "../layouts/SimpleLayout";

export default function LoadingOverlay() {
    return (
        <SimpleLayout>
            <VStack justifyContent={"center"} align={"center"} height={"100vh"}>
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
