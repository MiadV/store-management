import React, { useState } from 'react';
import { Flex, IconButton, Select, Skeleton, Text } from '@chakra-ui/react';
import { RiFileExcel2Line } from 'react-icons/ri';
import fileDownload from 'js-file-download';
import Card from './Card';
import CustomDatePicker from './CustomDatePicker';
import { useShopsList } from '../hooks/ShopHooks';
import { downloadExpenses } from '../hooks/ExpenseHooks';

const ExportExpenses = () => {
  const { data: shops, isLoading: shopsIsLoading } = useShopsList({
    staleTime: Infinity,
  });
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [filterShopId, setFilterShopId] = useState<number | null>(null);

  function handleShopChange(val: string) {
    isNaN(parseInt(val)) ? setFilterShopId(null) : setFilterShopId(parseInt(val));
  }

  async function handleDownloadExpenses() {
    await downloadExpenses({
      shopId: filterShopId,
      startDate: startDate,
      endDate: endDate,
    }).then((res) => {
      fileDownload(res.data, 'expenses.xlsx');
    });
  }

  return (
    <>
      <Card overflowX={{ base: 'scroll', xl: 'hidden' }} p={4}>
        <Text fontSize="xl" fontWeight="bold" mb={1}>
          Export Expenses
        </Text>

        <Flex gap={4} mt={4}>
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

          <IconButton
            colorScheme="teal"
            isDisabled={!(startDate && endDate)}
            onClick={() => handleDownloadExpenses()}
            icon={<RiFileExcel2Line size={24} />}
            aria-label="download as excel file"
          />
        </Flex>
      </Card>
    </>
  );
};

export default ExportExpenses;
