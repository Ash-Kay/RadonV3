import React from "react";
import HomeFeed from "../HomeFeed";
import SideNavigation from "../SideNavigation";
import { Box } from "rebass";

interface Props {}

const Home = (props: Props) => {
    const sideNavStyle = {
        width: "20rem",
        backgroundColor: "#f1f1f1",
        display: ["none", "none", "block"],
    };
    const mainDivStyle = {
        maxWidth: "550px",
    };
    const mainFlexDivStyle = {
        display: "flex",
        justifyContent: "center",
        paddingTop: "66px",
        gridColumnGap: "1rem",
        backgroundColor: "white",
    };

    return (
        <Box sx={mainFlexDivStyle}>
            <Box sx={sideNavStyle}>
                <SideNavigation />
            </Box>
            <Box sx={mainDivStyle}>
                <HomeFeed />
            </Box>
            <Box sx={sideNavStyle}>
                <SideNavigation />
            </Box>
        </Box>
    );
};

export default Home;