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
                    variant: null,
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
                    variant: null,
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
                    variant: null,
                },
            },
        },
        Select: {
            variants: {
                outline: ({ colorMode }: { colorMode: "dark" | "light" }) => ({
                    field: {
                        bg: colorMode === "dark" ? "gray.700" : "white",
                    },
                }),
                sizes: {},
                variants: {},
                defaultProps: {
                    variant: null,
                },
            },
        },
        Progress: {
            variants: {
                outline: () => ({
                    track: {
                        bg: "teal.200",
                        border: "1px",
                        borderRadius: "5px",
                    },
                    filledTrack: {
                        bg: "teal.800",
                    },
                }),
                sizes: {},
                variants: {},
                defaultProps: {
                    variant: null,
                },
            },
        },
    },
});

export default theme;
