import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { authService } from "../../state/auth/auth.service";
import { Box, Button, Text } from "rebass";
import { Input } from "@rebass/forms";
import Modal from "../core/Modal";

interface Props {}

const SignupModal = (props: Props) => {
    const [isSignInModalOpen, setSignInModalOpen] = React.useState(false);
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
    const submitSignupForm = () => {
        authService.signupWithUsernamePassword(signupFormData.username, signupFormData.password, signupFormData.email);
    };

    const modalStyle = {
        width: "500px",
    };

    return (
        <>
            <Button onClick={() => setSignInModalOpen(true)} variant="nav">
                Sign Up
            </Button>
            <Modal isOpen={isSignInModalOpen} onModalClose={closeSignInModal} sx={modalStyle}>
                <Box sx={{ color: "text" }}>
                    <Text fontSize={5} fontWeight="bold" sx={{ mb: "2rem" }}>
                        Welcome to RadonV3!
                    </Text>
                    <GoogleLogin
                        clientId="946380795317-321u8sasdpeqe6uuja0cs5c071bs8vqb.apps.googleusercontent.com"
                        buttonText="Sign up with Google"
                        onSuccess={successResponse}
                        onFailure={failureResponse}
                    />

                    <Text fontSize={3} fontWeight="bold" sx={{ my: "1.5rem" }}>
                        Or
                    </Text>

                    <h2>Sign Up with Email</h2>
                    <Input
                        value={signupFormData.username}
                        onChange={(e) => setSignupFormData({ ...signupFormData, username: e.currentTarget.value })}
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
                        onChange={(e) => setSignupFormData({ ...signupFormData, password: e.currentTarget.value })}
                        placeholder="Password"
                        type="Password"
                        sx={{ my: "1rem" }}
                    />
                    <Button onClick={submitSignupForm}>Register</Button>
                </Box>
            </Modal>
        </>
    );
};

export default SignupModal;
