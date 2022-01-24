import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import SalesPage from "./pages/Sales";
import NewSalesReport from "./pages/NewSalesReport";
import SaleReport from "./pages/SaleReport";
import ExpensesPage from "./pages/Expenses";
import NewExpenseReport from "./pages/NewExpenseReport";
import ExpenseReport from "./pages/ExpenseReport";
import ExpenseList from "./pages/ExpenseList";
import ReportHistory from "./pages/ReportHistory";
import ReportHistorySummary from "./pages/ReportHistorySummary";
import { useAuthContext } from "./context/authContext";
import SalesList from "./pages/SalesList";

const RoutesList = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateOutlet />}>
                <Route index element={<Dashboard />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/sales/new" element={<NewSalesReport />} />
                <Route path="/sales/list" element={<SalesList />} />
                <Route
                    path="/sales/report/:reportId"
                    element={<SaleReport />}
                />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/expenses/new" element={<NewExpenseReport />} />
                <Route path="/expenses/list" element={<ExpenseList />} />
                <Route
                    path="/expenses/report/:reportId"
                    element={<ExpenseReport />}
                />

                <Route path="/history" element={<ReportHistory />} />
                <Route
                    path="/history/summary/:storeId/:date"
                    element={<ReportHistorySummary />}
                />
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
