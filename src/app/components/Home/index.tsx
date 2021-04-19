import React from "react";
import HomeFeed from "../HomeFeed";
import { Box } from "theme-ui";
import { withRouter } from "react-router-dom";

const Home: React.FC = () => {
    const mainDivStyle = {
        maxWidth: "550px",
    };
    const mainFlexDivStyle = {
        display: "flex",
        justifyContent: "center",
        paddingTop: "54px",
        gridColumnGap: "1rem",
        backgroundColor: "secondaryDark",
    };

    return (
        <Box sx={mainFlexDivStyle}>
            <Box sx={mainDivStyle}>
                <HomeFeed />
            </Box>
        </Box>
    );
};

export default withRouter(Home);
