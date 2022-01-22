import React from 'react';
import { Stack } from '@chakra-ui/react';
import DashboardLayout from '../layouts/DashboardLayout';
import ReportSummary from '../components/ReportSummary';
import ExportExpenses from '../components/ExportExpenses';

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <Stack gap={4}>
        <ReportSummary />
        <ExportExpenses />
      </Stack>
    </DashboardLayout>
  );
};

export default ReportsPage;
