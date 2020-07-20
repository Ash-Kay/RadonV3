import React from "react";
import { useStyletron } from "baseui";
import { StyledLink } from "baseui/link";
import { Overflow as UserIcon, Upload as Icon } from "baseui/icon";
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

interface Props {}

const Navbar = (props: Props) => {
    const [css] = useStyletron();
    const [isSignInModalOpen, setSignInModalOpen] = React.useState(false);

    const containerStyles = css({
        // width: "100vw",
        paddingLeft: "2rem",
        paddingRight: "2rem",
    });
    const style = {
        paddingLeft: "2rem",
        paddingRight: "2rem",
    };

    const closeSignInModal = () => {
        setSignInModalOpen(false);
    };

    const successResponse = (response: any) => {
        console.log("successResponse", response);
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
                    <NavigationItem>
                        <Button onClick={() => setSignInModalOpen(true)}>Sign In</Button>
                    </NavigationItem>
                    <NavigationItem>
                        <Avatar name="ASHISH KUMAR" size="40px" src="" />
                    </NavigationItem>
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
                    <Button $as="a" href="http://localhost:3000/api/v1/users/auth/google">
                        Sign In with Google
                    </Button>
                    <GoogleLogin
                        clientId="946380795317-321u8sasdpeqe6uuja0cs5c071bs8vqb.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={successResponse}
                        onFailure={failureResponse}
                    />
                </ModalBody>
                <ModalFooter>
                    <ModalButton type="submit" onClick={closeSignInModal}>
                        Sign In
                    </ModalButton>
                </ModalFooter>
            </Modal>
        </React.Fragment>
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
