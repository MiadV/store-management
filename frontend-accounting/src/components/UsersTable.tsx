import React, { useState, useEffect } from "react";
import {
    BiChevronLeft,
    BiChevronRight,
    BiChevronsLeft,
    BiChevronsRight,
    BiPlus,
} from "react-icons/bi";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    IconButton,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import Card from "./Card";
import { PaginatedList, UserType } from "../types";
import { useUsersList } from "../hooks/UsersHooks";

const UsersTable = () => {
    const [usersList, setUsersList] = useState<
        PaginatedList<UserType> | undefined
    >();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useUsersList({
        pageIndex: currentPage,
        options: { keepPreviousData: true, staleTime: Infinity },
    });

    useEffect(() => {
        setUsersList(data);
    }, [data, setUsersList]);

    return (
        <Card overflowX={{ base: "scroll", xl: "hidden" }}>
            <Flex p={4} justifyContent="space-between" align="center">
                <Text fontSize="xl" fontWeight="bold">
                    All Users
                </Text>

                <Button
                    colorScheme="teal"
                    variant="outline"
                    size="sm"
                    leftIcon={<BiPlus size={18} />}
                >
                    New
                </Button>
            </Flex>
            <Box p={4}>
                {isLoading ? (
                    <Box
                        background="rgba(255, 255, 255, 0.7)"
                        display="flex"
                        w="100%"
                        height="100%"
                        justifyContent="center"
                        alignItems="center"
                        zIndex={2000}
                    >
                        <Spinner
                            thickness="4px"
                            color="teal.500"
                            speed="0.65s"
                            size="xl"
                        />
                    </Box>
                ) : (
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
                            {usersList?.data.map((row: UserType) => {
                                return (
                                    <TablesTableRow
                                        user={row}
                                        key={row.userId}
                                    />
                                );
                            })}
                        </Tbody>
                    </Table>
                )}
            </Box>
            {usersList && (
                <Flex p={4} justifyContent="space-between" align="center">
                    <Flex flexDirection="row">
                        <IconButton
                            mr={2}
                            aria-label="Go to first page"
                            onClick={() => setCurrentPage(1)}
                            isDisabled={currentPage === 1}
                            icon={<BiChevronsLeft />}
                        />
                        <IconButton
                            mr={2}
                            aria-label="Go to previous page"
                            isDisabled={usersList.links.prev === null}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            icon={<BiChevronLeft />}
                        />
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        <Text mr={4}>
                            Page <strong>{currentPage}</strong>{" "}
                        </Text>
                    </Flex>
                    <Flex flexDirection="row">
                        <IconButton
                            ml={2}
                            aria-label="Go to next page"
                            isDisabled={usersList.links.next === null}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            icon={<BiChevronRight />}
                        />
                        <IconButton
                            ml={2}
                            aria-label="Go to last page"
                            // onClick={() => gotoPage(pageCount ? pageCount - 1 : 1)}
                            // isDisabled={!canNextPage}
                            isDisabled
                            icon={<BiChevronsRight />}
                        />
                    </Flex>
                </Flex>
            )}
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
