import React, { useState, useEffect } from 'react';
import { BiPlus } from 'react-icons/bi';
import {
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useExpenseTypeItemsList } from '../hooks/ExpenseTypeHooks';
import Card from './Card';
import { ExpenseItemType } from '../types';
import ExpenseTypeForm from './ExpenseTypeForm';
import { format } from 'date-fns';

const ExpenseTypesTable = () => {
  const { isOpen: isAddFormOpen, onOpen: onAddFormOpen, onClose: onAddFormClose } = useDisclosure();
  const [expenseTypesList, setExpenseTypesList] = useState<ExpenseItemType[] | undefined>();
  const { data, isLoading } = useExpenseTypeItemsList({
    staleTime: Infinity,
  });

  useEffect(() => {
    setExpenseTypesList(data);
  }, [data, setExpenseTypesList]);

  return (
    <>
      <Card overflowX={{ base: 'scroll', xl: 'hidden' }}>
        <Flex p={4} justifyContent="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">
            Expense Types
          </Text>

          <Button
            colorScheme="teal"
            variant="outline"
            size="sm"
            leftIcon={<BiPlus size={18} />}
            onClick={onAddFormOpen}
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
              <Spinner thickness="4px" color="teal.500" speed="0.65s" size="xl" />
            </Box>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="gray.400">Title</Th>
                  <Th color="gray.400">Scope</Th>
                  <Th color="gray.400">Created at</Th>
                </Tr>
              </Thead>
              <Tbody>
                {expenseTypesList?.map((row: ExpenseItemType) => {
                  return <TablesTableRow expenseType={row} key={row.expenseTypeId} />;
                })}
              </Tbody>
            </Table>
          )}
        </Box>
      </Card>
      <Modal isOpen={isAddFormOpen} onClose={onAddFormClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxW={'sm'} p={8} justifyContent="center">
          <ModalCloseButton />
          <Text fontWeight={'semibold'} fontSize="xl">
            New expense type
          </Text>
          <Box px={8} py={4}>
            <ExpenseTypeForm closeModal={onAddFormClose} />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ExpenseTypesTable;

const TablesTableRow: React.FC<{ expenseType: ExpenseItemType }> = ({ expenseType }) => {
  return (
    <Tr>
      <Td>
        <Text fontSize="sm" fontWeight="semibold" minWidth="100%">
          {expenseType.title}
        </Text>
      </Td>

      <Td>
        <Badge colorScheme={expenseType.accountantOnly ? 'orange' : 'purple'} rounded={4}>
          {expenseType.accountantOnly ? 'Accountant' : 'Manager'}
        </Badge>
      </Td>

      <Td>
        <Text fontSize="sm" fontWeight="semibold" minWidth="100%">
          {format(new Date(expenseType.createdAt), 'dd MMM yyyy')}
        </Text>
      </Td>
    </Tr>
  );
};
