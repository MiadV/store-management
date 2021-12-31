import React from "react";
import {
    Avatar,
    Box,
    Flex,
    Heading,
    IconButton,
    Stack,
    Text,
} from "@chakra-ui/react";
import { BiStore } from "react-icons/bi";
import Card from "./Card";
import SettingMenu from "./SettingMenu";

const Header = () => {
    return (
        <Card
            borderTopRadius={0}
            borderBottomRadius={16}
            boxShadow="md"
            padding={6}
        >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Box>
                    <Avatar size={"md"} boxShadow={"md"} />
                </Box>
                <Stack spacing={1} direction="row">
                    <IconButton
                        variant="ghost"
                        isRound
                        aria-label="Change Shop"
                        icon={<BiStore size={32} />}
                    />
                    <SettingMenu />
                </Stack>
            </Flex>
            <Heading as="h4" size="md" marginTop={4} color="gray.700">
                Hello, John Doe
            </Heading>
            <Text fontSize="lg" color="gray.600">
                Sunday,27th December
            </Text>
        </Card>
    );
};

export default Header;
