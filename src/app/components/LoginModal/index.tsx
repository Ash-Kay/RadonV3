import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import authService from "../../state/auth/auth.service";
import { FaGoogle } from "react-icons/fa";
import { Event, LoginType } from "../../../analytics/Events";
import useGlobalStore from "../../state/global/global.store";
import { Box, Button, makeStyles, Typography, Modal } from "@material-ui/core";
import clsx from "clsx";
import { Role } from "../../state/auth/auth.model";
import useAuthStore from "../../state/auth/auth.store";

const useLoginModalStyles = makeStyles((theme) => ({
    //TODO: common
    loginButton: {
        borderRadius: 22,
        marginRight: 8,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: theme.shape.borderRadius,
    },
    boldText: {
        fontWeight: 700,
    },
    //commonend
    buttonMargin: {
        marginTop: theme.spacing(4),
    },
    googleLoginButton: {
        backgroundColor: "red",
    },
}));

const LoginModal: React.FC = () => {
    const classes = useLoginModalStyles();

    const updateAuthState = useAuthStore((state) => state.updateState);
    const updateGlobalState = useGlobalStore((state) => state.updateState);
    const isSignInModalOpen = useGlobalStore((state) => state.data.isLoginModalOpen);

    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" }); //for debug
    const [signupFormData, setSignupFormData] = useState({ username: "", password: "", email: "" }); //for debug

    const closeSignInModal = () => {
        updateGlobalState({ isLoginModalOpen: false });
    };
    const successResponse = async (response: any) => {
        await authService.getTokenWithGoogleAuth(response.tokenId);
        const { data } = await authService.getUserData();

        const user = data.data;
        updateAuthState({
            id: user.id,
            email: user.email,
            googleId: user.googleId,
            username: user.username,
            role: Role[user.role as keyof typeof Role],
            isLoggedIn: true,
        });

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
        updateGlobalState({ isLoginModalOpen: true });
        Event.LOGIN_BUTTON_CLICK();
    };
    const onLoginWithGoogleButtonClick = () => {
        Event.LOGIN_WITH_X_BUTTON_CLICK(LoginType.GOOGLE);
    };

    return (
        <>
            <Button
                id="login-button"
                onClick={onLoginButtonClick}
                className={classes.loginButton}
                variant="contained"
                color="secondary"
            >
                Log In
            </Button>
            <Modal disablePortal open={isSignInModalOpen} onClose={closeSignInModal} className={classes.modal}>
                <Box className={classes.paper}>
                    <Typography variant="h6" className={classes.boldText}>
                        Welcome to Memenese!
                    </Typography>

                    <GoogleLogin
                        clientId="946380795317-321u8sasdpeqe6uuja0cs5c071bs8vqb.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                        onSuccess={successResponse}
                        onFailure={failureResponse}
                        render={(renderProps) => (
                            <Box className={classes.buttonMargin}>
                                <Button
                                    className={clsx(classes.googleLoginButton, classes.loginButton)}
                                    fullWidth
                                    disabled={renderProps.disabled}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<FaGoogle size={13} />}
                                    onClick={() => {
                                        renderProps.onClick();
                                        onLoginWithGoogleButtonClick();
                                    }}
                                >
                                    Continue with Google
                                </Button>
                            </Box>
                        )}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default LoginModal;
