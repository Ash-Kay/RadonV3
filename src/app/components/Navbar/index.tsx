import React from "react";
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import { Button } from "baseui/button";
import { Avatar } from "baseui/avatar";
import { authService } from "../../state/auth/auth.service";
import { useAuthStateHook } from "../../state/auth/auth.hook";
import CreatePostButton from "../CreatePostButton";
import RegisterLoginModal from "../RegisterLoginModal";

interface Props {}

const Navbar = (props: Props) => {
    const [authState] = useAuthStateHook();

    return (
        <>
            <HeaderNavigation
                overrides={{
                    Root: {
                        style: {
                            paddingLeft: "2rem",
                            paddingRight: "2rem",
                        },
                    },
                }}
            >
                <NavigationList $align={ALIGN.left}>
                    <NavigationItem>
                        <h3>RadonV3</h3>
                    </NavigationItem>
                </NavigationList>
                <NavigationList $align={ALIGN.center} />
                <NavigationList $align={ALIGN.right}>
                    {authState.isLoggedIn && <CreatePostButton authState={authState} />}
                    {authState.isLoggedIn && (
                        <NavigationItem>
                            <Button onClick={authService.logout}>Logout</Button>
                        </NavigationItem>
                    )}
                    {!authState.isLoggedIn && <RegisterLoginModal />}
                    {authState.isLoggedIn && (
                        <NavigationItem>
                            <Avatar name={authState.username} size="40px" src={""} />
                        </NavigationItem>
                    )}
                </NavigationList>
            </HeaderNavigation>
        </>
    );
};

export default Navbar;
