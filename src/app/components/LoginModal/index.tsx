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
    const [signupFormData, setSignupFormData] = useState({ username: "", password: "", email: "" }); //for debug

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
    const submitSignupForm = () => {
        authService.signupWithUsernamePassword(signupFormData.username, signupFormData.password, signupFormData.email);
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
                    <Box sx={{ mb: 4, color: "primary", fontWeight: "bold", fontSize: 5 }}>
                        <Text>Welcome to Memenese!</Text>
                    </Box>
                    <GoogleLogin
                        clientId="946380795317-321u8sasdpeqe6uuja0cs5c071bs8vqb.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                        onSuccess={successResponse}
                        onFailure={failureResponse}
                        render={(renderProps) => (
                            <Box sx={{ mx: "auto" }}>
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

                    {process.env.NODE_ENV === "development" && (
                        <Box sx={{ display: "none" }}>
                            <Box sx={{ width: "100%", height: "3px", bg: "white", mt: 4 }} />

                            <Text sx={{ fontSize: 4, fontWeight: "bold", mt: 3, display: "block" }}>
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
                                onChange={(e) =>
                                    setLoginFormData({ ...loginFormData, password: e.currentTarget.value })
                                }
                                placeholder="Password"
                                type="Password"
                                sx={{ my: "1rem" }}
                            />
                            <Button onClick={submitLoginForm}>Login</Button>

                            <Text sx={{ fontSize: 4, fontWeight: "bold", mt: 3, display: "block" }}>Signup</Text>
                            <Input
                                value={signupFormData.username}
                                onChange={(e) =>
                                    setSignupFormData({ ...signupFormData, username: e.currentTarget.value })
                                }
                                placeholder="Username"
                                sx={{ my: "1rem" }}
                            />
                            <Input
                                value={signupFormData.email}
                                onChange={(e) => setSignupFormData({ ...signupFormData, email: e.currentTarget.value })}
                                placeholder="Email"
                                type="email"
                                sx={{ my: "1rem" }}
                            />
                            <Input
                                value={signupFormData.password}
                                onChange={(e) =>
                                    setSignupFormData({ ...signupFormData, password: e.currentTarget.value })
                                }
                                placeholder="Password"
                                type="Password"
                                sx={{ my: "1rem" }}
                            />
                            <Button onClick={submitSignupForm}>Register</Button>
                        </Box>
                    )}
                </Flex>
            </Modal>
        </>
    );
};

export default LoginModal;
