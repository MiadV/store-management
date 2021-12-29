import { extendTheme, StyleProps, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,

    styles: {
        global: (props: StyleProps) => ({
            body: {
                color: mode("gray.700", "whiteAlpha.900")(props),
            },
        }),
    },
});

export default theme;
