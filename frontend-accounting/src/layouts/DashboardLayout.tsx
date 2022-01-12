import React from "react";
import {
    useColorModeValue,
    Box,
    BoxProps,
    useDisclosure,
    Flex,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    IconButton,
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import SidebarContent from "../components/SidebarContent";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import UserAvatarMenu from "../components/UserAvatarMenu";

const Dashboard: React.FC<BoxProps> = ({ children, ...rest }) => {
    const sidebar = useDisclosure();

    return (
        <Box
            as="section"
            bg={useColorModeValue("gray.50", "gray.800")}
            minH="100vh"
            {...rest}
        >
            <SidebarContent display={{ base: "none", md: "unset" }} />
            <Drawer
                isOpen={sidebar.isOpen}
                onClose={sidebar.onClose}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
                <Flex
                    as="header"
                    align="center"
                    justify="space-between"
                    w="full"
                    px="4"
                    bg={useColorModeValue("white", "gray.700")}
                    borderBottomWidth="1px"
                    borderColor={useColorModeValue("inherit", "gray.600")}
                    h="14"
                >
                    <IconButton
                        aria-label="Menu"
                        display={{ base: "inline-flex", md: "none" }}
                        onClick={sidebar.onOpen}
                        icon={<BiMenu size={24} />}
                        size="sm"
                    />
                    <div></div>

                    <Flex align="center">
                        <ColorModeSwitcher />

                        <UserAvatarMenu ml="4" />
                    </Flex>
                </Flex>

                <Box as="main" p="4">
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

const DashboardLayout: React.FC<BoxProps> = ({ children, ...rest }) => (
    <Dashboard {...rest}>{children}</Dashboard>
);

export default DashboardLayout;
