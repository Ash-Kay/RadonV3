import React from "react";
import MainContent from "../MainContent";
import SideNavigation from "../SideNavigation";
import { Box } from "rebass";

interface Props {}

const Main = (props: Props) => {
    const sideNavStyle = {
        width: "20rem",
        backgroundColor: "#e2e2e2",
        display: ["none", "none", "block"],
    };
    const mainDivStyle = {
        maxWidth: "550px",
    };
    const mainFlexDivStyle = {
        display: "flex",
        justifyContent: "center",
        paddingTop: "1rem",
        gridColumnGap: "1rem",
        backgroundColor: "globalBackground",
    };

    return (
        <Box sx={mainFlexDivStyle}>
            <Box sx={sideNavStyle}>
                <SideNavigation />
            </Box>
            <Box sx={mainDivStyle}>
                <MainContent />
            </Box>
            <Box sx={sideNavStyle}>
                <SideNavigation />
            </Box>
        </Box>
    );
};

export default Main;
