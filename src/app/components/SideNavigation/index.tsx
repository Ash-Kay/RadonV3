import React from "react";
import { useStyletron } from "baseui";

interface Props {}

const SideNavigation = (props: Props) => {
    const [css] = useStyletron();

    const containerStyles = css({});

    return <nav className={containerStyles}> SIDE MENU</nav>;
};

export default SideNavigation;
