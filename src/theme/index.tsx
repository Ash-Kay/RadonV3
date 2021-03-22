// default theme preset form @rebass/preset

export const theme = {
    colors: {
        text: "#ccc",

        primary: "#67b094",

        secondary: "#202020",
        secondaryDark: "#151515",
        secondaryLight: "#434a5b",
        secondaryText: "#000",

        gray: "#dddddf",
        defaultIcon: "#8f8f8f",
        commentBoxBackground: "#ededed",
        debugColorBackground: "rgba(255, 110, 110, 0)",

        //Vote
        voteDefault: "#8f8f8f",
        upvoteActive: "#347fe0",
        downvoteActive: "#9c1b1b",

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
        body: "Montserrat, sans-serif",
        heading: "Montserrat, inherit",
        monospace: "Montserrat, Menlo, monospace",
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1,
        heading: 1.25,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: {
        avatar: 48,
        iconSmall: 16,
        iconLarge: 24,
    },
    radii: {
        none: 0,
        default: 4,
        circle: 99999,
    },
    shadows: {
        card: "0 0 4px rgba(0, 0, 0, .125)",
    },
    breakpoints: ["30em", "45em", "64em"], // 480px, 720px, 1024px
    zIndices: {
        zero: "0",
        nav: "100",
        modal: "200",
        auto: "auto",
    },

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
            fontFamily: "body",
            fontSize: 2,
            fontWeight: "bold",
            color: "text",
            bg: "primary",
            borderRadius: "none",
            ":focus, :hover": {
                outlineWidth: 0,
                filter: "brightness(110%)",
            },
            cursor: "pointer",
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
            borderRadius: "circle",
            fontWeight: "body",
            bg: "primary",
            color: "black",
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
            boxSizing: "border-box",
            m: 0,
            p: 0,
        },
        img: {
            maxWidth: "100%",
            display: "block",
        },
        svg: {
            maxWidth: "100%",
            display: "block",
        },
    },
};

export default theme;
