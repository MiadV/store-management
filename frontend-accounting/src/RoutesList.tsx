import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthContext } from './context/authContext';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import NotFound from './pages/NotFound';
import ShopExpenseRulesTable from './pages/ShopExpenseRulesPage';
import ExpenseList from './pages/ExpenseListPage';
import ExpenseTypesPage from './pages/ExpenseTypesPage';
import SalesPage from './pages/SalesPage';
import ReportsPage from './pages/ReportsPage';

const RoutesList = () => {
  const queryClient = useQueryClient();

  // check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem(`${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-token`);
    if (token) {
      (async function fetchAuthUser() {
        // get logged user
        await queryClient.refetchQueries('auth', { exact: true });
      })();
    }
  }, [queryClient]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateOutlet />}>
        <Route index element={<DashboardPage />} />

        <Route path="sales" element={<SalesPage />} />

        <Route path="expenses" element={<ExpenseList />} />
        <Route path="expenses/type" element={<ExpenseTypesPage />} />
        <Route path="expenses/shop-rules" element={<ShopExpenseRulesTable />} />

        <Route path="reports" element={<ReportsPage />} />

        <Route path="users" element={<UsersPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesList;

function PrivateOutlet() {
  let { authUser } = useAuthContext();
  let location = useLocation();

  if (!authUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
