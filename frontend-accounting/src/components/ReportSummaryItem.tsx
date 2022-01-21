import React from 'react';
import { AlertIcon, Box, Flex, Spinner, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import ReportHistoryIcon from '../assets/vectors/ReportHistoryIcon';
import currencyFormat from '../util/currencyFormat';
import { useReportSummaryByDate } from '../hooks/ReportsHooks';
import { ReportSummaryType, ResponseErrorType } from '../types';

const ReportSummaryItem: React.FC<{ storeId: number; reportDate: Date }> = ({
  storeId,
  reportDate,
}) => {
  const {
    data: reportHistorySummary,
    isLoading,
    error,
  } = useReportSummaryByDate(storeId, reportDate, {
    staleTime: Infinity,
    enabled: !!(storeId && reportDate),
    retry: 0,
  });

  if (isLoading) {
    return (
      <Box maxH="100px" position={'relative'}>
        <Flex justifyContent={'center'} align={'center'}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.300" size="xl" />
        </Flex>
      </Box>
    );
  }
  if (error) {
    return (
      <Text>
        {(error as ResponseErrorType).response.data.errors.message[0] ??
          'Something went wrong. try again.'}
      </Text>
    );
  }

  return <ReportSummary report={reportHistorySummary!} />;
};

export default ReportSummaryItem;

const ReportSummary: React.FC<{ report: ReportSummaryType }> = ({ report }) => {
  const bgColor = useColorModeValue('gray.200', 'gray.700');

  const { saleReport, expenseReports, sumOfExpenses, balance } = report;
  return (
    <Box>
      <Flex justifyContent="center" marginTop={8} marginBottom={2}>
        <Flex
          bg="green.400"
          width="130px"
          height="130px"
          borderRadius="100%"
          justifyContent="center"
          alignItems="center"
        >
          <ReportHistoryIcon fill="white" width="80px" height="80px" />
        </Flex>
      </Flex>
      <Flex justifyContent="center" direction="column" marginBottom={2}>
        <Flex justifyContent={'center'}>
          <Text fontWeight={'bold'} fontSize="large">
            {saleReport.shop?.title}
          </Text>
        </Flex>
        <Flex justifyContent={'center'}>
          <Text fontWeight={'bold'} fontSize="md">
            {format(new Date(saleReport.reportDate), 'dd MMMM yyyy')}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" textAlign="center" padding={4} borderRadius={8} bg={bgColor}>
        <Flex direction="column" gap={1}>
          <Flex justifyContent={'center'} borderBottom="1px">
            <Text fontWeight={'semibold'}>Sales</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Cash</Text>
            <Text>{currencyFormat(saleReport.cashAmount)}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Card</Text>
            <Text>{currencyFormat(saleReport.cardAmount)}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Online Transfer</Text>
            <Text>{currencyFormat(saleReport.onlineTransferAmount)}</Text>
          </Flex>

          <Flex justifyContent={'space-between'} borderTop="1px">
            <Text fontWeight={'semibold'}>Total</Text>
            <Text fontWeight={'semibold'}>{currencyFormat(saleReport.TotalAmount)}</Text>
          </Flex>
          <Flex justifyContent={'center'} borderBottom="1px" marginTop={2}>
            <Text fontWeight={'semibold'}>Expenses</Text>
          </Flex>
          {expenseReports.map((item) => (
            <Flex justifyContent={'space-between'} key={item.expenseId}>
              <Text>{item.expenseType.title}</Text>
              <Text>{currencyFormat(item.amount)}</Text>
            </Flex>
          ))}

          <Flex justifyContent={'space-between'} borderTop="1px">
            <Text fontWeight={'semibold'}>Total</Text>
            <Text fontWeight={'semibold'}>{currencyFormat(sumOfExpenses)}</Text>
          </Flex>
          <Flex justifyContent={'space-between'} borderBottom="1px" borderTop="1px" marginTop={2}>
            <Text fontWeight={'semibold'}>Balance</Text>
            <Text fontWeight={'semibold'} color={balance >= 0 ? '' : 'red'}>
              {currencyFormat(balance)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
