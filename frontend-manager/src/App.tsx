import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import LoadingOverlay from "./components/LoadingOverlay";
import { useAuthContext } from "./context/authContext";
import useAuth from "./hooks/useAuth";

import RoutesList from "./RoutesList";

export const App = () => {
    const queryClient = useQueryClient();
    const auth = useAuth();
    const { setAuthUser } = useAuthContext();

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

    useEffect(() => {
        if (auth.data) {
            setAuthUser(auth.data);
        }
    }, [auth, setAuthUser]);

    if (auth.isLoading) return <LoadingOverlay />;

    return <RoutesList />;
};
