import React from "react";
import { StyledNavigationItem as NavigationItem } from "baseui/header-navigation";
import { Button } from "baseui/button";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";
import GoogleLogin from "react-google-login";
import { authService } from "../../state/auth/auth.service";

interface Props {}

const RegisterLoginModal = (props: Props) => {
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
        <>
            <NavigationItem>
                <Button onClick={() => setSignInModalOpen(true)}>Sign In</Button>
            </NavigationItem>
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
        </>
    );
};

export default RegisterLoginModal;
