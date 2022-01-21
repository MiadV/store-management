import React from 'react';
import { Stack } from '@chakra-ui/react';
import DashboardLayout from '../layouts/DashboardLayout';
import ReportSummary from '../components/ReportSummary';

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <Stack gap={4}>
        <ReportSummary />
      </Stack>
    </DashboardLayout>
  );
};

export default ReportsPage;
