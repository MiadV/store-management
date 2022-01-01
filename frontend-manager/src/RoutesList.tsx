import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

import LoginPage from "./pages/Login";
import SelectShop from "./pages/SelectShop";
import NotFound from "./pages/NotFound";
import StoreDashboard from "./pages/StoreDashboard";
import SalesPage from "./pages/Sales";

const RoutesList = () => {
    const queryClient = useQueryClient();

    // check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem(
            `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-token`
        );
        if (token) {
            (async function fetchAuthUser() {
                // get logged user
                await queryClient.refetchQueries("auth", { exact: true });
            })();
        }
    }, [queryClient]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateOutlet />}>
                <Route index element={<SelectShop />} />
                <Route path="/store/:storeId" element={<StoreDashboard />} />
                <Route path="/sales/:storeId" element={<SalesPage />} />
                {/* <Route path="/expenses/:storeId" element={<StoreDashboard />} /> */}
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default RoutesList;

function PrivateOutlet() {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.data) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Outlet />;
}
