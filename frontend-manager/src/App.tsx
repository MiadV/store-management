import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import RoutesList from "./RoutesList";
import theme from "./theme";

export const App = () => (
    <BrowserRouter>
        <ChakraProvider theme={theme}>
            <RoutesList />
        </ChakraProvider>
    </BrowserRouter>
);
