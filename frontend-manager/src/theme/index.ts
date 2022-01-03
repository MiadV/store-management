import { extendTheme, ThemeConfig, theme as base } from "@chakra-ui/react";

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
    components: {
        Input: {
            variants: {
                outline: ({ colorMode }: { colorMode: "dark" | "light" }) => ({
                    field: {
                        bg: colorMode === "dark" ? "gray.700" : "white",
                    },
                }),
                sizes: {},
                variants: {},
                defaultProps: {
                    variant: null, // null here
                },
            },
        },
        NumberInput: {
            variants: {
                outline: ({ colorMode }: { colorMode: "dark" | "light" }) => ({
                    field: {
                        bg: colorMode === "dark" ? "gray.700" : "white",
                    },
                }),
                sizes: {},
                variants: {},
                defaultProps: {
                    variant: null, // null here
                },
            },
        },
        Textarea: {
            variants: {
                outline: ({ colorMode }: { colorMode: "dark" | "light" }) => ({
                    bg: colorMode === "dark" ? "gray.700" : "white",
                }),
                sizes: {},
                variants: {},
                defaultProps: {
                    variant: null, // null here
                },
            },
        },
    },
});

export default theme;
