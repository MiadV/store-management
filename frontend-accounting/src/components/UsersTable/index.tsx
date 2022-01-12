import React from "react";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import Card from "../Card";
import { UserType } from "../../types";

const tempData = [
    {
        userId: 1,
        name: "Test User",
        email: "test@test.com",
        phone: null,
        isActive: true,
        shops: [
            {
                shopId: 1,
                title: "Shop A",
                address: "klklkl",
                isActive: true,
            },
            {
                shopId: 2,
                title: "Shop B",
                address: "klklkl",
                isActive: true,
            },
        ],
        permissions: ["SALES_REPORT", "EXPENSE_REPORT", "ACCOUNTING_MODULE"],
    },
    {
        userId: 2,
        name: "Test User 2",
        email: "test2@test.com",
        phone: null,
        isActive: true,
        shops: [
            {
                shopId: 1,
                title: "Shop A",
                address: "klklkl",
                isActive: true,
            },
        ],
        permissions: ["SALES_REPORT", "EXPENSE_REPORT", "REPORT_HISTORY"],
    },
];

const UsersTable = () => {
    return (
        <Card overflowX={{ base: "scroll", xl: "hidden" }}>
            <Box p={4}>
                <Text fontSize="xl" fontWeight="bold">
                    All Users
                </Text>
            </Box>
            <Box p={4}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th color="gray.400">Author</Th>
                            <Th color="gray.400">Permissions</Th>
                            <Th color="gray.400">Shops</Th>
                            <Th color="gray.400">Status</Th>
                            <Th color="gray.400">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tempData.map((row: UserType) => {
                            return (
                                <TablesTableRow user={row} key={row.userId} />
                            );
                        })}
                    </Tbody>
                </Table>
            </Box>
        </Card>
    );
};

const TablesTableRow: React.FC<{ user: UserType }> = ({ user }) => {
    return (
        <Tr>
            <Td>
                <Flex align="center" minWidth="100%" flexWrap="nowrap">
                    <Avatar src={""} w="50px" rounded={8} me={2} />
                    <Flex direction="column">
                        <Text fontSize="md" fontWeight="bold" minWidth="100%">
                            {user.name}
                        </Text>
                        <Text
                            fontSize="sm"
                            color="gray.400"
                            fontWeight="normal"
                        >
                            {user.email}
                        </Text>
                    </Flex>
                </Flex>
            </Td>

            <Td>
                <Flex direction="column">
                    {user.permissions.map((i) => (
                        <Text fontSize="sm" fontWeight="semibold" key={i}>
                            {i}
                        </Text>
                    ))}
                </Flex>
            </Td>
            <Td>
                <Flex direction="column">
                    {user.shops.map((i) => (
                        <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            key={i.shopId}
                        >
                            {i.title}
                        </Text>
                    ))}
                </Flex>
            </Td>
            <Td>
                <Badge
                    bg={user.isActive ? "green.400" : "red.400"}
                    color="white"
                    rounded={4}
                >
                    {user.isActive ? "Active" : "Disabled"}
                </Badge>
            </Td>

            <Td>
                <Button size={"sm"}>Edit</Button>
            </Td>
        </Tr>
    );
};

export default UsersTable;
