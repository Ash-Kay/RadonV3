import React from "react";
import { useStyletron } from "baseui";
import { StyledLink } from "baseui/link";
import { Unstable_AppNavBar as AppNavBar } from "baseui/app-nav-bar";
import { Overflow as UserIcon, Upload as Icon } from "baseui/icon";

interface Props {}

const Navbar = (props: Props) => {
    const [css] = useStyletron();

    const containerStyles = css({
        width: "100vw",
    });

    return (
        <header className={containerStyles}>
            <AppNavBar
                appDisplayName={appDisplayName}
                mainNav={MAIN_NAV_ITEMS}
                isNavItemActive={({ item }) => {
                    return false;
                }}
                onNavItemSelect={({ item }) => {}}
                userNav={USER_NAV_ITEMS}
                username="Ashish Kumar"
                usernameSubtitle="5.0"
                userImgUrl=""
            />
        </header>
    );
};

export default Navbar;

const appDisplayName = (
    <StyledLink
        $style={{
            textDecoration: "none",
            color: "inherit",
            ":hover": { color: "inherit" },
            ":visited": { color: "inherit" },
        }}
        href={"#"}
    >
        RadonV3
    </StyledLink>
);

const MAIN_NAV_ITEMS = [
    {
        icon: Icon,
        item: { label: "Primary alpha1" },
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
    },
    {
        icon: Icon,
        item: { label: "Primary alpha2" },
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
    },
];

function renderItem(item: any) {
    return item.label;
}

const USER_NAV_ITEMS = [
    {
        icon: UserIcon,
        item: { label: "Dark Mode" },
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
    },
    {
        icon: UserIcon,
        item: { label: "Settings" },
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
    },
];
