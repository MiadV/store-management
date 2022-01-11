import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import RoutesList from "./RoutesList";
import theme from "./theme";

import "./theme/style.css";

// Create a client
const queryClient = new QueryClient();

export const App = () => (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <RoutesList />
            </ChakraProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
