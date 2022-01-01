import {
    extendTheme,
    StyleProps,
    ThemeConfig,
    theme as base,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    fonts: {
        heading: `Inter, ${base.fonts.heading}`,
        body: `Inter, ${base.fonts.body}`,
    },
    styles: {
        global: (props: StyleProps) => ({
            body: {
                color: mode("gray.700", "whiteAlpha.900")(props),
            },
        }),
    },
});

export default theme;
