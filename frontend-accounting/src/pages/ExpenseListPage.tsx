import React from 'react';
import ExpenseTable from '../components/ExpenseTable';
import DashboardLayout from '../layouts/DashboardLayout';

const ExpenseList = () => {
  return (
    <DashboardLayout>
      <ExpenseTable />
    </DashboardLayout>
  );
};

export default ExpenseList;
