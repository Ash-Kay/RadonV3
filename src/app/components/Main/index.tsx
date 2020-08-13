import React from "react";
import MainContent from "../MainContent";
import { BlockProps, Block } from "baseui/block";
import SideNavigation from "../SideNavigation";
import { useStyletron } from "baseui";

interface Props {}

const Main = (props: Props) => {
    const [css, theme] = useStyletron();

    const sideNavStyle = css({
        width: "20rem",
        backgroundColor: "#e2e2e2",
    });
    const mainDivStyle = css({
        maxWidth: "45rem",
        width: "40rem",
    });
    const mainFlexDivStyle = css({
        justifyContent: "center",
        marginTop: "1rem",
        gridColumnGap: "1rem",
        display: "flex",
    });

    return (
        <div className={mainFlexDivStyle}>
            <div className={sideNavStyle}>
                <SideNavigation />
            </div>
            <div className={mainDivStyle}>
                <MainContent />
            </div>
            <div className={sideNavStyle}>
                <SideNavigation />
            </div>
        </div>
    );
};

export default Main;
