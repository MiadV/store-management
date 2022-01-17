import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import ExpenseTypesTable from '../components/ExpenseTypesTable';

const ExpenseTypesPage = () => {
  return (
    <DashboardLayout>
      <ExpenseTypesTable />
    </DashboardLayout>
  );
};

export default ExpenseTypesPage;
