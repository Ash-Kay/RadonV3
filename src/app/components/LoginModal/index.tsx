import React, { useState } from "react";
import authService from "../../state/auth/auth.service";
import { Event, LoginType } from "../../../analytics/Events";
import useGlobalStore from "../../state/global/global.store";
import { Box, Button, makeStyles, Typography, Modal } from "@material-ui/core";
import { Role } from "../../state/auth/auth.model";
import useAuthStore from "../../state/auth/auth.store";
import { ClientSafeProvider, signIn } from "next-auth/client";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import CancelIcon from "@material-ui/icons/Cancel";

const useLoginModalStyles = makeStyles((theme) => ({
    //TODO: common
    loginButton: {
        borderRadius: 22,
        marginRight: 8,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            alignItems: "flex-end",
        },
        justifyContent: "center",
    },
    paper: {
        width: 500,
        maxWidth: "100vw",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: theme.shape.borderRadius,
        maxHeight: "calc(100vh - 38px)", //close button size + margin
        overflowY: "auto",
    },
    boldText: {
        fontWeight: 700,
    },
    //commonent
    buttonMargin: {
        marginTop: theme.spacing(4),
    },
    googleLoginButton: {
        backgroundColor: "red",
    },
    description: {
        marginTop: theme.spacing(2),
    },
    loginButtonSection: {
        marginTop: theme.spacing(2),
    },
    innerFlex: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column-reverse",
            alignItems: "flex-end",
        },
    },
    closeButton: {
        marginLeft: theme.spacing(1),
        cursor: "pointer",
        "&:hover": {
            opacity: 0.7,
        },
    },
    bold: {
        fontWeight: 700,
    },
}));

interface Props {
    providers: Record<string, ClientSafeProvider>;
}

const LoginModal: React.FC<Props> = (props: Props) => {
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
                <Box className={classes.innerFlex}>
                    <Box className={classes.paper}>
                        <Box>
                            <Image src="/full-logo.png" height={40} width={200} quality={1} />
                        </Box>
                        {/* <Typography variant="h6" className={classes.boldText}>
                        Welcome to Memenese!
                    </Typography> */}

                        <Typography variant="body1" className={classes.description}>
                            Choose how to Login or Register your Memenese account
                        </Typography>

                        <Box className={classes.loginButtonSection}>
                            {props.providers &&
                                Object.values(props.providers).map((provider) => (
                                    <Button
                                        key={provider.name}
                                        variant="outlined"
                                        startIcon={<FcGoogle />}
                                        onClick={() => signIn(provider.id)}
                                        fullWidth
                                    >
                                        <Typography variant="body1" className={classes.bold}>
                                            {provider.name}
                                        </Typography>
                                    </Button>
                                ))}
                        </Box>
                    </Box>
                    <CancelIcon fontSize="large" className={classes.closeButton} onClick={closeSignInModal} />
                </Box>
            </Modal>
        </>
    );
};

export default LoginModal;
