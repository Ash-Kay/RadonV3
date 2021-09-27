import { NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { ClientSafeProvider, getProviders, getSession } from "next-auth/client";
import { AuthStateData, AUTH_INITIAL_STATE } from "../../src/app/state/auth/auth.model";
import useAuthStore from "../../src/app/state/auth/auth.store";
import { AuthContext } from "../../src/app/context/auth.context";
import Navbar from "../../src/app/components/Navbar";
import templateList from "../../src/data/data";
import { Post } from "../../src/app/state/posts/post.model";
import { getPostPage } from "../../src/app/state/posts/post.service";
import HomeFeedSecondary from "../../src/app/components/HomeFeed/HomeFeedSecondary";
import Image from "next/image";
import Head from "next/head";

interface Meme {
    id: number;
    files: File[];
    name: string;
    description: string;
    origin: string;
    urlName: string;
}

interface File {
    height: number;
    width: number;
    url: string;
}

interface Props {
    meme: Meme;
    posts: Post[];
    user: AuthStateData;
    providers: Record<string, ClientSafeProvider>;
}

const useIndexStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(0, 2, 0, 2),
        width: "70vw",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    inline: { display: "inline" },
    morePosts: {
        width: "30vw",
        margin: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    root: {
        paddingTop: "54px",
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
}));

const MemeTemplate = (props: Props) => {
    const classes = useIndexStyles();
    const authState = useAuthStore((state) => state.data);
    const updateAuthState = useAuthStore((state) => state.updateState);

    const url = "https://memenese.com/template/";

    useEffect(() => {
        updateAuthState({
            ...props.user,
            isLoggedIn: props.user.id !== null && props.user.id !== undefined && props.user.id !== 0,
        });
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            <Head>
                {/* <!-- Google / Search Engine Tags --> */}
                <meta charSet="utf-8" />
                <title>{props.meme.name + "•Memenese"}</title>
                <meta itemProp="name" content={props.meme.name} />
                <meta
                    itemProp="description"
                    content={props.meme.description || `Meme template for ${props.meme.name}`}
                />
                <meta itemProp="image" content={props.meme.files[0].url} />
                <meta itemProp="author" content="Memenese" />
                <link rel="canonical" href={url + props.meme.urlName} />

                {/* <!-- Facebook Meta Tags --> */}
                <meta property="og:url" content={url + props.meme.urlName} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={props.meme.name} />
                <meta
                    property="og:description"
                    content={props.meme.description || `Meme template for ${props.meme.name}`}
                />
                <meta property="og:image" content={props.meme.files[0].url} />

                {/* <!-- Twitter Meta Tags --/> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={props.meme.name} />
                <meta
                    name="twitter:description"
                    content={props.meme.description || `Meme template for ${props.meme.name}`}
                />
                <meta name="twitter:image" content={props.meme.files[0].url} />
            </Head>

            <Navbar providers={props.providers} />
            <Box className={classes.root}>
                <Box className={classes.main}>
                    <Typography variant="h6" component="h1">
                        {props.meme.name}
                    </Typography>
                    <Box>
                        {props.meme.files.map((file, index) => {
                            return (
                                <Image src={file.url} alt={props.meme.name} width={file.width} height={file.height} />
                            );
                        })}
                    </Box>
                    <Box>
                        <Typography variant="h6" className={classes.inline}>
                            Origin:{" "}
                        </Typography>
                        <Typography variant="body1" className={classes.inline}>
                            {props.meme.origin}
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.morePosts}>
                    <Typography variant="h6">See latest memes</Typography>
                    <HomeFeedSecondary posts={props.posts} />
                </Box>
            </Box>
        </AuthContext.Provider>
    );
};

export default MemeTemplate;

export const getServerSideProps = async (context: NextPageContext) => {
    const { name } = context.query;

    try {
        const meme = templateList[name as string];

        if (!meme) {
            return {
                notFound: true,
            };
        }

        const session = await getSession(context);

        const providers = await getProviders();

        //@ts-ignore
        const postListResponse = await getPostPage(1, session?.user?.token);

        return {
            props: {
                meme,
                user: session ? session.user : AUTH_INITIAL_STATE,
                providers,
                posts: postListResponse.data.data,
            },
        };
    } catch (error) {
        console.log(error);
    }
    return {
        notFound: true,
    };
};
