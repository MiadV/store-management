import React, { useEffect } from "react";
import { FaSleigh } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/Login";

const RoutesList = () => {
    const queryClient = useQueryClient();

    // check if user is already logged in
    useEffect(() => {
        const isAuth = localStorage.getItem(
            `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-token`
        );
        if (isAuth) {
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
                <Route index element={<IndexPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default RoutesList;

function PrivateOutlet() {
    let auth = useAuth();
    let location = useLocation();

    if (!auth) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Outlet />;
}

function IndexPage() {
    return <h3>Index Page</h3>;
}

function NotFound() {
    return <h3>NotFound</h3>;
}
