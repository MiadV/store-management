import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { format } from 'date-fns';
import SalesIcon from '../assets/vectors/SalesIcon';
import { SaleReportType } from '../types';
import currencyFormat from '../util/currencyFormat';

const SaleReportItem: React.FC<{ report: SaleReportType }> = ({ report }) => {
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const {
    reportDate,
    shop,
    cardAmount,
    cashAmount,
    onlineTransferAmount,
    TotalAmount,
    description,
    user,
    updatedAt,
    createdAt,
  } = report;

  return (
    <Box>
      <Flex justifyContent="center" marginBottom={2}>
        <Flex
          bg="green.400"
          width="130px"
          height="130px"
          borderRadius="100%"
          justifyContent="center"
          alignItems="center"
        >
          <SalesIcon fill="white" width="80px" />
        </Flex>
      </Flex>
      <Flex justifyContent="center" direction="column" marginBottom={2}>
        <Flex justifyContent={'center'}>
          <Text fontWeight={'bold'} fontSize="large">
            {shop?.title}
          </Text>
        </Flex>
        <Flex justifyContent={'center'}>
          <Text fontWeight={'bold'} fontSize="md">
            {format(new Date(reportDate), 'dd MMMM yyyy')}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" textAlign="center" padding={4} borderRadius={8} bg={bgColor}>
        <Flex direction="column" gap={1}>
          <Flex justifyContent={'space-between'}>
            <Text>Cash</Text>
            <Text>{currencyFormat(cashAmount)}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Card</Text>
            <Text>{currencyFormat(cardAmount)}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Online Transfer</Text>
            <Text>{currencyFormat(onlineTransferAmount)}</Text>
          </Flex>
          <Flex justifyContent={'space-between'} borderTop="1px" borderBottom="1px">
            <Text fontWeight={'semibold'}>Total Sale</Text>
            <Text fontWeight={'semibold'}>{currencyFormat(TotalAmount)}</Text>
          </Flex>

          {description && (
            <Flex direction={'column'}>
              <Text fontWeight={'bold'}>Notes</Text>
              <Text alignSelf={'start'}>{description}</Text>
            </Flex>
          )}

          <Flex justifyContent={'space-between'} fontSize={'sm'} marginTop={2}>
            <Text>Submitted by</Text>
            <Text>{user?.name}</Text>
          </Flex>
          <Flex justifyContent={'space-between'} fontSize={'sm'}>
            <Text>Last Edit</Text>
            <Text> {format(new Date(updatedAt || createdAt), 'dd MMM yyyy @ H:m:s')}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SaleReportItem;
