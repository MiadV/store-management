import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import ShopExpenseRulesTable from '../components/ShopExpenseRulesTable';

const ShopExpenseRulesPage = () => {
  return (
    <DashboardLayout>
      <ShopExpenseRulesTable />
    </DashboardLayout>
  );
};

export default ShopExpenseRulesPage;
