import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import AlertIcon from "../assets/vectors/AlertIcon";

const NoReportHistorySummary: React.FC<{ message: string }> = ({ message }) => {
    return (
        <Box>
            <Flex alignItems={"center"}>
                <Link to="/history" replace={true}>
                    <IconButton
                        variant="ghost"
                        isRound
                        aria-label="Go back one page"
                        icon={<BiArrowBack size={32} />}
                    />
                </Link>
            </Flex>
            <Flex justifyContent="center" marginY={8}>
                <Flex
                    bg="red.400"
                    width="130px"
                    height="130px"
                    borderRadius="100%"
                    justifyContent="center"
                    alignItems="center"
                >
                    <AlertIcon fill="white" width="80px" height="80px" />
                </Flex>
            </Flex>
            <Box padding={2}>
                <Text fontSize="lg" textAlign="center" fontWeight={"semibold"}>
                    {message}
                </Text>
            </Box>
        </Box>
    );
};

export default NoReportHistorySummary;
