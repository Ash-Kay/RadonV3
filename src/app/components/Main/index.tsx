import React from "react";
import MainContent from "../MainContent";
import SideNavigation from "../SideNavigation";
import { Box } from "rebass";

interface Props {}

const Main = (props: Props) => {
    const sideNavStyle = {
        width: "20rem",
        backgroundColor: "#e2e2e2",
    };
    const mainDivStyle = {
        maxWidth: "45rem",
        width: "40rem",
    };
    const mainFlexDivStyle = {
        justifyContent: "center",
        marginTop: "1rem",
        gridColumnGap: "1rem",
        display: "flex",
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
