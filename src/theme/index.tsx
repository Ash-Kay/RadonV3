import { createTheme, ThemeOptions } from "@material-ui/core/styles";

const commonProps = {
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
    shape: {
        borderRadius: 12,
    },
    overrides: {
        MuiListItemIcon: {
            root: {
                minWidth: "36px",
            },
        },
        MuiButton: {
            root: {
                textTransform: "none",
            },
        },
        MuiDropzonePreviewList: {
            root: {
                margin: 0,
                width: "100%",
            },
            imageContainer: {
                display: "block",
                maxWidth: "unset",
                flexBasis: "unset",
                padding: "0 !important",
                margin: "12px auto",
            },
            removeButton: {
                opacity: 1,
            },
        },
        MuiDropzoneArea: {
            root: {
                borderWidth: "2px",
            },
            text: {
                padding: "8px",
                marginTop: "0px",
            },
        },
        MuiCardHeader: {
            root: {
                alignItems: "flex-start",
            },
        },
        MuiCardActions: {
            root: {
                padding: 0,
            },
        },
    },
    props: {
        MuiTextField: {
            varient: "outlined",
            InputLabelProps: {
                shrink: true,
            },
        },
    },
};

const lightTheme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#67b094",
        },
        secondary: {
            main: "#ff5252",
        },
        error: {
            main: "#d50000",
        },
    },
    ...(commonProps as ThemeOptions),
});

const darkTheme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#67b094",
        },
        secondary: {
            main: "#ff5252",
        },
        background: {
            default: "#262731",
            paper: "#33333b",
        },
        error: {
            main: "#d50000",
        },
    },
    ...(commonProps as ThemeOptions),
});

export default { lightTheme, darkTheme };
