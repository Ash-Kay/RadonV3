// default theme preset form @rebass/preset

export const theme = {
    colors: {
        text: "#000",
        background: "#fff",
        foreground: "#fff",
        primary: "#07c",
        secondary: "#30c",
        muted: "#f6f6f9",
        gray: "#dddddf",
        highlight: "hsla(205, 100%, 40%, 0.125)",
        card: "#fff",
        defaultIcon: "#8f8f8f",
        commentBoxBackground: "#ededed",

        //Vote
        voteDefault: "#8f8f8f",
        upvoteActive: "#347fe0",
        downvoteActive: "#9c1b1b",
        actionBarIconHighlightBackground: "#cccccc",

        modes: {
            dark: {
                text: "#fff",
                background: "#12181b",
                foreground: "#242e33",
                primary: "#0cf",
                commentBoxBackground: "#242e33",

                //Vote
                voteDefault: "#8f8f8f",
                upvoteActive: "#347fe0",
                downvoteActive: "#9c1b1b",
                actionBarIconHighlightBackground: "#394950",
            },
        },

        upvote: {
            default: "#464646",
            active: "#347fe0",
        },
        downvote: {
            default: "#464646",
            active: "#9c1b1b",
        },
    },
    fonts: {
        body: "system-ui, sans-serif",
        heading: "inherit",
        monospace: "Menlo, monospace",
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: {
        avatar: 48,
    },
    radii: {
        default: 4,
        circle: 99999,
    },
    shadows: {
        card: "0 0 4px rgba(0, 0, 0, .125)",
    },
    breakpoints: ["30em", "45em", "64em"], // 480px, 720px, 1024px

    // rebass variants
    text: {
        heading: {
            fontFamily: "heading",
            lineHeight: "heading",
            fontWeight: "heading",
        },
        display: {
            fontFamily: "heading",
            fontWeight: "heading",
            lineHeight: "heading",
            fontSize: [5, 6, 7],
        },
        caps: {
            textTransform: "uppercase",
            letterSpacing: "0.1em",
        },
    },
    variants: {
        avatar: {
            width: "avatar",
            height: "avatar",
            borderRadius: "circle",
        },
        card: {
            p: 2,
            bg: "background",
            boxShadow: "card",
        },
        link: {
            color: "primary",
        },
        nav: {
            fontSize: 1,
            fontWeight: "bold",
            display: "inline-block",
            p: 2,
            color: "inherit",
            textDecoration: "none",
            ":hover,:focus,.active": {
                color: "primary",
            },
        },
    },
    buttons: {
        primary: {
            fontSize: 2,
            fontWeight: "bold",
            color: "background",
            bg: "primary",
            borderRadius: "default",
            ":focus": {
                outlineWidth: 0,
                filter: "brightness(120%)",
            },
            ":hover": {
                filter: "brightness(120%)",
            },
        },
        outline: {
            variant: "buttons.primary",
            color: "primary",
            bg: "transparent",
            boxShadow: "inset 0 0 2px",
        },
        secondary: {
            variant: "buttons.primary",
            color: "background",
            bg: "secondary",
            ":focus": {
                outlineWidth: 0,
                filter: "brightness(120%)",
            },
            ":hover": {
                filter: "brightness(120%)",
            },
        },
        nav: {
            variant: "buttons.primary",
            p: "0.2rem 0.5rem",
            mx: "0.5rem",
            height: "30px",
        },
        navOutline: {
            variant: "buttons.outline",
            p: "0.2rem 0.5rem",
            mx: "0.5rem",
            height: "30px",
        },
    },
    input: {
        ":focus": {
            outlineWidth: 0,
            "::placeholder": {
                opacity: 0.4,
            },
        },
    },
    styles: {
        root: {
            fontFamily: "body",
            fontWeight: "body",
            lineHeight: "body",
        },
        button: {
            cursor: "pointer",
        },
    },
};

export default theme;
