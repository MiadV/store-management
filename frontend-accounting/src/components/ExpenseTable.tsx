import React, { useState, useEffect } from 'react';
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
  BiPlus,
} from 'react-icons/bi';
import {
  Box,
  Button,
  Flex,
  IconButton,
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
import { ExpenseReportType, PaginatedList } from '../types';
import { useShopsList } from '../hooks/ShopHooks';
import CustomDatePicker from './CustomDatePicker';
import useExpenseList from '../hooks/ExpenseHooks';
import { format } from 'date-fns';
import currencyFormat from '../util/currencyFormat';
import ExpenseForm from './ExpenseForm';
import ExpenseEditForm from './ExpenseEditForm';

const ExpenseTable = () => {
  const { isOpen: isAddFormOpen, onOpen: onAddFormOpen, onClose: onAddFormClose } = useDisclosure();
  const [editReport, setEditReport] = useState<ExpenseReportType | undefined>();
  const { data: shops, isLoading: shopsIsLoading } = useShopsList({
    staleTime: Infinity,
  });

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [filterShopId, setFilterShopId] = useState<number>(0);
  const [expenseList, setExpenseList] = useState<PaginatedList<ExpenseReportType> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useExpenseList({
    pageIndex: currentPage,
    shopId: filterShopId === 0 ? null : filterShopId,
    startDate: startDate,
    endDate: endDate,
    options: { keepPreviousData: true, staleTime: Infinity },
  });

  useEffect(() => {
    setExpenseList(data);
  }, [data, setExpenseList]);

  useEffect(() => {
    refetch();
    setCurrentPage(1);
  }, [refetch, filterShopId, dateRange, setCurrentPage]);

  function handleShopChange(val: string) {
    isNaN(parseInt(val)) ? setFilterShopId(0) : setFilterShopId(parseInt(val));
  }

  return (
    <>
      <Card overflowX={{ base: 'scroll', xl: 'hidden' }}>
        <Flex p={4} justifyContent="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">
            Expenses
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
        <Flex px={4} gap={4}>
          <Skeleton isLoaded={!shopsIsLoading}>
            <Select
              w={250}
              placeholder="All Shops"
              onChange={(e) => handleShopChange(e.target.value)}
            >
              {shops?.map((i) => (
                <option value={i.shopId} key={i.shopId}>
                  {i.title}
                </option>
              ))}
            </Select>
          </Skeleton>

          <CustomDatePicker
            // @ts-ignore
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            isClearable
            placeholderText="Filter by Date"
            maxDate={new Date()}
            onChange={(update: any) => {
              setDateRange(update);
            }}
          />
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
                  <Th color="gray.400">ID</Th>
                  <Th color="gray.400">Type</Th>
                  <Th color="gray.400">Date</Th>
                  <Th color="gray.400">Amount</Th>
                  <Th color="gray.400">Shop</Th>
                  <Th color="gray.400">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {expenseList?.data.map((row: ExpenseReportType) => {
                  return <TablesTableRow report={row} onEdit={setEditReport} key={row.expenseId} />;
                })}
              </Tbody>
            </Table>
          )}
        </Box>
        {expenseList && (
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
                isDisabled={expenseList.links.prev === null}
                onClick={() => setCurrentPage(currentPage - 1)}
                icon={<BiChevronLeft />}
              />
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              <Text mr={4}>
                Page <strong>{currentPage}</strong>{' '}
              </Text>
            </Flex>
            <Flex flexDirection="row">
              <IconButton
                ml={2}
                aria-label="Go to next page"
                isDisabled={expenseList.links.next === null}
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
      <Modal isOpen={isAddFormOpen} onClose={onAddFormClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxW={'sm'} p={8} justifyContent="center">
          <ModalCloseButton />
          <Text fontWeight={'semibold'} fontSize="xl">
            New expense report
          </Text>
          <Box px={8} py={4}>
            <ExpenseForm closeModal={onAddFormClose} />
          </Box>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={!!editReport}
        onClose={() => setEditReport(undefined)}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent maxW={'sm'} p={8} justifyContent="center">
          <ModalCloseButton />
          <Text fontWeight={'semibold'} fontSize="xl">
            Edit user form
          </Text>
          <Box px={8} py={4}>
            {editReport && (
              <ExpenseEditForm closeModal={() => setEditReport(undefined)} report={editReport} />
            )}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

const TablesTableRow: React.FC<{
  report: ExpenseReportType;
  onEdit: (report: ExpenseReportType) => void;
}> = ({ report, onEdit }) => {
  return (
    <Tr>
      <Td>
        <Text fontSize="md" minWidth="100%">
          {report.expenseId}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" fontWeight="semibold">
          {report.expenseType.title}
        </Text>
      </Td>
      <Td>
        <Text fontSize="sm" fontWeight="semibold">
          {format(new Date(report.reportDate), 'dd MMM yyyy')}
        </Text>
      </Td>
      <Td>
        <Text fontSize="sm" fontWeight="semibold">
          {currencyFormat(report.amount)}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" fontWeight="semibold">
          {report.shop?.title}
        </Text>
      </Td>

      <Td>
        <Flex gap={2}>
          <Button colorScheme="teal" variant="solid" size={'sm'}>
            View
          </Button>
          <Button size={'sm'} onClick={() => onEdit(report)}>
            Edit
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};

export default ExpenseTable;
