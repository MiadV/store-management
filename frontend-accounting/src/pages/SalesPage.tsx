import React from 'react';
import SalesTable from '../components/SalesTable';
import DashboardLayout from '../layouts/DashboardLayout';

const SalesPage = () => {
  return (
    <DashboardLayout>
      <SalesTable />
    </DashboardLayout>
  );
};

export default SalesPage;
