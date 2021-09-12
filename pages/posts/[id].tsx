import { Box, makeStyles } from "@material-ui/core";
import { NextPageContext } from "next";
import { ClientSafeProvider, getProviders, getSession } from "next-auth/client";
import Head from "next/head";
import React, { useEffect } from "react";
import Navbar from "../../src/app/components/Navbar";
import PostItem from "../../src/app/components/PostItem";
import { AuthContext } from "../../src/app/context/auth.context";
import { AuthStateData, AUTH_INITIAL_STATE } from "../../src/app/state/auth/auth.model";
import useAuthStore from "../../src/app/state/auth/auth.store";
import { Post } from "../../src/app/state/posts/post.model";
import { getPost } from "../../src/app/state/posts/post.service";

interface Props {
    post: Post;
    user: AuthStateData;
    providers: Record<string, ClientSafeProvider>;
}

const useFullScreenPostStyles = makeStyles((theme) => ({
    homeFeedBox: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "54px",
        gridColumnGap: "1rem",

        "&>div": {
            width: "650px",
        },
    },

    root: {},
}));

const FullScreenPost = (props: Props) => {
    const classes = useFullScreenPostStyles();
    const authState = useAuthStore((state) => state.data);
    const updateAuthState = useAuthStore((state) => state.updateState);

    const url = "https://memenese.com/posts/";

    useEffect(() => {
        updateAuthState({ ...props.user, isLoggedIn: props.user.id == 0 ? false : true });
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            <Head>
                {/* <!-- Google / Search Engine Tags --> */}
                <meta charSet="utf-8" />
                <title>{props.post.title + "•Memenese"}</title>
                <meta itemProp="name" content={props.post.title} />
                <meta itemProp="description" content={props.post.title} />
                <meta itemProp="image" content={props.post.mediaUrl} />
                <link rel="canonical" href={url + props.post.id} />

                {/* <!-- Facebook Meta Tags --> */}
                <meta property="og:url" content={url + props.post.id} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={props.post.title} />
                <meta property="og:description" content={props.post.title} />
                <meta property="og:image" content={props.post.mediaUrl} />

                {/* <!-- Twitter Meta Tags --/> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={props.post.title} />
                <meta name="twitter:description" content={props.post.title} />
                <meta name="twitter:image" content={props.post.mediaUrl} />
            </Head>
            <Navbar providers={props.providers} />
            <Box className={classes.root}>
                <Box className={classes.homeFeedBox}>
                    <PostItem item={props.post} fullScreenPost />
                </Box>
            </Box>
        </AuthContext.Provider>
    );
};

export default FullScreenPost;

export const getServerSideProps = async (context: NextPageContext) => {
    const { id } = context.query;

    try {
        const session = await getSession(context);

        const postResponse = await getPost(id, session?.user?.token);

        const providers = await getProviders();

        return {
            props: {
                post: postResponse.data.data,
                user: session ? session.user : AUTH_INITIAL_STATE,
                providers,
            },
        };
    } catch (error) {
        console.log(error);
    }
    return {
        notFound: true,
    };
};
