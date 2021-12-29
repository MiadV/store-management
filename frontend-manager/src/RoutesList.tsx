import React, { useEffect } from "react";
// import { useQueryClient } from "react-query";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import LoginPage from "./pages/Login";

const RoutesList = () => {
    // const queryClient = useQueryClient();

    // // check if user is already logged in
    // useEffect(() => {
    //     const isAuth = localStorage.getItem(
    //         `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-isAuth`
    //     );
    //     if (isAuth === "true") {
    //         (async function fetchAuthUser() {
    //             // get logged user
    //             await queryClient.refetchQueries("auth", { exact: true });
    //         })();
    //     }
    // }, [queryClient]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateOutlet />}>
                <Route path="about" element={<AboutPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default RoutesList;

function PrivateOutlet() {
    // let auth = useAuth();
    let location = useLocation();

    if (false) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Outlet />;
}

function AboutPage() {
    return <h3>AboutPage</h3>;
}

function NotFound() {
    return <h3>NotFound</h3>;
}
