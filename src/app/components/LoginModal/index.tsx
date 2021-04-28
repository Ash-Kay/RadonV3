import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { authService } from "../../state/auth/auth.service";
import { Box, Button, Text, Input, Flex } from "theme-ui";
import Modal from "../core/Modal";
import { FaGoogle } from "react-icons/fa";
import { globalService } from "../../state/global/global.service";
import { useIsSignInModalOpenHook } from "../../state/global/global.hook";
import { Event, LoginType } from "../../../analytics/Events";

const LoginModal: React.FC = () => {
    const [isSignInModalOpen] = useIsSignInModalOpenHook();
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" }); //for debug

    const closeSignInModal = () => {
        globalService.setIsSignInModalOpen(false);
    };
    const successResponse = (response: any) => {
        authService.getTokenWithGoogleAuth(response.tokenId);
        Event.LOGIN_SUCCESSFUL(LoginType.GOOGLE);
        closeSignInModal();
    };
    const failureResponse = (response: any) => {
        console.error("error response", response);
    };
    const submitLoginForm = () => {
        authService.loginWithUsernamePassword(loginFormData.email, loginFormData.password);
    };

    const onLoginButtonClick = () => {
        globalService.setIsSignInModalOpen(true);
        Event.LOGIN_BUTTON_CLICK();
    };

    const onLoginWithGoogleButtonClick = () => {
        Event.LOGIN_WITH_X_BUTTON_CLICK(LoginType.GOOGLE);
    };

    const modalStyle = {
        width: "500px",
    };

    return (
        <>
            <Button id="login-button" onClick={onLoginButtonClick} variant="nav">
                Log In
            </Button>
            <Modal isOpen={isSignInModalOpen} onModalClose={closeSignInModal} sx={modalStyle}>
                <Flex sx={{ color: "text", flexDirection: "column", pb: 4 }}>
                    <Text sx={{ fontSize: 5, fontWeight: "bold", mb: 4, color: "primary" }}>Welcome to R</Text>
                    <GoogleLogin
                        clientId="946380795317-321u8sasdpeqe6uuja0cs5c071bs8vqb.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                        onSuccess={successResponse}
                        onFailure={failureResponse}
                        render={(renderProps) => (
                            <Box>
                                <Button
                                    variant="login"
                                    onClick={() => {
                                        renderProps.onClick();
                                        onLoginWithGoogleButtonClick();
                                    }}
                                    disabled={renderProps.disabled}
                                    sx={{ backgroundColor: "#c94932", color: "white", height: "35px" }}
                                >
                                    <FaGoogle size={13} /> Continue with Google
                                </Button>
                            </Box>
                        )}
                    />

                    {/* <Text>Continue with Facebook</Text> */}

                    <Box sx={{ display: "none" }}>
                        <Text sx={{ fontSize: 3, fontWeight: "bold", my: "2rem" }}>Or</Text>

                        <Text sx={{ fontSize: 4, fontWeight: "bold" }}>Login With Email</Text>
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
                </Flex>
            </Modal>
        </>
    );
};

export default LoginModal;
