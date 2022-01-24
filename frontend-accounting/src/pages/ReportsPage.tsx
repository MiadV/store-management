import React from 'react';
import { Stack } from '@chakra-ui/react';
import DashboardLayout from '../layouts/DashboardLayout';
import ReportSummary from '../components/ReportSummary';
import ExportExpenses from '../components/ExportExpenses';
import ExportSales from '../components/ExportSales';

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <Stack gap={4}>
        <ReportSummary />
        <ExportExpenses />
        <ExportSales />
      </Stack>
    </DashboardLayout>
  );
};

export default ReportsPage;
