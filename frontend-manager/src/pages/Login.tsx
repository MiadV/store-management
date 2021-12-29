import React from "react";
import { Spinner } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import SimpleLayout from "../layouts/SimpleLayout";
// import useAuth from "../hooks/useAuth";

const LoginPage = () => {
    // const authState = useAuth();
    // if (authState.isLoading) {
    //     return (
    //         <SimpleLayout>
    //             <Spinner
    //                 thickness="4px"
    //                 speed="0.65s"
    //                 emptyColor="gray.200"
    //                 color="brand.300"
    //                 size="xl"
    //             />
    //         </SimpleLayout>
    //     );
    // }
    // return !authState.data ? (
    //     <SimpleLayout>
    //         <LoginForm />
    //     </SimpleLayout>
    // ) : null;

    return (
        <SimpleLayout>
            <LoginForm />
        </SimpleLayout>
    );
};
export default LoginPage;
