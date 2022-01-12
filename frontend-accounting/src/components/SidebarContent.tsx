import {
    Box,
    BoxProps,
    Collapse,
    Flex,
    FlexProps,
    Icon,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import {
    BiArchive,
    BiChevronDown,
    BiChevronRight,
    BiGroup,
} from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/vectors/Logo";

const SidebarContent: React.FC<BoxProps> = (props) => {
    const navigate = useNavigate();
    const integrations = useDisclosure();

    return (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg={useColorModeValue("white", "gray.700")}
            borderColor={useColorModeValue("inherit", "gray.600")}
            borderRightWidth="1px"
            w="60"
            {...props}
        >
            <Flex direction="column" px="4" py="5" align="center">
                <Logo
                    width="50px"
                    height="50px"
                    fill={useColorModeValue("gray.800", "white")}
                />
                <Text fontSize="large" fontWeight="semibold">
                    Store Management
                </Text>
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="gray.600"
                aria-label="Main Navigation"
            >
                <NavItem icon={BiGroup} linkTo="/users">
                    Users
                </NavItem>

                <NavItem icon={BiArchive} onClick={integrations.onToggle}>
                    Integrations
                    {integrations.isOpen ? (
                        <Icon as={BiChevronDown} ml="auto" boxSize={5} />
                    ) : (
                        <Icon as={BiChevronRight} ml="auto" boxSize={5} />
                    )}
                </NavItem>
                <Collapse in={integrations.isOpen}>
                    <NavItem pl="12" py="2">
                        Shopify
                    </NavItem>
                </Collapse>
            </Flex>
            <Box px="4" py="5" position={"absolute"} bottom={0}>
                <Text fontSize="xs" textAlign="center">
                    MiadV Version: 0.0.1
                </Text>
            </Box>
        </Box>
    );
};

export default SidebarContent;

const NavItem: React.FC<
    FlexProps & { icon?: IconType; onClick?: () => void; linkTo?: string }
> = (props) => {
    const { icon, children, linkTo, ...rest } = props;
    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            color={useColorModeValue("inherit", "gray.400")}
            _hover={{
                bg: useColorModeValue("gray.100", "gray.900"),
                color: useColorModeValue("gray.900", "gray.200"),
            }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            as={linkTo ? Link : "div"}
            to={linkTo ? linkTo : undefined}
            {...rest}
        >
            {icon && <Icon mx="2" boxSize={5} as={icon} />}
            {children}
        </Flex>
    );
};
