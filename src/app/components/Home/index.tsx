import React from "react";
import HomeFeed from "../HomeFeed";
import { Box, ThemeUIStyleObject } from "theme-ui";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home: React.FC = () => {
    const mainDivStyle = {
        maxWidth: "550px",
    };
    const mainFlexDivStyle: ThemeUIStyleObject = {
        display: "flex",
        justifyContent: "center",
        paddingTop: "54px",
        gridColumnGap: "1rem",
        backgroundColor: "secondaryDark",
        minHeight: "100vh",
    };

    const title = "Memenese: The language of Memes";
    const description = "Create, Share and Enjoy Memes";
    const imageUrl = "https://memenese.com/apple-touch-icon.png";

    return (
        <Box sx={mainFlexDivStyle}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Memenese</title>

                {/* <!-- Google / Search Engine Tags --> */}
                <meta itemProp="name" content={title} />
                <meta itemProp="description" content={description} />
                <meta itemProp="image" content={imageUrl} />
                <link rel="canonical" href={window.location.href} />

                {/* <!-- Facebook Meta Tags --> */}
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />

                {/* <!-- Twitter Meta Tags --/> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />
            </Helmet>

            <Box sx={mainDivStyle}>
                <HomeFeed />
            </Box>
        </Box>
    );
};

export default withRouter(Home);
