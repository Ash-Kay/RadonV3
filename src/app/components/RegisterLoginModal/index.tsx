import React, { useState } from "react";
import { StyledNavigationItem as NavigationItem } from "baseui/header-navigation";
import { Button } from "baseui/button";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";
import GoogleLogin from "react-google-login";
import { authService } from "../../state/auth/auth.service";
import { Input } from "baseui/input";

interface Props {}

const RegisterLoginModal = (props: Props) => {
    const [isSignInModalOpen, setSignInModalOpen] = React.useState(false);
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" }); //for debug
    const [signupFormData, setSignupFormData] = useState({ username: "", password: "", email: "" }); //for debug

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
    const submitSignupForm = () => {
        authService.signupWithUsernamePassword(signupFormData.username, signupFormData.password, signupFormData.email);
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
                    <h2>Login</h2>
                    <Input
                        value={loginFormData.email}
                        onChange={(e) => setLoginFormData({ ...loginFormData, email: e.currentTarget.value })}
                        placeholder="Email"
                        type="mail"
                    />
                    <Input
                        value={loginFormData.password}
                        onChange={(e) => setLoginFormData({ ...loginFormData, password: e.currentTarget.value })}
                        placeholder="Password"
                        type="Password"
                    />
                    <Button onClick={submitLoginForm}>Login</Button>
                    <h2>SignUp</h2>
                    <Input
                        value={signupFormData.username}
                        onChange={(e) => setSignupFormData({ ...signupFormData, username: e.currentTarget.value })}
                        placeholder="Username"
                    />
                    <Input
                        value={signupFormData.email}
                        onChange={(e) => setSignupFormData({ ...signupFormData, email: e.currentTarget.value })}
                        placeholder="email"
                        type="email"
                    />
                    <Input
                        value={signupFormData.password}
                        onChange={(e) => setSignupFormData({ ...signupFormData, password: e.currentTarget.value })}
                        placeholder="Password"
                        type="Password"
                    />
                    <Button onClick={submitSignupForm}>Register</Button>
                </ModalBody>
            </Modal>
        </>
    );
};

export default RegisterLoginModal;
