import React, { useState, useEffect } from 'react';
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
  BiPencil,
  BiPlus,
  BiSearch,
} from 'react-icons/bi';
import {
  Alert,
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
import { PaginatedList, SaleReportType } from '../types';
import { useShopsList } from '../hooks/ShopHooks';
import CustomDatePicker from './CustomDatePicker';
import { format } from 'date-fns';
import currencyFormat from '../util/currencyFormat';
import { useSaleList } from '../hooks/SaleHooks';
import SalesForm from './SalesForm';
import SalesEditForm from './SalesEditForm';
import SaleReportItem from './SaleReportItem';

const SalesTable = () => {
  const { isOpen: isAddFormOpen, onOpen: onAddFormOpen, onClose: onAddFormClose } = useDisclosure();
  const [viewReport, setViewReport] = useState<SaleReportType | undefined>();
  const [editReport, setEditReport] = useState<SaleReportType | undefined>();
  const { data: shops, isLoading: shopsIsLoading } = useShopsList({
    staleTime: Infinity,
  });
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [filterShopId, setFilterShopId] = useState<number>(0);
  const [salesList, setSalesList] = useState<PaginatedList<SaleReportType> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useSaleList({
    pageIndex: currentPage,
    shopId: filterShopId === 0 ? null : filterShopId,
    startDate: startDate,
    endDate: endDate,
    options: { keepPreviousData: true, staleTime: Infinity },
  });

  useEffect(() => {
    setSalesList(data);
  }, [data, setSalesList]);

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
            Sales
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
                  <Th color="gray.400">Date</Th>
                  <Th color="gray.400">Total</Th>
                  <Th color="gray.400">Shop</Th>
                  <Th color="gray.400">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {salesList?.data.map((row: SaleReportType) => {
                  return (
                    <TablesTableRow
                      report={row}
                      onEdit={setEditReport}
                      onView={setViewReport}
                      key={row.saleId}
                    />
                  );
                })}
              </Tbody>
            </Table>
          )}
        </Box>
        {salesList && (
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
                isDisabled={salesList.links.prev === null}
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
                isDisabled={salesList.links.next === null}
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
            New sales report
          </Text>
          <Box px={8} py={4}>
            <SalesForm closeModal={onAddFormClose} />
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
            Sales edit form
          </Text>
          <Alert mt={4} status="warning">
            Any edits will affect all previously generated reports.
          </Alert>

          <Box px={8} py={4}>
            {editReport && (
              <SalesEditForm closeModal={() => setEditReport(undefined)} report={editReport} />
            )}
          </Box>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={!!viewReport}
        onClose={() => setViewReport(undefined)}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent maxW={'md'} p={8} justifyContent="center">
          <ModalCloseButton />

          <Box px={8} py={4}>
            {viewReport && <SaleReportItem report={viewReport} />}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

const TablesTableRow: React.FC<{
  report: SaleReportType;
  onEdit: (report: SaleReportType) => void;
  onView: (report: SaleReportType) => void;
}> = ({ report, onEdit, onView }) => {
  return (
    <Tr>
      <Td>
        <Text fontSize="md" minWidth="100%">
          {report.saleId}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" fontWeight="semibold">
          {format(new Date(report.reportDate), 'dd MMM yyyy')}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" fontWeight="semibold">
          {currencyFormat(report.TotalAmount)}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" fontWeight="semibold">
          {report.shop?.title}
        </Text>
      </Td>

      <Td>
        <Flex gap={2}>
          <IconButton
            colorScheme="teal"
            size={'sm'}
            aria-label="View report"
            icon={<BiSearch />}
            onClick={() => onView(report)}
          />
          <IconButton
            size={'sm'}
            aria-label="Edit report"
            icon={<BiPencil />}
            onClick={() => onEdit(report)}
          />
        </Flex>
      </Td>
    </Tr>
  );
};

export default SalesTable;
