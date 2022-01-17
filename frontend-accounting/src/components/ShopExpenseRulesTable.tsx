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
  Select,
  Skeleton,
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
import Card from './Card';
import { ExpenseRuleType } from '../types';
import { useShopsList } from '../hooks/ShopHooks';
import { useExpenseTypeListByStoreId } from '../hooks/ExpenseTypeHooks';
import currencyFormat from '../util/currencyFormat';
import { format } from 'date-fns';
import AssignExpenseTypeForm from './AssignExpenseTypeForm';

const ShopExpenseRulesTable = () => {
  const { isOpen: isAddFormOpen, onOpen: onAddFormOpen, onClose: onAddFormClose } = useDisclosure();
  const { data: shops, isLoading: shopsIsLoading } = useShopsList({
    staleTime: Infinity,
  });
  const [currentShopId, setCurrentShopId] = useState<number>(0);
  const [expenseTypesList, setExpenseTypesList] = useState<ExpenseRuleType[] | undefined>();
  const { data, isFetching } = useExpenseTypeListByStoreId({
    storeId: currentShopId,
    options: { keepPreviousData: true, staleTime: Infinity, enabled: currentShopId !== 0 },
  });

  useEffect(() => {
    setExpenseTypesList(data);
  }, [data, setExpenseTypesList]);

  function handleShopChange(val: string) {
    isNaN(parseInt(val)) ? setCurrentShopId(0) : setCurrentShopId(parseInt(val));
  }

  return (
    <>
      <Card overflowX={{ base: 'scroll', xl: 'hidden' }}>
        <Flex p={4} justifyContent="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">
            Shop Expense Rules
          </Text>

          <Button
            colorScheme="teal"
            variant="outline"
            size="sm"
            disabled={!currentShopId}
            leftIcon={<BiPlus size={18} />}
            onClick={onAddFormOpen}
          >
            Assing Rule
          </Button>
        </Flex>
        <Box maxW="sm" px={4}>
          <Skeleton isLoaded={!shopsIsLoading}>
            <Select placeholder="Select Shop" onChange={(e) => handleShopChange(e.target.value)}>
              {shops?.map((i) => (
                <option value={i.shopId} key={i.shopId}>
                  {i.title}
                </option>
              ))}
            </Select>
          </Skeleton>
        </Box>

        <Box p={4}>
          {!currentShopId ? (
            <Text fontWeight={'semibold'} textAlign={'center'}>
              No shop is selected !
            </Text>
          ) : isFetching ? (
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
                  <Th color="gray.400">Limit</Th>
                  <Th color="gray.400">Strict</Th>
                  <Th color="gray.400">Scope</Th>
                  <Th color="gray.400">Created at</Th>
                </Tr>
              </Thead>
              <Tbody>
                {expenseTypesList?.map((row: ExpenseRuleType) => {
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
            Assign expense type
          </Text>
          <Box px={8} py={4}>
            <AssignExpenseTypeForm closeModal={onAddFormClose} shopId={currentShopId} />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ShopExpenseRulesTable;

const TablesTableRow: React.FC<{ expenseType: ExpenseRuleType }> = ({ expenseType }) => {
  return (
    <Tr>
      <Td>
        <Text fontSize="sm" fontWeight="semibold" minWidth="100%">
          {expenseType.title}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" fontWeight="semibold" minWidth="100%">
          {expenseType.limitAmount ? currencyFormat(expenseType.limitAmount) : '-'}
        </Text>
      </Td>
      <Td>{expenseType.isLimitStrict ? '✅' : ' '}</Td>
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
