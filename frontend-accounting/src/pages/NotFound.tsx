import React from "react";
import { Heading, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AlertIcon from "../assets/vectors/AlertIcon";
import DashboardLayout from "../layouts/DashboardLayout";

const NotFoundPage = () => {
    return (
        <DashboardLayout>
            <Flex
                justifyContent="center"
                alignItems="center"
                direction="column"
                marginTop={8}
            >
                <Flex
                    bg="red.400"
                    width="130px"
                    height="130px"
                    borderRadius="100%"
                    justifyContent="center"
                    alignItems="center"
                    marginBottom={2}
                >
                    <AlertIcon fill="white" width="80px" height="80px" />
                </Flex>
                <Heading marginBottom={2}>404 - Not Found!</Heading>
                <Button
                    as={Link}
                    to="/"
                    replace={true}
                    colorScheme="teal"
                    variant={"outline"}
                >
                    Go Back
                </Button>
            </Flex>
        </DashboardLayout>
    );
};

export default NotFoundPage;
