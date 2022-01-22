import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Select,
  Skeleton,
  Text,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
} from '@chakra-ui/react';
import Card from './Card';
import CustomDatePicker from './CustomDatePicker';
import { useShopsList } from '../hooks/ShopHooks';
import ReportSummaryItem from './ReportSummaryItem';

const ReportSummary = () => {
  const { data: shops, isLoading: shopsIsLoading } = useShopsList({
    staleTime: Infinity,
  });
  const [showReport, setShowReport] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterShopId, setFilterShopId] = useState<number>(0);

  function handleShopChange(val: string) {
    isNaN(parseInt(val)) ? setFilterShopId(0) : setFilterShopId(parseInt(val));
  }

  return (
    <>
      <Card overflowX={{ base: 'scroll', xl: 'hidden' }} p={4}>
        <Text fontSize="xl" fontWeight="bold" mb={1}>
          Reports Summary
        </Text>
        <Text>Please note that report summary doesn't include "ACCOUNTANT ONLY" expenses.</Text>

        <Flex gap={4} mt={4}>
          <Skeleton isLoaded={!shopsIsLoading}>
            <Select
              w={250}
              placeholder="Select Shop"
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
            selected={selectedDate}
            isClearable
            placeholderText="Filter by Date"
            maxDate={new Date()}
            onChange={(update: any) => {
              setSelectedDate(update);
            }}
          />

          <Button
            colorScheme="teal"
            isDisabled={!(selectedDate && filterShopId)}
            onClick={() => setShowReport(true)}
          >
            View Summary
          </Button>
        </Flex>
      </Card>

      <Modal isOpen={!!showReport} onClose={() => setShowReport(false)} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxW={'md'} p={8} justifyContent="center">
          <ModalCloseButton />

          <Box px={8} py={4}>
            {showReport && filterShopId && selectedDate && (
              <ReportSummaryItem storeId={filterShopId} reportDate={selectedDate} />
            )}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportSummary;
