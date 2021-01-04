import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { authService } from "../../state/auth/auth.service";
import { Box, Button, Text } from "rebass";
import { Input } from "@rebass/forms";
import Modal from "../core/Modal";

interface Props {}

const LoginModal = (props: Props) => {
    const [isSignInModalOpen, setSignInModalOpen] = React.useState(false);
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" }); //for debug

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
    const submitLoginForm = () => {
        authService.loginWithUsernamePassword(loginFormData.email, loginFormData.password);
    };

    const modalStyle = {
        width: "500px",
    };

    return (
        <>
            <Button onClick={() => setSignInModalOpen(true)} variant="navOutline">
                Log In
            </Button>
            <Modal isOpen={isSignInModalOpen} onModalClose={closeSignInModal} sx={modalStyle}>
                <Box sx={{ color: "text" }}>
                    <Text fontSize={5} fontWeight="bold" sx={{ mb: "2rem" }}>
                        Welcome back!
                    </Text>
                    <GoogleLogin
                        clientId="946380795317-321u8sasdpeqe6uuja0cs5c071bs8vqb.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={successResponse}
                        onFailure={failureResponse}
                    />

                    <Text fontSize={3} fontWeight="bold" sx={{ my: "2rem" }}>
                        Or
                    </Text>

                    <Text fontSize={4} fontWeight="bold">
                        Login With Email
                    </Text>
                    <Input
                        value={loginFormData.email}
                        onChange={(e) => setLoginFormData({ ...loginFormData, email: e.currentTarget.value })}
                        placeholder="Email"
                        type="mail"
                        sx={{ my: "1rem" }}
                    />
                    <Input
                        value={loginFormData.password}
                        onChange={(e) => setLoginFormData({ ...loginFormData, password: e.currentTarget.value })}
                        placeholder="Password"
                        type="Password"
                        sx={{ my: "1rem" }}
                    />
                    <Button onClick={submitLoginForm}>Login</Button>
                </Box>
            </Modal>
        </>
    );
};

export default LoginModal;
