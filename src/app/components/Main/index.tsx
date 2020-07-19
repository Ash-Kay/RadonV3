import React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import MainContent from "../MainContent";
import { BlockProps } from "baseui/block";
import SideNavigation from "../SideNavigation";

interface Props {}

const Main = (props: Props) => {
    const sideNavFlexGridItemProps: BlockProps = {
        maxWidth: "16rem",
        backgroundColor: "#e2e2e2",
    };
    const mainContentFlexGridItemProps: BlockProps = {
        maxWidth: "25rem",
        minWidth: "20rem",
    };
    const flexGridItemProps: BlockProps = {
        justifyContent: "center",
        marginTop: "1rem",
        gridColumnGap: "1rem",
    };

    return (
        <FlexGrid flexGridColumnCount={[1, 3]} {...flexGridItemProps}>
            <FlexGridItem display={["none", "block"]} {...sideNavFlexGridItemProps}>
                <SideNavigation />
            </FlexGridItem>
            <FlexGridItem {...mainContentFlexGridItemProps}>
                <MainContent />
            </FlexGridItem>
            <FlexGridItem {...sideNavFlexGridItemProps}>
                <SideNavigation />
            </FlexGridItem>
        </FlexGrid>
    );
};

export default Main;
