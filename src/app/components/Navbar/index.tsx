import React from "react";
import { StyledLink } from "baseui/link";
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import { Button } from "baseui/button";
import { Avatar } from "baseui/avatar";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from "baseui/modal";
import GoogleLogin from "react-google-login";
import { authService } from "../../state/auth/auth.service";
import { useAuthStateHook } from "../../state/auth/auth.hook";

interface Props {}

const Navbar = (props: Props) => {
    const [authState] = useAuthStateHook();
    const [isSignInModalOpen, setSignInModalOpen] = React.useState(false);

    const closeSignInModal = () => {
        setSignInModalOpen(false);
    };

    const successResponse = (response: any) => {
        authService.getTokenWithGoogleAuth(response.tokenId);
        closeSignInModal();
    };
    const failureResponse = (response: any) => {
        console.error("error response", response);
    };

    return (
        <React.Fragment>
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
                    {authState.isLoggedIn && (
                        <NavigationItem>
                            <Button onClick={authService.logout}>Logout</Button>
                        </NavigationItem>
                    )}
                    {!authState.isLoggedIn && (
                        <NavigationItem>
                            <Button onClick={() => setSignInModalOpen(true)}>Sign In</Button>
                        </NavigationItem>
                    )}
                    {authState.isLoggedIn && (
                        <NavigationItem>
                            <Avatar name={authState.username} size="40px" src={""} />
                        </NavigationItem>
                    )}
                </NavigationList>
            </HeaderNavigation>

            <Modal
                onClose={closeSignInModal}
                isOpen={isSignInModalOpen}
                overrides={{
                    Dialog: {
                        style: {
                            width: "40vw",
                            height: "80vh",
                            display: "flex",
                            flexDirection: "column",
                        },
                    },
                }}
            >
                <ModalHeader>Sign In</ModalHeader>
                <ModalBody style={{ flex: "1 1 0" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, facere.
                    <GoogleLogin
                        clientId="946380795317-321u8sasdpeqe6uuja0cs5c071bs8vqb.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={successResponse}
                        onFailure={failureResponse}
                    />
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default Navbar;
