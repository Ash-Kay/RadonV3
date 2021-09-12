import Image from "next/image";
import { NextPageContext } from "next";
import { getProviders, ClientSafeProvider, signIn } from "next-auth/client";
import { FcGoogle } from "react-icons/fc";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";

interface Props {
    providers: ClientSafeProvider[];
}

const useIndexStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url("/pattern.svg")`,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    main: {
        width: "500px",
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            background: theme.palette.background.default,
        },
    },
    loginButtonSection: {
        marginTop: theme.spacing(2),
    },
    logo: {
        marginBottom: theme.spacing(2),
    },
    bold: {
        fontWeight: 700,
    },
}));

const SignIn = (props: Props) => {
    const classes = useIndexStyles();

    return (
        <Box className={classes.background}>
            <Box className={classes.main}>
                <Box className={classes.logo}>
                    <Image src="/full-logo.png" height={40} width={200} quality={1} />
                </Box>

                <Typography variant="body1">Choose how to Login or Register your Memenese account</Typography>

                <Box className={classes.loginButtonSection}>
                    {Object.values(props.providers).map((provider) => (
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
        </Box>
    );
};

export default SignIn;

export const getServerSideProps = async (context: NextPageContext) => {
    const providers = await getProviders();
    return {
        props: { providers },
    };
};
